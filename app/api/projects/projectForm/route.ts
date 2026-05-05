import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
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

	const name = String(body.projectName || '').trim();
	const description = String(body.projectDescription || '').trim();

	if (!name) {
		return NextResponse.json(
			{ message: 'Projekto pavadinimas yra privalomas' },
			{ status: 400 },
		);
	}
	// Kursim nauja projekta, priskirdami ji prie prisijungusio userio per userId
	const project = await prisma.project.create({
		data: {
			name,
			userId: Number(session.user.id),
			description,
		},
	});

	return NextResponse.json(project);
}
