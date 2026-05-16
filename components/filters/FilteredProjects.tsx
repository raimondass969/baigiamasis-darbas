'use client';

import FilterSelect, { SelectOption } from '../ui/FilterSelect';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type FilteredProjcetsProps = {
	projects: SelectOption[];
	selectedProjectId: string;
};

export default function FilteredProjects({
	projects,
	selectedProjectId,
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
		</div>
	);
}
