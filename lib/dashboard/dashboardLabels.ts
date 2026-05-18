export function getDashboardLabels(period: string) {
	if (period === 'all') {
		return {
			periodText: 'Per visą laikotarpį',
			incomeTitle: 'Bendros pajamos',
			expenseTitle: 'Bendros išlaidos',
			balanceTitle: 'Pajamų ir išlaidų skirtumas',
			projectsTitle: 'Projektų skaičius',
			balanceDescription: 'Gatautos pajamos minus patirtos išlaidos',
		};
	}
	if (period === 'year') {
		return {
			periodText: 'Šiais metais',
			incomeTitle: 'Gautos pajamos',
			expenseTitle: 'Patirtos išlaidos',
			balanceTitle: 'Pajamų ir išlaidų skirtumas',
			projectsTitle: 'Projektų skaičius',
			balanceDescription: 'Gatautos pajamos minus patirtos išlaidos',
		};
	}

	return {
		periodText: 'Šį mėnesį',
		incomeTitle: 'Gautos pajamos',
		expenseTitle: 'Patirtos išlaidos',
		balanceTitle: 'Pajamų ir išlaidų skirtumas',
		projectsTitle: 'Projektų skaičius',
		balanceDescription: 'Gatautos pajamos minus patirtos išlaidos',
		projectsDescription: 'Šio mėnesio projektai',
	};
}
