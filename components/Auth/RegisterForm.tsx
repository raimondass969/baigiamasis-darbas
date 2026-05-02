'use client';

import { useState } from 'react';
import FormInput from '../ui/FormInput';

export default function RegisterForm() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	async function handleRegister(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const username = formData.get('registerUsername') as string;
		const email = formData.get('registerEmail') as string;
		const password = formData.get('registerPassword') as string;
		const confirmPassword = formData.get(
			'registerConfirmPassword',
		) as string;

		if (!username || !email || !password || !confirmPassword) {
			setError('Visi lauktai laukai yra privalomi');
			setSuccess('');
			return;
		}
		if (password !== confirmPassword) {
			setError('Slaptažodžiai nesutampa');
			setSuccess('');
			return;
		}
		const response = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				email,
				password,
				confirmPassword,
			}),
		});
		const data = await response.json();
		if (response.ok) {
			setSuccess(data.message);
		} else {
			setError(data.message || 'Įvyko klaida');
		}
	}

	return (
		<>
			<h1 className="font-bold text-center dark:text-slate-100">
				Registracijos puslapis
			</h1>

			{error && (
				<p className="mt-4 rounded-xl bg-red-500/10 border border-red-500 px-4 py-2 text-sm text-red-300">
					{error}
				</p>
			)}

			{success && (
				<p className="mt-4 rounded-xl bg-green-500/10 border border-green-500 px-4 py-2 text-sm text-green-300">
					{success}
				</p>
			)}

			<form
				onSubmit={handleRegister}
				className="flex flex-col gap-4 w-full"
			>
				{/* Registracijos username */}
				<FormInput
					id="registerUsername"
					name="registerUsername"
					label="Vartotojo vardas"
					placeholder="Susikurkite vartotojo vardą"
				/>

				{/* Registracijos el pastas */}
				<FormInput
					id="registerEmail"
					name="registerEmail"
					label="Vartotojo @paštas"
					placeholder="Iveskite savo el pašta"
				/>

				{/* Registracijos slaptazodis */}

				<FormInput
					id="registerPassword"
					type="password"
					name="registerPassword"
					label="Susikurkite slaptažodį"
					placeholder="Mažiausiai 8 simboliai"
				/>
				{/* Registracijos pakartotinas slaptazodis */}
				<FormInput
					id="registerConfirmPassword"
					type="password"
					name="registerConfirmPassword"
					label="Pakartokite slaptažodį"
					placeholder="Įveskite savo sukurtą slaptažodį"
				/>

				<button
					type="submit"
					className="w-full rounded-2xl bg-blue-500 px-4 py-2  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ease-out"
				>
					Registruotis
				</button>
			</form>
		</>
	);
}
