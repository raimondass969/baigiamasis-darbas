import CreateExpenses from '@/components/expenses/CreateExpenses';
import ExpenseTable from '@/components/expenses/ExpenseTable';
import FilteredProjects from '@/components/filters/FilteredProjects';
import { getProjectFilterPageData } from '@/lib/filters/getFilterPageData';
import { getExpenses } from '@/lib/queries/expenses';
import { getTransactionCategory } from '@/lib/queries/transactionCategories';
import { TransactionType } from '@prisma/client';

type ExpenseType = {
	searchParams: Promise<{ projectId: string; year?: string; month?: string }>;
};

export default async function Expenses({ searchParams }: ExpenseType) {
	const {
		userId,
		selectedProjectId,
		projectsForSelect,
		year,
		month,
		period,
	} = await getProjectFilterPageData({ searchParams });

	//Kategorijus islaidu
	const expenseCategories = await getTransactionCategory(
		TransactionType.EXPENSE,
	);

	//Islaidos dropdownui pasirinkti
	const expensesOptions = expenseCategories.map((expense) => ({
		id: String(expense.id),
		name: expense.name,
	}));

	// Visos islaidos su projekto pav,lentelei
	const expenses = await getExpenses(
		Number(userId),
		selectedProjectId,
		year,
		month,
	);

	//
	return (
		<div className="py-4 px-2">
			<FilteredProjects
				projects={projectsForSelect}
				selectedProjectId={selectedProjectId}
				year={year}
				month={month}
				period={period}
			/>
			<CreateExpenses
				projectSelect={projectsForSelect}
				expenseCategories={expensesOptions}
			/>
			<ExpenseTable expenses={expenses} />
		</div>
	);
}
