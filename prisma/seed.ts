import { PrismaClient, TransactionType } from '@prisma/client/';

const prisma = new PrismaClient();

async function main() {
	const categories = [
		//pajamos
		{ name: 'Paslaugos', type: TransactionType.INCOME },
		{ name: 'Pardavimai', type: TransactionType.INCOME },
		{ name: 'Konsultacijos', type: TransactionType.INCOME },
		{ name: 'Prekyba', type: TransactionType.INCOME },
		{ name: 'Kitos pajamos', type: TransactionType.INCOME },
		{ name: 'Nuoma', type: TransactionType.INCOME },
		{ name: 'Investicijos', type: TransactionType.INCOME },

		//išlaidos
		{ name: 'Darbo sąnaudos', type: TransactionType.EXPENSE },
		{ name: 'Programinė įranga', type: TransactionType.EXPENSE },
		{ name: 'Marketingas', type: TransactionType.EXPENSE },
		{ name: 'Transportas', type: TransactionType.EXPENSE },
		{ name: 'Techninė įranga', type: TransactionType.EXPENSE },
		{ name: 'Mokesčiai', type: TransactionType.EXPENSE },
		{ name: 'Kitos išlaidos', type: TransactionType.EXPENSE },
	];

	for (const category of categories) {
		await prisma.category.create({
			data: category,
		});
	}

	console.log('Kategorijos sėkmingai sukurtos!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
