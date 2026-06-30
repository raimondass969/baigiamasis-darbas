'use client';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
	const [open, setOpen] = useState(false);

	const sidebarList = [
		{ label: 'Apzvalga', href: '/dashboard' },
		{ label: 'Projektai', href: '/dashboard/projects' },
		{ label: 'Pajamos', href: '/dashboard/incomes' },
		{ label: 'Išlaidos', href: '/dashboard/expenses' },
	];

	//gaunam url
	const pathname = usePathname();

	return (
		<>
			{/* Hamburger mygtukas mob ekranui */}

			<button
				className="fixed top-4 left-4 z-50 md:hidden rounded-lg bg-slate-800 p-2 text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
				onClick={() => setOpen((prev) => !prev)}
			>
				{open ? <X size={24} /> : <Menu size={24} />}
			</button>
			{open && (
				<div
					className="fixed inset-0 z-30 bg-black/50 md:hidden"
					onClick={() => setOpen(false)}
				></div>
			)}

			<aside
				className={`fixed top-0 left-0 z-40 h-full w-48 border-r border-slate-600 px-4 py-6
			bg-slate-900 transition-transform duration-300 md:static md:translate-x-0 md:block md:h-auto md:self-stretch
			${open ? 'translate-x-0' : '-translate-x-full'}
			`}
			>
				<nav className="mt-10 md:mt-0">
					<ul className="space-y-8">
						{sidebarList.map((item) => {
							const isActive = pathname === item.href;

							return (
								<li key={item.href}>
									<Link
										href={item.href}
										className={`block rounded-xl px-4 py-2 transition  ${
											isActive
												? 'bg-blue-600'
												: 'text-slate-300'
										}`}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</aside>
		</>
	);
}
