import DashboardKpiCard from '@/components/dashboard/DashboardKpiCard';
import { prisma } from '@/lib/prisma';
import { checkUserSession } from '@/lib/auth/checkUserSession';

export default async function Dashboard() {
	const userId = await checkUserSession();

	const prismaCount = await prisma.project.count({
		where: {
			userId: Number(userId),
		},
	});

	return (
		<div className="space-y-8">
			<section>
				<p className="text-lg font-bold ">Apžvalga</p>
				<h2 className="text-xl font-semibold text-slate-500">
					Bendra finansinė situacija
				</h2>
			</section>

			<section className="grid gap-4 md:grid-cols-4">
				<DashboardKpiCard
					label="Pajamos šį mėnesį"
					value="0"
					description="16% daugiau nei praėjusį mėnesį"
				/>

				<DashboardKpiCard
					label="Išlaidos šį mėnesį"
					value="0"
					description="16% daugiau nei praėjusį mėnesį"
				/>

				<DashboardKpiCard
					label="Grynasis rezultatas"
					value="0"
					description="16% daugiau nei praėjusį mėnesį"
				/>

				<DashboardKpiCard
					label="Aktyvus projektai"
					value={prismaCount}
					description="??"
				/>
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
