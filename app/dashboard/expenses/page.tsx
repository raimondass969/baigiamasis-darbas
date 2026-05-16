import CreateExpenses from '@/components/expenses/CreateExpenses';
import ExpenseTable from '@/components/expenses/ExpenseTable';
import { checkUserSession } from '@/lib/auth/checkUserSession';
import { GetExpenses } from '@/lib/queries/expenses';
import getUserProjectsForSelect from '@/lib/queries/projectsForSelect';
import { getTransactionCategory } from '@/lib/queries/transactionCategories';
import { TransactionType } from '@prisma/client';

export default async function Expenses() {
	const userId = await checkUserSession();

	// Gaunam projketu sarasa prisijungusiam ID
	const projectsForSelect = await getUserProjectsForSelect(Number(userId));

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
	const expenses = await GetExpenses(Number(userId));

	return (
		<div>
			<CreateExpenses
				projectSelect={projectsForSelect}
				expenseCategories={expensesOptions}
			/>
			<ExpenseTable expenses={expenses} />
		</div>
	);
}
