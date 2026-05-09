import CreateProject from '@/components/projects/CreateProject';
import ProjectTable from '@/components/projects/ProjectTable';
import { getUserProjects } from '@/lib/queries/projects';
import { checkUserSession } from '@/lib/auth/checkUserSession';

export default async function ProjectsPage() {
	const userId = await checkUserSession();

	const projects = await getUserProjects(Number(userId));

	return (
		<>
			<CreateProject />
			<ProjectTable projects={projects} />
		</>
	);
}
