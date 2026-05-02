'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
	const sidebarList = [
		{ label: 'Apzvalga', href: '/dashboard' },
		{ label: 'Projektai', href: '/dashboard/projects' },
		{ label: 'Pajamos', href: '/dashboard/incomes' },
		{ label: 'Išlaidos', href: '/dashboard/expenses' },
	];

	//gaunam url
	const pathname = usePathname();

	return (
		<aside className="w-48 border-r border-slate-600 px-4 py-6">
			<nav>
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
	);
}
