import CreateProject from '@/components/projects/CreateProject';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function ProjectsPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect('/');
	}

	return <CreateProject />;
}
