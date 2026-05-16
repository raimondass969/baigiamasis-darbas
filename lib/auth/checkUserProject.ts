import { prisma } from '../prisma';

type CheckUserProjectProps = {
	userId: number;
	projectId: number;
};

// Patikrinam ar prisijungusiam vartotojui priklauso projektas
export async function CheckUserProject({
	userId,
	projectId,
}: CheckUserProjectProps) {
	const project = await prisma.project.findFirst({
		where: {
			id: projectId,
			userId: userId,
		},
		select: {
			id: true,
			userId: true,
		},
	});
	return project;
}
