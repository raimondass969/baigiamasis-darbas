import { checkUserSession } from '@/lib/auth/checkUserSession';
import DashboardPageCards from '@/components/dashboard/DashboardPageCards';
import getUserProjectsForSelect from '@/lib/queries/projectsForSelect';
import FilteredProjects from '@/components/filters/FilteredProjects';

type DashboardTypes = {
	searchParams: Promise<{ projectId: string }>;
};

export default async function Dashboard({ searchParams }: DashboardTypes) {
	const userId = await checkUserSession();

	const projectsForSelect = await getUserProjectsForSelect(Number(userId));

	const params = await searchParams;
	// ieskom url projectId
	const selectedProjectId = params.projectId ?? '';
	return (
		<div className="space-y-8">
			<FilteredProjects
				projects={projectsForSelect}
				selectedProjectId={selectedProjectId}
			/>
			<section>
				<p className="text-lg font-bold ">Apžvalga</p>
				<h2 className="text-xl font-semibold text-slate-500">
					Bendra finansinė situacija
				</h2>
			</section>

			<DashboardPageCards selectedProjectId={selectedProjectId} />

			<section className="grid gap-4 lg:grid-cols-2">
				<div className="rounded-2xl border border-slate-800 dark:bg-slate-900/60 p-5">
					<h2 className="text-lg font-semibold">Greiti veiksmai</h2>
				</div>

				<div className="rounded-2xl border border-slate-800 dark:bg-slate-900/60 p-5">
					<h2 className="text-lg font-semibold">
						Paskutiniai įrašai
					</h2>
					<p className="mt-4 text-sm text-slate-400">
						Kol kas nėra įrašų.
					</p>
				</div>
			</section>
		</div>
	);
}
