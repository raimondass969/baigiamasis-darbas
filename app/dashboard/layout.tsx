import DashboardShell from '@/components/layout/DashboardView';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <DashboardShell>{children} </DashboardShell>;
}
