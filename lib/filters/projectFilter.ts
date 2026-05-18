// Filtras prisma uzklausoms
export function projectFilter(userId: number, selectedProjectId?: string) {
	return selectedProjectId
		? { userId: userId, id: Number(selectedProjectId) }
		: { userId: userId };
}
