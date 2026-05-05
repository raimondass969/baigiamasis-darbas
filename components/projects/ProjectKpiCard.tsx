type ProjectKpiCardProps = {
	label: string;
	expenses: string | number;
	incomes: string | number;
	description?: string;
	dateRange: string;
};

export default function ProjectKpiCard({
	label,
	expenses,
	incomes,
	description,
	dateRange,
}: ProjectKpiCardProps) {
	return (
		<section>
			<div>
				<p>Jusu visi projektai</p>
				<table className=" dark:bg-slate-700/40 w-full">
					<thead>
						<tr>
							<th>Projekto pavadinimas</th>
							<th>Aprašymas</th>
							<th>Sukurtas</th>
							<th>Pajamos</th>
							<th>Išlaidos</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>{label}</td>
							<td>{description}</td>
							<td>{dateRange}</td>
							<td>{incomes}</td>
							<td>{expenses}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
}
