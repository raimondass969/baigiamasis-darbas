import { TransactionType } from '@prisma/client';
import { prisma } from '../prisma';

export default async function getDashboardSummary(
	userId: number,
	selectedProjectId: string,
) {
	// Nustatom siandienos data
	const dateNow = new Date();

	//
	const projectFilter = selectedProjectId
		? {
				userId: userId,
				id: Number(selectedProjectId),
			}
		: {
				userId: userId,
			};

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
			where: projectFilter,
		}),

		// Gaunam userId projektus isrusiuojam pagal pajamu kategorija is suskaiciuojam total.
		prisma.transaction.aggregate({
			where: {
				project: projectFilter,
				category: {
					type: TransactionType.INCOME,
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

		prisma.transaction.aggregate({
			where: {
				project: projectFilter,
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
