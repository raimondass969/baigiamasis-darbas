'use client';

import { useState } from 'react';
import { LogOut, Moon, Settings, Sun } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

export default function DashboardActionMenu() {
	const [open, setOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	const isDark = theme === 'dark';

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				className="rounded-xl border border-slate-700 p-2 text-slate-200 hover:bg-slate-800"
			>
				<Settings size={20} />
			</button>

			{open && (
				<div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-lg">
					<button
						type="button"
						onClick={() => setTheme(isDark ? 'light' : 'dark')}
						className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-800"
					>
						{isDark ? <Sun size={18} /> : <Moon size={18} />}
						{isDark ? 'Šviesi tema' : 'Tamsi tema'}
					</button>

					<button
						type="button"
						onClick={() => signOut({ callbackUrl: '/' })}
						className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
					>
						<LogOut size={18} />
						Atsijungti
					</button>
				</div>
			)}
		</div>
	);
}
