import { checkUserSession } from '@/lib/auth/checkUserSession';
import DashboardKpiCard from './DashboardKpiCard';
import getDashboardSummary from '@/lib/queries/dashboardSummary';
import { getDashboardLabels } from '@/lib/dashboard/dashboardLabels';

export type DashboardPageCardsProps = {
	selectedProjectId: string;
	year?: string;
	month?: string;
	period: string;
};

export default async function DashboardPageCards({
	selectedProjectId,
	year,
	month,
	period,
}: DashboardPageCardsProps) {
	const userId = await checkUserSession();
	const userSummary = await getDashboardSummary(
		Number(userId),
		selectedProjectId,
		year,
		month,
	);

	const labels = getDashboardLabels(period);

	return (
		<section className="grid gap-4 md:grid-cols-4">
			<DashboardKpiCard
				label={labels.incomeTitle}
				value={`${userSummary.incomeTotal} €`}
				valueColor="text-green-500"
				description={labels.periodText}
			/>

			<DashboardKpiCard
				label={labels.expenseTitle}
				value={`${userSummary.expenseTotal} €`}
				valueColor="text-red-500"
				description={labels.periodText}
			/>

			<DashboardKpiCard
				label={labels.balanceTitle}
				value={`${userSummary.balance} €`}
				valueColor={`${userSummary.balance < 0 ? 'text-red-500' : 'text-green-500'}`}
				description={labels.balanceDescription}
			/>

			<DashboardKpiCard
				label={labels.projectsTitle}
				value={userSummary.projectCount}
				description={labels.projectsDescription}
			/>
		</section>
	);
}
