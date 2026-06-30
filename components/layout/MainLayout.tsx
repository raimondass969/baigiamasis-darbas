import Header from './Header';
import Sidebar from './Sidebar';
export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-linear-to-b dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
			<Header />

			<div className="flex flex-1 md:flex-row ">
				<Sidebar />

				<main className="flex-1 px-4 py-6 sm:px-6 lg:p-8 ">
					{children}
				</main>
			</div>
		</div>
	);
}
