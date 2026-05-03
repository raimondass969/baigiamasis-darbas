import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect('/');
	}

	const prismaCount = await prisma.project.count({
		where: {
			userId: Number(session.user.id),
		},
	});

	return (
		<div className="space-y-8">
			<section>
				<p className="text-sm text-slate-400">Sveiki sugrįžę</p>
				<h1 className="text-3xl font-bold">
					{session.user.name ?? 'Vartotojau'}
				</h1>
			</section>

			<section className="grid gap-4 md:grid-cols-3">
				<div className="rounded-2xl border border-slate-800 dark:bg-slate-900/60 p-5">
					<p className="text-sm text-slate-400">Projektai</p>
					<p className="mt-2 text-2xl font-bold">{prismaCount}</p>
				</div>

				<div className="rounded-2xl border border-slate-800 dark:bg-slate-900/60 p-5">
					<p className="text-sm text-slate-400">Pajamos</p>
					<p className="mt-2 text-2xl font-bold">0 €</p>
				</div>

				<div className="rounded-2xl border border-slate-800 dark:bg-slate-900/60 p-5">
					<p className="text-sm text-slate-400">Išlaidos</p>
					<p className="mt-2 text-2xl font-bold">0 €</p>
				</div>
			</section>

			<section className="grid gap-4 lg:grid-cols-2">
				<div className="rounded-2xl border border-slate-800 dark:bg-slate-900/60 p-5">
					<h2 className="text-lg font-semibold">Greiti veiksmai</h2>
				</div>

				<div className="rounded-2xl border border-slate-800 dark:bg-slate-900/60 p-5">
					<h2 className="text-lg font-semibold">
						Paskutiniai įrašai
					</h2>
					<p className="mt-4 text-sm text-slate-400">
						Kol kas nėra įrašų.
					</p>
				</div>
			</section>
		</div>
	);
}
