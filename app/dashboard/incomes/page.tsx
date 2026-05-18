import CreateIncomes from '@/components/incomes/CreateIncomes';
import { getTransactionCategory } from '@/lib/queries/transactionCategories';
import { TransactionType } from '@prisma/client';
import IncomeTable from '@/components/incomes/IncomeTable';
import { getIncomes } from '@/lib/queries/incomes';
import FilteredProjects from '@/components/filters/FilteredProjects';
import { getProjectFilterPageData } from '@/lib/filters/getFilterPageData';

type IncomesType = {
	searchParams: Promise<{
		projectId?: string;
		year?: string;
		month?: string;
	}>;
};

export default async function Incomes({ searchParams }: IncomesType) {
	const {
		userId,
		selectedProjectId,
		projectsForSelect,
		year,
		month,
		period,
	} = await getProjectFilterPageData({ searchParams });

	const incomeCategories = await getTransactionCategory(
		TransactionType.INCOME,
	);
	// Kategorijos select
	const categoryOptions = incomeCategories.map((category) => ({
		id: String(category.id),
		name: category.name,
	}));

	// Pajamos
	const incomes = await getIncomes(userId, selectedProjectId, year, month);

	return (
		<div className="py-4 px-2">
			<FilteredProjects
				projects={projectsForSelect}
				selectedProjectId={selectedProjectId}
				year={year}
				month={month}
				period={period}
			/>
			<CreateIncomes
				projects={projectsForSelect}
				categories={categoryOptions}
			/>
			<IncomeTable incomes={incomes} />
		</div>
	);
}
