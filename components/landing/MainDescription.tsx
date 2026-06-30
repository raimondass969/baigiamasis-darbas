'use client';
import {
	BarChart3,
	BriefcaseBusiness,
	ChartNoAxesCombined,
	ReceiptText,
} from 'lucide-react';
export default function Description() {
	return (
		//pgr sekcija
		<section className="flex max-w-md flex-col gap-6 -translate-y-6">
			<div className="flex flex-col gap-4">
				<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-blue-700  shadow-lg shadow-blue-500/30 bg-blue-600">
					<BarChart3 size={30} strokeWidth={2.5} />
				</div>

				<div className="space-y-3">
					<h1 className="font-bold text-4xl">
						Projektų finansų valdymo sistema
					</h1>

					<p className="text-slate-400">
						Valdykite projektus, registruokite pajamas ir išlaidas
						vienoje vietoje.
					</p>
				</div>

				{/* Projektu valdymo icona*/}
				<div className="flex items-center gap-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-blue-700  shadow-lg shadow-blue-500/30 bg-blue-600">
						<BriefcaseBusiness size={22} strokeWidth={2.5} />
					</div>

					<div>
						<h2 className="text-2xl font-semibold">
							Projektų valdymas
						</h2>

						<p className="text-slate-400">
							Kurkite ir stebekite savo projektus
						</p>
					</div>
				</div>

				{/*Pajamu ir islaidu icona*/}
				<div className="flex items-center gap-4">
					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/30 ">
						<ReceiptText size={22} strokeWidth={2.5} />
					</div>

					<div>
						<h3 className="text-2xl font-bold">
							Pajamos ir išlaidos
						</h3>

						<p className=" text-slate-400">
							Lengvai įveskite ir sekite finansus
						</p>
					</div>
				</div>
				{/* Ataskaitu icona */}
				<div className="flex items-center gap-4">
					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600  shadow-lg shadow-blue-500/30 ">
						<ChartNoAxesCombined size={22} strokeWidth={2.5} />
					</div>

					<div>
						<h4 className="text-2xl font-bold">
							Aiškios ataskaitos
						</h4>

						<p className="text-slate-400">
							Matykite grafikus ir suvestines
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
