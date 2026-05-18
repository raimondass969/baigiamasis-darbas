import { getExpenses } from '@/lib/queries/expenses';

type ExpenseTableProps = {
	expenses: Awaited<ReturnType<typeof getExpenses>>;
};

export default function ExpenseTable({ expenses }: ExpenseTableProps) {
	if (expenses.length === 0) {
		return (
			<div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4 text-center">
				<p className="text-lg font-semibold">Išlaidų įrašų dar nėra.</p>
				<p>
					Pridėkite pirmą išlaidų įrašą, kad jis būtų rodomas
					lentelėje.
				</p>
			</div>
		);
	}
	return (
		<div className="bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden">
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
					{expenses.map((expense) => (
						<tr
							key={expense.id}
							className="border-b border-slate-700 last:border-b-0 hover:bg-slate-500 transition-colors duration-300"
						>
							<td className="p-4 text-left ">
								{expense.date.toLocaleDateString()}
							</td>
							<td className="p-4 text-left ">
								{expense.project.name}
							</td>
							<td className="p-4 text-left ">
								{expense.category.name}
							</td>
							<td className="p-4 text-left ">
								{expense.description}
							</td>
							<td className="p-4 text-left text-red-500">
								{expense.amount.toNumber()} €
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
