import DashboardHeader from './DashboardHeader';
import Sidebar from './DashboardSidebar';
export default function DashboardShell({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen dark:bg-linear-to-b from-slate-900 to-slate-950">
			<Sidebar />

			<div className="flex min-w-0 flex-1 flex-col">
				<DashboardHeader />

				<main className="flex-1 px-8 py-8">{children}</main>
			</div>
		</div>
	);
}
