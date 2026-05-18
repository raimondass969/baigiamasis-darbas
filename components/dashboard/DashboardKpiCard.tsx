type DashboardKpiCard = {
	label: string;
	value: string | number;
	description?: string;
	valueColor?: string;
};

export default function DashboardKpiCard({
	label,
	value,
	description,
	valueColor = '',
}: DashboardKpiCard) {
	return (
		<div className="rounded-xl border border-slate-700/40 dark:bg-slate-800/40 p-5 w-full">
			<p className="text-2xl text-center text-slate-400">{label}</p>

			<p className={`text-3xl font-semibold text-center ${valueColor}`}>
				{value}
			</p>

			{description && (
				<p className="mt-2 text-sm text-center">{description}</p>
			)}
		</div>
	);
}
