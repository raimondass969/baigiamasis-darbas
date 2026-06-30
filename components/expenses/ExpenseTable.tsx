import { getExpenses } from '@/lib/queries/expenses';
import TransactionTableAction from '../ui/TransactionTableAction';

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
		<>
			<div className="flex flex-col gap-4 md:hidden">
				{expenses.map((expense) => (
					<div
						key={expense.id}
						className="rounded-xl border border-slate-700 bg-slate-800/40 p-4 flex flex-col gap-2"
					>
						<div className="flex justify-between items-center">
							<span className="text-sm text-slate-400">
								{expense.date.toLocaleDateString()}
							</span>
							<span className="text-sm text-red-500">
								{expense.amount.toNumber()} €
							</span>
						</div>
						<p className="font-medium">{expense.project.name}</p>
						<span className="text-sm text-slate-400">
							{expense.category.name}
						</span>
						{expense.description && (
							<p className="text-sm text-slate-300">
								{expense.description}
							</p>
						)}
						<div className="pt-1">
							<TransactionTableAction
								label="išlaidų"
								transactionId={expense.id}
							/>
						</div>
					</div>
				))}
			</div>
			<div className="hidden md:block bg-slate-800/40 rounded-2xl border border-slate-700 overflow-x-auto">
				<table className="w-full min-[600px]:w-full">
					<thead>
						<tr className="border-b border-slate-700 hover:bg-slate-500/40 transition-colors duration-300 dark:bg-slate-700/40">
							<th className="p-4 text-left">Data</th>
							<th className="p-4 text-left">Projektas</th>
							<th className="p-4 text-left">Kategorija</th>
							<th className="p-4 text-left">Aprašymas</th>
							<th className="p-4 text-left">Suma</th>
							<th className="p-4 text-left">Redagavimas</th>
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
								<td className="p-4 text-left">
									<TransactionTableAction
										label="išlaidų"
										transactionId={expense.id}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
