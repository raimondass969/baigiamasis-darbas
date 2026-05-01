'use client';

async function handleRegister(event: React.SubmitEvent<HTMLFormElement>) {
	event.preventDefault();

	const formData = new FormData(event.currentTarget);
	const username = formData.get('registerUsername') as string;
	const email = formData.get('registerEmail') as string;
	const password = formData.get('registerPassword') as string;
	const confirmPassword = formData.get('registerConfirmPassword') as string;

	if (!username || !email || !password || !confirmPassword) {
		alert('Visi lauktai laukai yra privalomi');
		return;
	}
	if (password !== confirmPassword) {
		alert('Slaptažodžiai nesutampa');
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
		alert(data.message);
	} else {
		alert(data.message || 'Įvyko klaida');
	}
}

export default function RegisterForm() {
	return (
		<>
			<h1 className="font-bold text-center dark:text-slate-100">
				Registracijos puslapis
			</h1>

			<form
				onSubmit={handleRegister}
				className="flex flex-col gap-4 w-full"
			>
				{/* Registracijos username */}
				<div className="flex flex-col gap-1">
					<label
						htmlFor="registerUsername"
						className="text-sm text-slate-300"
					>
						Vartotojo vardas
					</label>

					<input
						id="registerUsername"
						type="text"
						name="registerUsername"
						placeholder="Susikurkite vartotojo vardą"
						className="px-4 py-2 rounded-2xl bg-slate-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ease-out dark:bg-slate-900 dark:text-white dark:border-blue-500"
					/>
				</div>

				{/* Registracijos el pastas */}
				<div className="flex flex-col gap-1">
					<label
						htmlFor="registerEmail"
						className="text-sm text-slate-300"
					>
						El. paštas
					</label>

					<input
						id="registerEmail"
						type="email"
						name="registerEmail"
						placeholder="vardas@pastas.lt"
						className="px-4 py-2 rounded-2xl bg-slate-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ease-out dark:bg-slate-900 dark:text-white dark:border-blue-500"
					/>
				</div>

				{/* Registracijos slaptazodis */}
				<div className="flex flex-col gap-1">
					<label
						htmlFor="registerPassword"
						className="text-sm text-slate-300"
					>
						Slaptažodis
					</label>

					<input
						id="registerPassword"
						type="password"
						name="registerPassword"
						placeholder="Mažiausiai 8 simboliai"
						className="px-4 py-2 rounded-2xl  bg-slate-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ease-out dark:bg-slate-900 dark:text-white dark:border-blue-500"
					/>
				</div>

				{/* Registracijos pakartotinas slaptazodis */}
				<div className="flex flex-col gap-1">
					<label
						htmlFor="registerConfirmPassword"
						className="text-sm text-slate-300"
					>
						Pakartokite slaptažodį
					</label>
					<input
						id="registerConfirmPassword"
						type="password"
						name="registerConfirmPassword"
						placeholder="Pakartokite sukurtą slaptažodį"
						className="px-4 py-2 rounded-2xl  bg-slate-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ease-out dark:bg-slate-900 dark:text-white dark:border-blue-500"
					/>
				</div>

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
