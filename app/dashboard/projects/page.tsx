export default function ProjectsPage() {
	return (
		<div className="mx-auto max-w-7xl space-y-6">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm text-slate-400">Projektų valdymas</p>
					<h1 className="text-3xl font-bold">Projektai</h1>
				</div>

				<button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
					+ Naujas projektas
				</button>
			</div>

			<div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
				<table className="w-full text-left text-sm">
					<thead className="border-b border-slate-800 text-slate-400">
						<tr>
							<th className="px-5 py-3 font-medium">
								Pavadinimas
							</th>
							<th className="px-5 py-3 font-medium">Būsena</th>
							<th className="px-5 py-3 font-medium">Biudžetas</th>
							<th className="px-5 py-3 font-medium text-right">
								Veiksmai
							</th>
						</tr>
					</thead>

					<tbody>
						<tr className="border-b border-slate-800 last:border-0">
							<td className="px-5 py-4 font-medium">
								Svetainės kūrimas
							</td>
							<td className="px-5 py-4 text-green-400">
								Aktyvus
							</td>
							<td className="px-5 py-4">-</td>
							<td className="px-5 py-4 text-right">
								<button className="rounded-lg border border-slate-700 px-3 py-1 hover:bg-slate-800">
									Peržiūrėti
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
