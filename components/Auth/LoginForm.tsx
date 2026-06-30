'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormInput from '../ui/FormInput';

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
			setError('Neteisingas el. paštas arba slaptažodis');
			setIsLoading(false);
			return;
		}
		router.push('/dashboard');

		router.refresh();
	}

	return (
		<div className="w-full">
			<p className="font-semibold text-center ">Prisijungimo puslapis</p>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-full "
			>
				{/* loginForm email */}
				<FormInput
					id="loginEmail"
					name="loginEmail"
					label="El paštas"
					placeholder="Įveskite savo el. pašta"
				/>

				{/* loginForm password */}

				<FormInput
					id="loginPassword"
					type="password"
					name="loginPassword"
					label="Slaptazodis"
					placeholder="********"
				/>
				<div className="flex justify-end mt-1.5">
					<a
						href="#"
						className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
					>
						Pamiršote slaptažodį?
					</a>
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
					className="w-full rounded-2xl bg-blue-500 px-4 py-2  disabled:opacity-60 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:blue-400"
				>
					{isLoading ? 'Jungiamasi...' : 'Prisijungti'}
				</button>

				{/* Klaidos isvedimas */}
				{error && (
					<p className="mt-4 rounded-xl bg-red-500/10 border border-red-500 px-4 py-2 text-sm text-red-300">
						{error}
					</p>
				)}
			</form>
		</div>
	);
}
