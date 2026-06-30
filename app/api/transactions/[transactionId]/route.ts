import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type Params = {
	params: Promise<{ transactionId: string }>;
};

export async function DELETE(request: Request, { params }: Params) {
	const userId = await getCurrentUser();

	if (!userId) {
		return NextResponse.json(
			{ message: 'Vartotojas neprisijungęs' },
			{ status: 401 },
		);
	}

	const { transactionId } = await params;

	const transaction = await prisma.transaction.findFirst({
		where: {
			id: Number(transactionId),
			project: {
				userId,
			},
		},
	});

	if (!transaction) {
		return NextResponse.json(
			{ message: 'Įrašas nerastas arba nepriklauso vartotojui' },
			{ status: 404 },
		);
	}

	await prisma.transaction.delete({
		where: {
			id: transaction.id,
		},
	});
	return NextResponse.json({
		message: 'Įrašas pašalintas sėkmingai',
	});
}
