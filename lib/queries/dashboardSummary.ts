import { TransactionType } from '@prisma/client';
import { prisma } from '../prisma';
import { projectFilter } from '../filters/projectFilter';
import { dateFilter } from '../filters/dateFilter';

export default async function getDashboardSummary(
	userId: number,
	selectedProjectId: string,
	year: string,
	month: string,
) {
	// Nustatom siandienos data
	const dateNow = new Date();

	const dateForFilter = dateFilter(year, month);

	const projectsForFilter = projectFilter(Number(userId), selectedProjectId);
	// Pasiemam aktualius metus/menesi ir pradedam nuo 1 menesio dienos.
	const startOfMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);

	// Pasiemam aktualius metus/menesi pridedam +1 menesi ir pradedam nuo 1 menesio dienos.
	const startOfNextMonth = new Date(
		dateNow.getFullYear(),
		dateNow.getMonth() + 1,
		1,
	);

	const [projectCount, incomeCount, expenseCount] = await Promise.all([
		// Gaunam projektu skaiciu
		prisma.project.count({
			where: projectsForFilter,
		}),

		// Gaunam userId projektus isrusiuojam pagal pajamu kategorija is suskaiciuojam total.
		prisma.transaction.aggregate({
			where: {
				project: projectsForFilter,
				category: {
					type: TransactionType.INCOME,
				},
				...(dateForFilter ? { date: dateForFilter } : {}),
			},
			_sum: {
				amount: true,
			},
		}),

		prisma.transaction.aggregate({
			where: {
				project: projectsForFilter,
				category: {
					type: TransactionType.EXPENSE,
				},
				date: {
					gte: startOfMonth,
					lt: startOfNextMonth,
				},
			},
			_sum: {
				amount: true,
			},
		}),
	]);

	const incomeTotal = Number(incomeCount._sum.amount ?? 0);
	const expenseTotal = Number(expenseCount._sum.amount ?? 0);

	return {
		incomeTotal: incomeTotal,
		expenseTotal: expenseTotal,
		projectCount: projectCount,
		balance: incomeTotal - expenseTotal,
	};
}
