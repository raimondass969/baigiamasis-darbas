import { Decimal } from '@prisma/client/runtime/library';

type IncomeTableRow = {
	id: number;
	amount: Decimal;
	description: string | null;
	date: Date;
	createdAt: Date;
	project: {
		name: string;
	};
	category: {
		name: string;
	};
};

export type IncomeTableProps = {
	incomes: IncomeTableRow[];
};
export default function IncomeTable({ incomes }: IncomeTableProps) {
	if (incomes.length === 0) {
		return (
			<div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4 text-center">
				<p className="text-lg font-semibold">Pajamų įrašų dar nėra.</p>
				<p>
					Pridėkite pirmą pajamų įrašą, kad jis būtų rodomas
					lentelėje.
				</p>
			</div>
		);
	}

	return (
		<div className=" bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden">
			<table className="w-full">
				<thead>
					<tr className="border-b border-slate-700 hover:bg-slate-500/40 transition-colors duration-300">
						<th className="p-4 text-left">Data</th>
						<th className="p-4 text-left">Projektas</th>
						<th className="p-4 text-left">Kategorija</th>
						<th className="p-4 text-left">Aprašymas</th>
						<th className="p-4 text-left">Suma</th>
					</tr>
				</thead>

				<tbody>
					{incomes.map((income) => (
						<tr
							key={income.id}
							className="border-b border-slate-700 last:border-b-0 hover:bg-slate-500 transition-colors duration-300"
						>
							<td className="p-4 text-left">
								{income.date.toLocaleDateString()}
							</td>
							<td className="p-4 text-left">
								{income.project.name}
							</td>
							<td className="p-4 text-left">
								{income.category.name}
							</td>
							<td className="p-4 text-left">
								{income.description}
							</td>
							<td className="p-4 text-left text-green-500">
								{income.amount.toNumber()} €
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
