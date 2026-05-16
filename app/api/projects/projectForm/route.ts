import { authOptions } from '@/lib/auth';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
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
			userId: Number(userId),
			description,
		},
	});

	return NextResponse.json(project);
}
