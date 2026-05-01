'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

function ThemeToggle() {
	// nustatome tema ir funkcija, kuri keis tema
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Kol neuzsikrove nieko negrazinam
	if (!mounted) {
		return null;
	}

	const isDark = theme === 'dark';

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-black "
		>
			{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
		</button>
	);
}

export default ThemeToggle;
