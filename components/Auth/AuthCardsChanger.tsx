'use client';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthCardChanger() {
	const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');

	return (
		<div className="relative overflow-hidden flex flex-col items-center gap-6 rounded-2xl border border-slate-700/60 dark:bg-[#1c2033] px-10 py-8 shadow-2xl shadow-black/40 max-w-xl w-full min-h-120 mx-auto before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-blue-500/50 before:to-transparent">
			<div className="flex w-full rounded-xl bg-white/5 p-1">
				<button
					onClick={() => setActiveForm('login')}
					className={`flex-1 cursor-pointer rounded-md py-2.5 px-4 text-sm font-medium transition-all ${
						activeForm === 'login'
							? 'bg-blue-600 shadow-md shadow-blue-500'
							: 'text-slate-500 hover:text-slate-300'
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
							: 'text-slate-500 hover:text-slate-300'
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
