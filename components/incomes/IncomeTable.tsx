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
							<td className="p-4">
								{income.createdAt.toLocaleDateString()}
							</td>
							<td className="p-4">{income.project.name}</td>
							<td className="p-4">{income.category.name}</td>
							<td className="p-4">{income.description}</td>
							<td className="p-4">
								{income.amount.toNumber()} $
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
