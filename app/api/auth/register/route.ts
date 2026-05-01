import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
	try {
		const { username, email, password, confirmPassword } =
			await request.json();

		if (!username || !email || !password || !confirmPassword) {
			return Response.json(
				{ message: 'Visi laukrai privalomi!' },
				{ status: 400 },
			);
		}
		if (password !== confirmPassword) {
			return Response.json(
				{ message: 'Slaptazodziai nesutampa!' },
				{ status: 400 },
			);
		}
		const existingUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (existingUser)
			return Response.json(
				{ message: 'Vartotojas Su tokiu el pastu jau egzistuoja!' },
				{ status: 400 },
			);

		const passwordHash = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name: username,
				email: email,
				passwordHash: passwordHash,
			},
		});

		return Response.json(
			{
				message: `Registracija sekminga! Vartotojas ${user.name} buvo sukurtas`,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error('REGISTER ERROR:', error);

		return Response.json(
			{
				message: 'Įvyko klaida',
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
