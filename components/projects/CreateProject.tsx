'use client';
import { useState } from 'react';
import ProjectForm from './CreateProjectForm';

export default function CreateProject() {
	const [openForm, setOpenForm] = useState(false);

	return (
		<div className="py-4 px-2">
			<div className="flex items-center justify-between">
				<p className="text-xl dark:text-slate-400 ">
					Projektų puslapis
				</p>

				<button
					onClick={() => setOpenForm(true)}
					className="rounded-lg bg-blue-500 hover:bg-blue-800 py-2 px-4"
				>
					+ Naujas Projektas
				</button>
			</div>

			<section className="flex flex-col gap-4 ">
				<h1 className="text-sm">
					Tvarkykite projektus ir stebekite finansinius rezultatus
				</h1>
			</section>

			{openForm && <ProjectForm onClose={() => setOpenForm(false)} />}
		</div>
	);
}
