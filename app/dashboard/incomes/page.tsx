import CreateIncomes from '@/components/incomes/CreateIncomes';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getTransactionCategory } from '@/lib/queries/transactionCategories';
import { TransactionType } from '@prisma/client';
import getUserProjectsForSelect from '@/lib/queries/projectsForSelect';
import { checkUserSession } from '@/lib/auth/checkUserSession';

export default async function Incomes() {
	const userId = await checkUserSession();

	const projectsForSelect = await getUserProjectsForSelect(Number(userId));

	const incomeCategories = await getTransactionCategory(
		TransactionType.INCOME,
	);

	const categoryOptions = incomeCategories.map((category) => ({
		id: String(category.id),
		name: category.name,
	}));

	const projectForSelect = projectsForSelect.map((project) => ({
		id: String(project.id),
		name: project.name,
	}));

	return (
		<div className="py-4 px-2">
			<CreateIncomes
				projects={projectForSelect}
				categories={categoryOptions}
			/>
		</div>
	);
}
