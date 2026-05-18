import { checkUserSession } from '@/lib/auth/checkUserSession';
import DashboardKpiCard from './DashboardKpiCard';
import getDashboardSummary from '@/lib/queries/dashboardSummary';

export type DashboardPageCardsProps = {
	selectedProjectId: string;
	year: string;
	month: string;
};

export default async function DashboardPageCards({
	selectedProjectId,
	year,
	month,
}: DashboardPageCardsProps) {
	const userId = await checkUserSession();
	const userSummary = await getDashboardSummary(
		Number(userId),
		selectedProjectId,
		year,
		month,
	);

	return (
		<section className="grid gap-4 md:grid-cols-4">
			<DashboardKpiCard
				label="Pajamos šį mėnesį"
				value={`${userSummary.incomeTotal} €`}
				valueColor={`${userSummary.incomeTotal < 0 ? 'text-red-500' : 'text-green-500'}`}
				description="-"
			/>

			<DashboardKpiCard
				label="Išlaidos šį mėnesį"
				value={`${userSummary.expenseTotal} €`}
				valueColor={`${userSummary.expenseTotal > 0 ? 'text-red-500' : 'text-green-500'}`}
				description="-"
			/>

			<DashboardKpiCard
				label="Grynasis rezultatas"
				value={`${userSummary.balance} €`}
				valueColor={`${userSummary.balance < 0 ? 'text-red-500' : 'text-green-500'}`}
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
