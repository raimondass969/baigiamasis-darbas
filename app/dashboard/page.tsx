import IncomeExpenseCharts from '@/components/dashboard/charts/IncomeExpenseChart';
import DashboardPageCards from '@/components/dashboard/DashboardPageCards';
import DashboardQuickActions from '@/components/dashboard/DashboardQuickActions';
import FilteredProjects from '@/components/filters/FilteredProjects';
import { getProjectFilterPageData } from '@/lib/filters/getFilterPageData';
import { getMonthlyIncomesExpenses } from '@/lib/queries/monthlyIncomeExpense';

type DashboardTypes = {
	searchParams: Promise<{ projectId: string; year?: string; month?: string }>;
};

export default async function Dashboard({ searchParams }: DashboardTypes) {
	const {
		selectedProjectId,
		projectsForSelect,
		year,
		month,
		period,
		userId,
	} = await getProjectFilterPageData({ searchParams });

	const selectedYear = year ? Number(year) : new Date().getFullYear();
	const chartData = await getMonthlyIncomesExpenses(
		userId,
		selectedYear,
		selectedProjectId,
	);

	return (
		<div className="space-y-4 sm:space-y-8">
			<FilteredProjects
				projects={projectsForSelect}
				selectedProjectId={selectedProjectId}
				year={year}
				month={month}
				period={period}
			/>
			<section>
				<p className="text-base sm:text-lg font-bold ">Apžvalga</p>
				<h2 className="text-lg sm:text-xl font-semibold text-slate-500">
					Bendra finansinė situacija
				</h2>
			</section>

			<DashboardPageCards
				selectedProjectId={selectedProjectId}
				year={year}
				month={month}
				period={period}
			/>

			<div>
				<IncomeExpenseCharts data={chartData} />
			</div>

			<DashboardQuickActions />
		</div>
	);
}
