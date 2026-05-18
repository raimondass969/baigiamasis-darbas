'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { ChevronDown, LogOut, Moon, Sun } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function UserMenu({
	name,
	initials,
}: {
	name: string;
	initials: string;
}) {
	const [open, setOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	const isDark = theme === 'dark';

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				className="flex items-center gap-2 rounded-xl border border-slate-700 p-2 text-slate-200 hover:bg-slate-800"
			>
				<div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-xs font-medium text-blue-100">
					{initials}
				</div>
				<span className="text-sm text-slate-200">{name}</span>
				<ChevronDown size={14} className="text-slate-400" />
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
