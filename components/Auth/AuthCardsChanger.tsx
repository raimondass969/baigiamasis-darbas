'use client';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthCardChanger() {
	const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');

	return (
		<div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-700 dark:bg-slate-800  px-10 py-8 shadow-2xl shadow-black/40 max-w-xl w-full min-h-120">
			<div className="flex w-full rounded-xl bg-slate-700/50 p-1">
				<button
					onClick={() => setActiveForm('login')}
					className={`flex-1 cursor-pointer rounded-md py-2.5 px-4 text-sm font-medium transition-all ${
						activeForm === 'login'
							? 'bg-blue-600 shadow-md shadow-blue-500'
							: 'text-slate-400 border border-slate-600'
					}`}
				>
					Prisijungti
				</button>

				<button
					type="button"
					onClick={() => setActiveForm('register')}
					className={`flex-1 cursor-pointer rounded-md py-2.5 px-4 text-sm font-medium transition-all ${
						activeForm === 'register'
							? 'bg-blue-600 shadow-md shadow-blue-500'
							: 'text-slate-400 border border-slate-600'
					}
								`}
				>
					Registracija
				</button>
			</div>

			{/* Forma*/}
			<div className="w-full">
				{activeForm === 'login' ? <LoginForm /> : <RegisterForm />}
			</div>
		</div>
	);
}
