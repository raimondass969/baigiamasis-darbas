import { TransactionType } from '@prisma/client';
import { prisma } from '../prisma';
import { projectFilter } from '../filters/projectFilter';
import { dateFilter } from '../filters/dateFilter';

export async function getExpenses(
	userId: number,
	selectedProjectId: string,
	year?: string,
	month?: string,
) {
	const projectsForFilter = projectFilter(Number(userId), selectedProjectId);
	const dateForFilter = dateFilter(year, month);
	return prisma.transaction.findMany({
		where: {
			project: projectsForFilter,
			category: {
				type: TransactionType.EXPENSE,
			},
			...(dateForFilter ? { date: dateForFilter } : {}),
		},
		select: {
			id: true,
			amount: true,
			createdAt: true,
			updatedAt: true,
			description: true,
			date: true,
			project: {
				select: {
					name: true,
				},
			},
			category: {
				select: {
					name: true,
				},
			},
		},
		orderBy: {
			date: 'desc',
		},
	});
}
