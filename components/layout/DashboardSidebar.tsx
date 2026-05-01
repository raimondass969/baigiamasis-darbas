'use client';
import { useState } from 'react';

export default function Sidebar() {
	const [open, setOpen] = useState(false);

	return (
		<aside className="min-h-screen w-64 border-r border-slate-800 dark:bg-slate-950 px-4 py-4">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="mb-4 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-lg font-semibold  hover:bg-blue-800"
			>
				<span>Finansai</span>
				<span>{open ? '' : ''}</span>
			</button>
			{open && (
				<nav className="flex flex-col gap-4 mt-16">
					<a
						className="rounded-xl border py-2 px-4 text-slate-200 hover:bg:blue-700 hover:text-white"
						href="/dashboard"
					>
						Pagrindinis
					</a>
					<a
						className="rounded-xl border py-2 px-4 text-slate-200 hover:bg:blue-700 hover:text-white"
						href="/dashboard/projects"
					>
						Projektai
					</a>
					<a
						className="rounded-xl border py-2 px-4 text-slate-200 hover:bg:blue-700 hover:text-white"
						href="/incomes"
					>
						Pajamos
					</a>
					<a
						className="rounded-xl border py-2 px-4 text-slate-200 hover:bg:blue-700 hover:text-white"
						href="/expenses"
					>
						Islaidos
					</a>
				</nav>
			)}
		</aside>
	);
}
