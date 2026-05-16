import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
	try {
		const { username, email, password, confirmPassword } =
			await request.json();

		const normEmail = email.trim().toLowerCase();
		const normUsername = username.trim();

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
				email: normEmail,
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
				name: normUsername,
				email: normEmail,
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
			},
			{ status: 500 },
		);
	}
}
