'use client';
import DashboardActionButtons from './DashboardActionButtons';

export default function DashboardHeader() {
	return (
		<header className="border-b border-slate-800 px-6 py-4">
			<div className="flex items-center justify-end ">
				<DashboardActionButtons />
			</div>
		</header>
	);
}
