import Link from 'next/link';

const action = [
	{
		title: 'Pridėti projektą',
		description: 'Sukurti naują projektą',
		href: '/dashboard/projects',
	},
	{
		title: 'Prideti pajamas',
		description: 'Užregistruoti projekto pajamas',
		href: '/dashboard/incomes?create=true',
	},
	{
		title: 'Prideti išlaidas',
		description: 'Užregistruoti projekto išlaidas',
		href: '/dashboard/expenses?create=true',
	},
];

export default function DashboardQuickActions() {
	return (
		<div className="rounded-2xl border border-slate-700 dark:bg-slate-950 p-6">
			<h2 className="mb-5 text-xl font-semibold">Greiti veiksmai</h2>

			<div className="grid grid-cols-3 gap-3">
				{action.map((act) => (
					<Link
						key={act.href}
						href={act.href}
						className="rounded-xl border border-slate-800 dark:bg-slate-900 p-3 sm:p-4 transition hover:border-slate-600 hover:dark:bg-slate-800"
					>
						<p className="text-sm font-medium">{act.title}</p>
						<p className="mt-1 text-xs text-slate-400 hidden sm:block">
							{act.description}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
