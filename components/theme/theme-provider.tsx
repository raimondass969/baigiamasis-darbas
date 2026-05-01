'use client';
import type { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = {
	children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
	const Provider = NextThemesProvider as unknown as React.ComponentType<{
		children: ReactNode;
		attribute: 'class';
		defaultTheme: string;
		enableSystem: boolean;
		disableTransitionOnChange: boolean;
	}>;

	return (
		<Provider
			attribute="class"
			defaultTheme="system"
			enableSystem={true}
			disableTransitionOnChange={true}
		>
			{children}
		</Provider>
	);
}
