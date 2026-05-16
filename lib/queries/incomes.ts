import { TransactionType } from '@prisma/client';
import { prisma } from '../prisma';

export async function GetIncomes(userId: number) {
	return prisma.transaction.findMany({
		where: {
			project: {
				userId: userId,
			},
			category: {
				type: TransactionType.INCOME,
			},
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
