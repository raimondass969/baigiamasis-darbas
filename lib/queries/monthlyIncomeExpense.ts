import { prisma } from '../prisma';

const monthNames = [
	'Sausis',
	'Vasaris',
	'Kovas',
	'Balandis',
	'Gegužė',
	'Birželis',
	'Liepa',
	'Rugpjūtis',
	'Rugsėjis',
	'Spalis',
	'Lapkritis',
	'Gruodis',
];

export async function getMonthlyIncomesExpenses(
	userId: number,
	year: number,
	selectedProjectId?: string,
) {
	const startDate = new Date(year, 0, 1); // Nustatome metų pradžią
	const endDate = new Date(year + 1, 0, 1); // Nustatome metų pabaigą

	const transactions = await prisma.transaction.findMany({
		where: {
			date: {
				gte: startDate,
				lt: endDate,
			},
			project: {
				userId: userId,
				...(selectedProjectId ? { id: Number(selectedProjectId) } : {}),
			},
		},
		select: {
			amount: true,
			date: true,
			category: {
				select: {
					type: true,
				},
			},
		},
	});
	const data = monthNames.map((month) => ({
		month,
		income: 0,
		expense: 0,
	}));

	for (const transaction of transactions) {
		const monthIndex = transaction.date.getMonth();

		if (transaction.category.type === 'INCOME') {
			data[monthIndex].income += Number(transaction.amount);
		}

		if (transaction.category.type === 'EXPENSE') {
			data[monthIndex].expense += Number(transaction.amount);
		}
	}
	return data;
}
