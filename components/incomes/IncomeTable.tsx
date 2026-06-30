import { Decimal } from '@prisma/client/runtime/library';
import TransactionTableAction from '../ui/TransactionTableAction';

type IncomeTableRow = {
	id: number;
	amount: Decimal;
	description: string | null;
	date: Date;
	createdAt: Date;
	project: {
		id: number;
		name: string;
	};
	category: {
		id: number;
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
		<>
			{/* Mobilus vaizdas */}
			<div className="flex flex-col gap-4 md:hidden">
				{incomes.map((income) => (
					<div
						key={income.id}
						className="rounded-xl border border-slate-700 bg-slate-800/40 p-4 flex flex-col gap-2"
					>
						<div className="flex justify-between items-center">
							<span className="text-sm text-slate-400">
								{income.date.toLocaleDateString()}
							</span>
							<span className="text-sm text-green-500">
								{income.amount.toNumber()} €
							</span>
						</div>
						<p className="font-medium">{income.project.name}</p>
						<span className="text-sm text-slate-400">
							{income.category.name}
						</span>
						{income.description && (
							<p className="text-sm text-slate-300">
								{income.description}
							</p>
						)}
						<div className="pt-1">
							<TransactionTableAction
								label="pajamų"
								transactionId={income.id}
							/>
						</div>
					</div>
				))}
			</div>

			{/* Desktop vaizdas */}
			<div className="hidden md:block bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden">
				<table className="w-full">
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
								<td className="p-4 text-left">
									<TransactionTableAction
										label="pajamų"
										transactionId={income.id}
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
