import { checkUserSession } from '@/lib/auth/checkUserSession';
import DashboardKpiCard from './DashboardKpiCard';
import getDashboardSummary from '@/lib/queries/dashboardSummary';

export type projectForSelectProps = {
	selectedProjectId: string;
};

export default async function DashboardPageCards({
	selectedProjectId,
}: projectForSelectProps) {
	const userId = await checkUserSession();
	const userSummary = await getDashboardSummary(
		Number(userId),
		selectedProjectId,
	);

	return (
		<section className="grid gap-4 md:grid-cols-4">
			<DashboardKpiCard
				label="Pajamos šį mėnesį"
				value={userSummary.incomeTotal}
				description="-"
			/>

			<DashboardKpiCard
				label="Išlaidos šį mėnesį"
				value={userSummary.expenseTotal}
				description="-"
			/>

			<DashboardKpiCard
				label="Grynasis rezultatas"
				value={userSummary.balance}
				description="-"
			/>

			<DashboardKpiCard
				label="Aktyvus projektai"
				value={userSummary.projectCount}
				description="??"
			/>
		</section>
	);
}
