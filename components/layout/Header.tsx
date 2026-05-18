import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import UserMenu from './UserMenu';

export default async function Header() {
	const session = await getServerSession(authOptions);
	const name = session?.user?.name ?? 'Vartotojas';

	const initials = name[0].toUpperCase();

	return (
		<header className="border-b border-slate-800 px-6 py-4">
			<div className="flex items-center justify-between">
				<div className="text-sm text-slate-400">Finansų sistema</div>
				<UserMenu name={name} initials={initials} />
			</div>
		</header>
	);
}
