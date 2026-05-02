export default function ProjectsPage() {
	return (
		<div className="py-4 px-2">
			<div className="flex items justify-between">
				<p className="text-xl dark:text-slate-400 ">
					Projektu pūslapis
				</p>
				<button className="rounded-xl py-2 px-4 dark:bg-blue-700">
					Prideti nauja projekta
				</button>
			</div>
			<section className="flex flex-col gap-4  border border-blue-500">
				<h1 className="text-sm">
					Tvarkykite projektus ir stebekite finansinius rezultatus
				</h1>
			</section>
		</div>
	);
}
