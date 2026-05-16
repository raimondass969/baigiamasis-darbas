import { prisma } from '../prisma';

// Select formai projektai
export default async function getUserProjectsForSelect(userId: number) {
	const projects = await prisma.project.findMany({
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
	return projects.map((pro) => ({
		id: String(pro.id),
		name: String(pro.name),
	}));
}
