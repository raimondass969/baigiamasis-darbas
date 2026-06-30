'use client';

import { useEffect, useState } from 'react';
import FormInput from '../ui/FormInput';

export default function RegisterForm() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	function validatePassword(password: string) {
		if (password.length < 8) {
			return 'Slaptažodis turi būti bent 8 simbolių ilgio';
		}
		if (!/[A-ZĄČĘĖĮŠŲŪŽ]/.test(password)) {
			return 'Slaptažodyje turi būti bent viena didžioji raidė';
		}
		if (!/[0-9]/.test(password)) {
			return 'Slaptažodyje turi būti bent vienas skaičius';
		}
		return '';
	}

	useEffect(() => {
		if (!error && !success) {
			return;
		}
		const timer = setTimeout(() => {
			setError('');
			setSuccess('');
		}, 4000);

		return () => clearTimeout(timer);
	}, [error, success]);

	async function handleRegister(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		const username = formData.get('registerUsername') as string;
		const email = formData.get('registerEmail') as string;
		const password = formData.get('registerPassword') as string;
		const passwordError = validatePassword(password);
		const confirmPassword = formData.get(
			'registerConfirmPassword',
		) as string;

		setError('');
		setSuccess('');

		if (!username || !email || !password || !confirmPassword) {
			setError('Visi laukai yra privalomi');
			return;
		}

		if (passwordError) {
			setError(passwordError);
			return;
		}
		if (password !== confirmPassword) {
			setError('Slaptažodžiai nesutampa');
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
			setError('');
			setSuccess(data.message || 'Registracija sėkminga');
			form.reset();
		} else {
			setSuccess('');
			setError(data.message || 'Įvyko klaida');
		}
	}

	return (
		<>
			<h1 className="font-bold text-center dark:text-slate-100">
				Registracija
			</h1>

			{error && (
				<p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-500 dark:bg-red-500/10 dark:text-red-300">
					{error}
				</p>
			)}

			{success && (
				<p className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700 dark:border-green-500 dark:bg-green-500/10 dark:text-green-300">
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
					type="email"
					name="registerEmail"
					label="El. paštas"
					placeholder="Įveskite savo el. pašta"
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
					className="w-full rounded-2xl bg-blue-500 px-4 py-2  disabled:opacity-60 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
				>
					Registruotis
				</button>
			</form>
		</>
	);
}
