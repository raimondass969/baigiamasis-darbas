import { prisma } from '../prisma';

// Project pilnas projektas
export async function getUserProjects(userId: number) {
	return prisma.project.findMany({
		where: {
			userId,
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
							type: true,
						},
					},
				},
			},
		},
	});
}
