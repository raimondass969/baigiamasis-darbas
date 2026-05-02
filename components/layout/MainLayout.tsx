import Header from './Header';
import Sidebar from './Sidebar';
export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col dark:bg-linear-to-b from-slate-900 to-slate-950">
			<Header />

			<div className="flex flex-1 ">
				<Sidebar />

				<main className="flex-1 p-8 ">{children}</main>
			</div>
		</div>
	);
}
