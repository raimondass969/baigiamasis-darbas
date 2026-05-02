'use client';
import type { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = {
	children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		//aktyvuojam temos keitima
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem={true}
			disableTransitionOnChange={true}
		>
			{children}
		</NextThemesProvider>
	);
}
