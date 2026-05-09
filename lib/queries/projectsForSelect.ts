import { prisma } from '../prisma';

// Select formai projektai
export default async function getUserProjectsForSelect(userId: number) {
	return prisma.project.findMany({
		where: {
			userId,
		},
		select: {
			id: true,
			name: true,
		},
		orderBy: {
			name: 'asc',
		},
	});
}
