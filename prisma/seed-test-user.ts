import { PrismaClient, Prisma, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const seedYear = new Date().getFullYear();
	const userId = 6;

	const projects = await prisma.project.findMany({
		where: {
			userId,
		},
	});

	if (projects.length === 0) {
		throw new Error(`User ID ${userId} neturi projektų`);
	}

	const incomeCategories = await Promise.all([
		prisma.category.upsert({
			where: {
				name_type: {
					name: 'Paslaugos',
					type: TransactionType.INCOME,
				},
			},
			update: {},
			create: {
				name: 'Paslaugos',
				type: TransactionType.INCOME,
			},
		}),
		prisma.category.upsert({
			where: {
				name_type: {
					name: 'Pardavimai',
					type: TransactionType.INCOME,
				},
			},
			update: {},
			create: {
				name: 'Pardavimai',
				type: TransactionType.INCOME,
			},
		}),
		prisma.category.upsert({
			where: {
				name_type: {
					name: 'Konsultacijos',
					type: TransactionType.INCOME,
				},
			},
			update: {},
			create: {
				name: 'Konsultacijos',
				type: TransactionType.INCOME,
			},
		}),
	]);

	const expenseCategories = await Promise.all([
		prisma.category.upsert({
			where: {
				name_type: {
					name: 'Reklama',
					type: TransactionType.EXPENSE,
				},
			},
			update: {},
			create: {
				name: 'Reklama',
				type: TransactionType.EXPENSE,
			},
		}),
		prisma.category.upsert({
			where: {
				name_type: {
					name: 'Programinė įranga',
					type: TransactionType.EXPENSE,
				},
			},
			update: {},
			create: {
				name: 'Programinė įranga',
				type: TransactionType.EXPENSE,
			},
		}),
		prisma.category.upsert({
			where: {
				name_type: {
					name: 'Administracinės išlaidos',
					type: TransactionType.EXPENSE,
				},
			},
			update: {},
			create: {
				name: 'Administracinės išlaidos',
				type: TransactionType.EXPENSE,
			},
		}),
	]);

	await prisma.transaction.deleteMany({
		where: {
			project: {
				userId,
			},
		},
	});

	const transactions: Prisma.TransactionCreateManyInput[] = [];

	for (const project of projects) {
		for (let month = 0; month < 12; month++) {
			const monthNumber = month + 1;

			transactions.push(
				{
					projectId: project.id,
					categoryId: incomeCategories[0].id,
					description: `${project.name} - ${monthNumber} mėn. pajamos už paslaugas`,
					amount: new Prisma.Decimal(
						1000 + month * 90 + project.id * 15,
					),
					date: new Date(seedYear, month, 5),
				},
				{
					projectId: project.id,
					categoryId: incomeCategories[1].id,
					description: `${project.name} - ${monthNumber} mėn. pardavimų pajamos`,
					amount: new Prisma.Decimal(
						700 + month * 70 + project.id * 10,
					),
					date: new Date(seedYear, month, 14),
				},
				{
					projectId: project.id,
					categoryId: incomeCategories[2].id,
					description: `${project.name} - ${monthNumber} mėn. konsultacijų pajamos`,
					amount: new Prisma.Decimal(
						400 + month * 45 + project.id * 8,
					),
					date: new Date(seedYear, month, 24),
				},
				{
					projectId: project.id,
					categoryId: expenseCategories[0].id,
					description: `${project.name} - ${monthNumber} mėn. reklamos išlaidos`,
					amount: new Prisma.Decimal(
						220 + month * 25 + project.id * 5,
					),
					date: new Date(seedYear, month, 8),
				},
				{
					projectId: project.id,
					categoryId: expenseCategories[1].id,
					description: `${project.name} - ${monthNumber} mėn. programinės įrangos išlaidos`,
					amount: new Prisma.Decimal(
						140 + month * 18 + project.id * 4,
					),
					date: new Date(seedYear, month, 18),
				},
				{
					projectId: project.id,
					categoryId: expenseCategories[2].id,
					description: `${project.name} - ${monthNumber} mėn. administracinės išlaidos`,
					amount: new Prisma.Decimal(
						100 + month * 12 + project.id * 3,
					),
					date: new Date(seedYear, month, 26),
				},
			);
		}
	}

	await prisma.transaction.createMany({
		data: transactions,
	});

	console.log('Seed baigtas sėkmingai.');
	console.log(`User ID: ${userId}`);
	console.log(`Projektų: ${projects.length}`);
	console.log(`Metai: ${seedYear}`);
	console.log(`Sukurta transakcijų: ${transactions.length}`);
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
