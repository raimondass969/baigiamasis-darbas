'use client';

import FilterSelect, { SelectOption } from '../ui/FilterSelect';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

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

	function handleDateChange(value: string) {
		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			const [year, month] = value.split('-');
			params.set('year', year);
			params.set('month', month);
			params.delete('period');
		} else {
			params.delete('year');
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
		<div className="mb-6 flex flex-wrap items-center gap-4">
			<FilterSelect
				id="filterProject"
				name="filterProject"
				value={selectedProjectId}
				options={projects}
				placeholder="Visi projektai"
				onChange={handleProjectChange}
			/>
			<input
				type="month"
				className="flex items-center justify-between px-4 py-2 gap-2 rounded-xl border dark:border-slate-700 dark:bg-slate-800 hover:bg-slate-800 "
				onChange={(e) => handleDateChange(e.target.value)}
				value={
					period === 'all'
						? ''
						: year && month
							? `${year}-${month.padStart(2, '0')}`
							: ''
				}
			/>
			<button
				type="button"
				onClick={handleAllPeriod}
				className={`rounded-xl border px-4 py-2 transition dark:border-slate-700 ${
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
