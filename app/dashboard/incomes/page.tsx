import CreateIncomes from '@/components/incomes/CreateIncomes';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

export default async function Incomes() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect('/');
	}

	const projects = await prisma.project.findMany({
		where: {
			userId: Number(session.user.id),
		},
		select: {
			id: true,
			name: true,
			description: true,
			createdAt: true,
			updatedAt: true,
			transactions: {
				select: {
					id: true,
					amount: true,
					date: true,
					category: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		},
	});

	const incomeCategories = await prisma.category.findMany({
		where: {
			type: 'INCOME',
		},
		select: {
			id: true,
			name: true,
		},
		orderBy: {
			name: 'asc',
		},
	});

	const projectOptions = projects.map((project) => ({
		id: String(project.id),
		name: project.name,
	}));

	const categoryOptions = incomeCategories.map((category) => ({
		id: String(category.id),
		name: category.name,
	}));

	return (
		<div className="py-4 px-2">
			<CreateIncomes
				projects={projectOptions}
				categories={categoryOptions}
			/>
		</div>
	);
}
