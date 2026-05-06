'use client';
import { useState } from 'react';
import CreateProjectForm from './CreateProjectForm';
import AddButton from '../ui/AddActionButton';

export default function CreateProject() {
	const [openForm, setOpenForm] = useState(false);

	return (
		<div className="py-4 px-2">
			<div className="flex items-center justify-between">
				<p className="text-xl dark:text-slate-400 ">
					Projektų puslapis
				</p>

				<AddButton onClick={() => setOpenForm(true)}>
					+ Naujas Projektas
				</AddButton>
			</div>

			<section className="flex flex-col gap-4 ">
				<h1 className="text-sm">
					Tvarkykite projektus ir stebekite finansinius rezultatus
				</h1>
			</section>

			{openForm && (
				<CreateProjectForm onClose={() => setOpenForm(false)} />
			)}
		</div>
	);
}
