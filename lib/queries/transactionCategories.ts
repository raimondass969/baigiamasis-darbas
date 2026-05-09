import { TransactionType } from '@prisma/client';
import { prisma } from '../prisma';

// transakciju kategorijos INCOME | EXPENSE
export async function getTransactionCategory(type: TransactionType) {
	return prisma.category.findMany({
		where: {
			type,
		},
		select: {
			id: true,
			name: true,
			type: true,
		},
		orderBy: {
			name: 'asc',
		},
	});
}
