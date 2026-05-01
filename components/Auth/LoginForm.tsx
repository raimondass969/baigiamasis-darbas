'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
	const router = useRouter();

	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		setError('');
		setIsLoading(true);

		const formData = new FormData(event.currentTarget);
		const userEmail = formData.get('loginEmail') as string;
		const userPassword = formData.get('loginPassword') as string;

		if (!userEmail || !userPassword) {
			setError('Visi laukai privalomi!');
			setIsLoading(false);
			return;
		}

		const result = await signIn('credentials', {
			email: userEmail,
			password: userPassword,
			redirect: false,
		});

		if (result?.error) {
			setError('Neteisingas el pastas arba slaptazodis');
			setIsLoading(false);
			return;
		}
		router.push('/dashboard');

		router.refresh();
	}

	return (
		<div className="w-full">
			<p className="font-semibold text-center ">Prisijungimo puslapis</p>
			{/* Klaidos isvedimas */}
			{error && (
				<p className="mt-4 rounded-xl bg-red-500/10 border border-red-500 px-4 py-2 text-sm text-red-300">
					{error}
				</p>
			)}
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-full"
			>
				{/* label for email */}
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="loginEmail"
						className="text-sm text-slate-300"
					>
						El paštas
					</label>

					{/* loginForm email */}
					<input
						id="loginEmail"
						type="text"
						name="loginEmail"
						placeholder="vardas@pavyzdis.lt"
						className="px-4 py-2 rounded-2xl  bg-slate-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ease-out dark:bg-slate-900 dark:text-white dark:border-blue-500"
					/>
				</div>

				{/* label for password */}
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="loginPassword"
						className="text-sm text-slate-300"
					>
						Slaptažodis
					</label>

					{/* loginForm password */}
					<input
						id="loginPassword"
						type="password"
						name="loginPassword"
						placeholder="Jūsų slaptažodis"
						className="px-4 py-2 rounded-2xl bg-slate-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ease-out dark:bg-slate-900 dark:text-white dark:border-blue-500"
					/>
				</div>
				<div className="flex items-center justify-between">
					<label className="flex items-center gap-2 cursor-pointer">
						<input type="checkbox" />
						Prisiminti mane
					</label>
				</div>
				{/* loginForm button */}
				<button
					type="submit"
					disabled={isLoading}
					className="w-full rounded-2xl bg-blue-500 px-4 py-2  disabled:opacity-60"
				>
					{isLoading ? 'Jungiamasi...' : 'Prisijungti'}
				</button>
			</form>
		</div>
	);
}
