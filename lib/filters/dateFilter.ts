export function dateFilter(year?: string, month?: string) {
	const filter: {
		gte?: Date;
		lt?: Date;
	} = {};

	if (year && month) {
		const selectedYear = Number(year);
		const selectedMonth = Number(month);

		filter.gte = new Date(selectedYear, selectedMonth - 1, 1);
		filter.lt = new Date(selectedYear, selectedMonth, 1);
	}

	return Object.keys(filter).length > 0 ? filter : undefined;
}
