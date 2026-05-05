import CreateProject from '@/components/projects/CreateProject';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ProjectTable from '@/components/projects/ProjectTable';
import { prisma } from '@/lib/prisma';

export default async function ProjectsPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect('/');
	}

	const projects = await prisma.project.findMany({
		select: {
			id: true,
			name: true,
			description: true,
			createdAt: true,
		},
	});

	return (
		<>
			<CreateProject />
			<ProjectTable projects={projects} />
		</>
	);
}
