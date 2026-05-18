import { ST } from 'next/dist/shared/lib/utils';
import { checkUserSession } from '../auth/checkUserSession';
import getUserProjectsForSelect from '../queries/projectsForSelect';

type SearchParamsProps = {
	searchParams: Promise<{
		projectId?: string;
		year?: string;
		month?: string;
	}>;
};
export async function getProjectFilterPageData({
	searchParams,
}: SearchParamsProps) {
	const params = await searchParams;
	// is url pasiimame pasirinkto projectoId
	const selectedProjectId = params.projectId ?? '';
	// Date block
	const currentDate = new Date();

	const year = params.year ?? String(currentDate.getFullYear());
	const month =
		params.month ?? String(currentDate.getMonth() + 1).padStart(2, '0');

	//Patikrinam ar prisijunges
	const userId = await checkUserSession();

	const projectsForSelect = await getUserProjectsForSelect(userId);

	return {
		selectedProjectId,
		userId,
		projectsForSelect,
		year,
		month,
	};
}
