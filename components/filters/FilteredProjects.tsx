'use client';

import FilterSelect, { SelectOption } from '../ui/FilterSelect';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const months: SelectOption[] = [
	{ id: '1', name: 'Sausis' },
	{ id: '2', name: 'Vasaris' },
	{ id: '3', name: 'Kovas' },
	{ id: '4', name: 'Balandis' },
	{ id: '5', name: 'Gegužė' },
	{ id: '6', name: 'Birželis' },
	{ id: '7', name: 'Liepa' },
	{ id: '8', name: 'Rugpjūtis' },
	{ id: '9', name: 'Rugsėjis' },
	{ id: '10', name: 'Spalis' },
	{ id: '11', name: 'Lapkritis' },
	{ id: '12', name: 'Gruodis' },
];

type FilteredProjcetsProps = {
	projects: SelectOption[];
	selectedProjectId: string;
	year?: string;
	month?: string;
	period?: string;
};

export default function FilteredProjects({
	projects,
	selectedProjectId,
	year,
	month,
	period,
}: FilteredProjcetsProps) {
	// leidzia perkelt i kita url
	const router = useRouter();
	// Gaunam dabartini url
	const pathName = usePathname();
	// Pasiima URL filtrus, kurie yra po klaustuko (?projectId=3).
	const searchParams = useSearchParams();

	function handleProjectChange(projectId: string) {
		//paverciam url i string
		const params = new URLSearchParams(searchParams.toString());

		//vartotojui pasirinkus projekta-> Irasom projekto id i search parametrus
		if (projectId) {
			params.set('projectId', projectId);
		} else {
			//Pasirenkant visi projektai pasalinam project id is URL
			params.delete('projectId');
		}
		router.push(`${pathName}?${params.toString()}`);
	}

	function handleMonthChange(selectedMonth: string) {
		const params = new URLSearchParams(searchParams.toString());

		if (selectedMonth) {
			params.set('year', year ?? new Date().getFullYear().toString());
			params.set('month', selectedMonth);
			params.set('period', 'month');
		} else {
			params.delete('month');
		}

		router.push(`${pathName}?${params.toString()}`);
	}

	function handleAllPeriod() {
		const params = new URLSearchParams(searchParams.toString());

		params.set('period', 'all');

		params.delete('year');
		params.delete('month');

		router.push(`${pathName}?${params.toString()}`);
	}
	return (
		<div className="mb-6 flex flex-wrap sm:flex-row items-stretch sm:items-center gap-3">
			<FilterSelect
				id="filterProject"
				name="filterProject"
				value={selectedProjectId}
				options={projects}
				placeholder="Visi projektai"
				onChange={handleProjectChange}
				className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-slate-300 transition hover:border-slate-500"
			/>
			<FilterSelect
				id="filterMonth"
				name="filterMonth"
				value={period === 'all' ? '' : (month ?? '')}
				options={months}
				placeholder="Pasirinkite mėnesį"
				onChange={handleMonthChange}
				className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-slate-300 transition hover:border-slate-500"
			/>
			<button
				type="button"
				onClick={handleAllPeriod}
				className={`flex items-center gap-2  rounded-xl border px-4 py-2 transition dark:border-slate-700 ${
					period === 'all'
						? 'bg-blue-600 text-white'
						: 'dark:bg-slate-800 hover:bg-slate-800'
				}`}
			>
				Visas laikotarpis
			</button>
		</div>
	);
}
