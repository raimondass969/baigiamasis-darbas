import { Decimal } from '@prisma/client/runtime/library';

type Project = {
	id: number;
	name: string;
	description: string | null;
	createdAt: Date;
	updatedAt: Date;
	transactions: {
		id: number;
		amount: Decimal;
		date: Date;
		category: {
			id: number;
			name: string;
			type: 'INCOME' | 'EXPENSE';
		};
	}[];
};

type ProjectTableProps = {
	projects: Project[];
};

export default function ProjectTable({ projects }: ProjectTableProps) {
	return (
		<div className="w-full bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-700">
			<table className="w-full rounded-2xl ">
				<thead>
					<tr className="text-left hover:bg-slate-800/50 transition-colors duration-150 ease-out p-5 border-b border-slate-700">
						<th className="p-3  ">Projekto Pavadinimas</th>
						<th className="p-3 ">Aprašymas</th>
						<th className="p-3">Sukurta</th>
						<th className="p-3 ">Pajamos</th>
						<th className="p-">Islaidos</th>
						<th className="p-3 border-slate-500 border-b">
							Balansas
						</th>
					</tr>
				</thead>

				<tbody>
					{projects.map((project) => {
						// filtruojam transakcijas pagal tipa ir suskaiciuojam suma
						const incomeTotal = project.transactions
							.filter(
								(transaction) =>
									transaction.category.type === 'INCOME',
							)
							.reduce(
								(sum, transaction) =>
									sum + transaction.amount.toNumber(),
								0,
							);

						const expenseTotal = project.transactions
							.filter(
								(transaction) =>
									transaction.category.type === 'EXPENSE',
							)
							.reduce(
								(sum, transaction) =>
									sum + transaction.amount.toNumber(),
								0,
							);

						return (
							<tr
								key={project.id}
								className="hover:bg-slate-600 transition-colors duration-150 ease-out border-b border-slate-700 last:border-b-0"
							>
								<td className="p-3 text-left">
									{project.name}
								</td>
								<td className="p-3 text-left">
									{project.description ?? 'Nėra aprašymo'}
								</td>
								<td className="p-3 text-left">
									{project.createdAt.toLocaleDateString()}
								</td>
								<td className="p-3 text-left">{incomeTotal}</td>
								<td className="p-3 text-left">
									{expenseTotal}
								</td>
								<td className="p-3 text-left">
									{incomeTotal - expenseTotal}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
