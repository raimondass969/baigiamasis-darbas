import CreateIncomes from '@/components/incomes/CreateIncomes';
import { getTransactionCategory } from '@/lib/queries/transactionCategories';
import { TransactionType } from '@prisma/client';
import getUserProjectsForSelect from '@/lib/queries/projectsForSelect';
import { checkUserSession } from '@/lib/auth/checkUserSession';
import IncomeTable from '@/components/incomes/IncomeTable';
import { GetIncomes } from '@/lib/queries/incomes';

export default async function Incomes() {
	const userId = await checkUserSession();
	const projectsForSelect = await getUserProjectsForSelect(Number(userId));

	const incomeCategories = await getTransactionCategory(
		TransactionType.INCOME,
	);
	// Kategorijos select
	const categoryOptions = incomeCategories.map((category) => ({
		id: String(category.id),
		name: category.name,
	}));
	// Projektai select
	const projectForSelect = projectsForSelect.map((project) => ({
		id: String(project.id),
		name: project.name,
	}));

	// Pajamos

	const incomes = await GetIncomes(Number(userId));

	return (
		<div className="py-4 px-2">
			<CreateIncomes
				projects={projectForSelect}
				categories={categoryOptions}
			/>
			<IncomeTable incomes={incomes} />
		</div>
	);
}
