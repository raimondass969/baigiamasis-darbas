import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		return NextResponse.json(
			{ message: 'Vartotojas neprisijunges' },
			{ status: 401 },
		);
	}

	const body = await request.json();

	const { amount, projectId, categoryId, date } = body;

	if (!amount || !projectId || !categoryId || !date) {
		return NextResponse.json(
			{ message: 'Trūksta privalomų laukų' },
			{ status: 400 },
		);
	}

	const income = await prisma.transaction.create({
		data: {
			amount: Number(amount),
			date: new Date(date),
			projectId: Number(projectId),
			categoryId: Number(categoryId),
		},
	});
	return NextResponse.json(income);
}
