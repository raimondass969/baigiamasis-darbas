import CreateExpenses from '@/components/expenses/CreateExpenses';
import { checkUserSession } from '@/lib/auth/checkUserSession';
import getUserProjectsForSelect from '@/lib/queries/projectsForSelect';
import { getTransactionCategory } from '@/lib/queries/transactionCategories';
import { TransactionType } from '@prisma/client';

export default async function Expenses() {
	const userId = await checkUserSession();

	// Gaunam projketu sarasa prisijungusiam ID
	const userProjects = await getUserProjectsForSelect(Number(userId));

	//Kategorijus islaidu
	const expenseCategories = await getTransactionCategory(
		TransactionType.EXPENSE,
	);

	//Islaidos dropdownui pasirinkti
	const expensesOptions = expenseCategories.map((expense) => ({
		id: String(expense.id),
		name: expense.name,
	}));
	//Projektu sarasas pasirinkti
	const projectForSelect = userProjects.map((project) => ({
		id: String(project.id),
		name: project.name,
	}));
	return (
		<div>
			<CreateExpenses
				projectSelect={projectForSelect}
				expenseCategories={expensesOptions}
			/>
		</div>
	);
}
