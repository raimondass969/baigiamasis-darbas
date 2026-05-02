import DashboardShell from '@/components/dashboard/DashboardView';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <DashboardShell>{children} </DashboardShell>;
}
