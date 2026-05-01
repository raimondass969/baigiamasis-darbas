import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';

//Nustatom auth nustatymus: sesijos tipas, kur prisijungimo puslapis, provideriai ir callbackai
export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			//aprasom kokiu lauku tikysi NextAuth
			credentials: {
				email: {
					label: 'El. paštas',
					type: 'email',
				},
				password: {
					label: 'Slaptažodis',
					type: 'password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const email = credentials.email.trim().toLowerCase();
				const password = credentials.password;

				// pagal ivesta email ieskomas user duomenu bazei
				const user = await prisma.user.findUnique({
					where: {
						email: email,
					},
				});

				//nutraukiam jei nerastas
				if (!user) {
					return null;
				}
				// patikrinam ar ivestas slaptazodis atitinka DB uzhashinta.
				const passwordIsValid = await bcrypt.compare(
					password, // vartotojo ivestas
					user.passwordHash, // db
				);

				if (!passwordIsValid) {
					return null;
				}
				//grazinam rasta user objekta
				return {
					id: String(user.id),
					name: user.name,
					email: user.email,
				};
			},
		}),
	],
	callbacks: {
		//sukuriam tokena
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
};
