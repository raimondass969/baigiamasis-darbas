type Project = {
	id: number;
	name: string;
	description: string | null;
	createdAt: Date;
};

type ProjectTableProps = {
	projects: Project[];
};

export default function ProjectTable({ projects }: ProjectTableProps) {
	return (
		<div className="w-full bg-slate-800/40 rounded-2xl">
			<table className="w-full rounded-2xl ">
				<thead>
					<tr className="text-left">
						<th className="p-3 border-b border-slate-500">
							Projekto Pavadinimas
						</th>
						<th className="p-3 border-b border-slate-500">
							Aprašymas
						</th>
						<th className="p-3 border-b border-slate-500">
							Sukurta
						</th>
						<th className="p-3 border-b border-slate-500">
							Pajamos
						</th>
						<th className="p-3 border-b border-slate-500">
							Islaidos
						</th>
						<th className="p-3 border-slate-500 border-b">
							Balansas
						</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((project) => (
						<tr key={project.id}>
							<td className="p-3 border-b border-slate-500">
								{project.name}
							</td>
							<td className="p-3 border-b border-slate-500">
								{project.description ?? 'Nėra aprašymo'}
							</td>
							<td className="p-3 border-b border-slate-500">
								{project.createdAt.toLocaleDateString()}
							</td>
							<td className="p-3 border-b border-slate-500">0</td>
							<td className="p-3 border-b border-slate-500">0</td>
							<td className="p-3 border-b border-slate-500">0</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
