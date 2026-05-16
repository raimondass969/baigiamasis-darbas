import { CheckUserProject } from '@/lib/auth/checkUserProject';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const userId = await getCurrentUser();

	if (!userId) {
		return Response.json(
			{ message: 'Vartotojas neprisijungęs' },
			{ status: 401 },
		);
	}

	const body = await request.json();

	const { amount, projectId, categoryId, date, description, type } = body;

	if (!amount || !projectId || !categoryId || !date) {
		return NextResponse.json(
			{ message: 'Trūksta privalomų laukų' },
			{ status: 400 },
		);
	}
	if (!['INCOME', 'EXPENSE'].includes(type)) {
		return NextResponse.json(
			{ message: 'Neteisingas transakcijos tipas' },
			{ status: 400 },
		);
	}

	const project = await CheckUserProject({
		userId,
		projectId: Number(projectId),
	});

	if (!project) {
		return NextResponse.json(
			{ message: 'Projektas nepriklauso vartotojui arba neegzistuoja' },
			{ status: 401 },
		);
	}

	const category = await prisma.category.findFirst({
		where: {
			id: Number(categoryId),
			type,
		},
	});

	if (!category) {
		return NextResponse.json(
			{ message: 'Kategorija nerasta' },
			{ status: 404 },
		);
	}

	const transaction = await prisma.transaction.create({
		data: {
			amount: Number(amount),
			date: new Date(date),
			description,
			projectId: Number(projectId),
			categoryId: Number(categoryId),
		},
		include: {
			category: true,
		},
	});

	return NextResponse.json(transaction);
}
