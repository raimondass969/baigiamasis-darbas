import { TransactionType } from '@prisma/client';
import { prisma } from '../prisma';
import { projectFilter } from '../filters/projectFilter';
import { dateFilter } from '../filters/dateFilter';

export default async function getDashboardSummary(
	userId: number,
	selectedProjectId: string,
	year?: string,
	month?: string,
) {
	const dateForFilter = dateFilter(year, month);

	const projectsForFilter = projectFilter(Number(userId), selectedProjectId);

	const [projectCount, incomeCount, expenseCount] = await Promise.all([
		// Gaunam projektu skaiciu
		prisma.project.count({
			where: projectsForFilter,
		}),

		// Pajamos rusiuojamos pagal data ir projektus
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

		// islaidos rusiuojamos pagal data ir projektus
		prisma.transaction.aggregate({
			where: {
				project: projectsForFilter,
				category: {
					type: TransactionType.EXPENSE,
				},
				...(dateForFilter ? { date: dateForFilter } : {}),
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
