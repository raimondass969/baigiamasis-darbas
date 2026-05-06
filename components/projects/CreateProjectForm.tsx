import { useState } from 'react';
import FormInput from '../ui/FormInput';
import FormTextArea from '../ui/ProjectDescriptionTextArea';

type CreateProjectFormProps = {
	onClose: () => void;
};

export default function CreateProjectForm({ onClose }: CreateProjectFormProps) {
	const [projectName, setProjectName] = useState('');
	const [projectDescription, setProjectDescription] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		setError('');
		setSuccess('');

		const response = await fetch('/api/projects/projectForm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				projectName,
				projectDescription,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			setError(data.message || 'Nepavyko sukurti projekto');
			return;
		}

		setSuccess('Projektas sėkmingai sukurtas!');
		setProjectName('');
		setProjectDescription('');
		setTimeout(() => {
			onClose();
		}, 2000);
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90	">
			<div className="dark:bg-slate-900 mb-32 rounded-xl border border-slate-700 bg-white p-6 shadow-lg w-full max-w-md ">
				<form onSubmit={handleSubmit}>
					<div className="flex border-b border-slate-700/40 pb-4 mb-4 justify-between">
						<h1 className="text-xl font-bold ">Naujas projektas</h1>

						<button
							type="button"
							onClick={onClose}
							className="dark:text-slate-400 rounded-xl dark:hover:bg-slate-700/50 p-2 "
						>
							X
						</button>
					</div>

					<div className="border-b border-slate-700/40 pb-4 mb-4 ">
						<FormInput
							id="projectName"
							name="projectName"
							label="Projekto pavadinimas"
							type="text"
							value={projectName}
							onChange={(e) =>
								setProjectName(e.currentTarget.value)
							}
							placeholder="Projekto pavadinimas"
						/>

						<FormTextArea
							id="projectDescription"
							name="projectDescription"
							label="Aprašymas"
							value={projectDescription}
							onChange={(e) =>
								setProjectDescription(e.currentTarget.value)
							}
							placeholder="Trumpas projekto aprašymas (nebūtina)"
						/>
					</div>

					<div className="flex gap-3 mt-4 justify-end">
						<button
							type="button"
							onClick={onClose}
							className="rounded-xs bg-gray-500 hover:bg-gray-700  text-white justify-center text-center p-2"
						>
							Atšaukti
						</button>

						<button
							type="submit"
							className="rounded-xs bg-blue-500 hover:bg-blue-800 text-white justify-center text-center p-2"
						>
							Sukurti projektą
						</button>
					</div>
					{error && (
						<p className="mt-4 rounded-xl bg-red-500/10 border border-red-500 px-4 py-2 text-sm text-red-300">
							{error}
						</p>
					)}
					{success && (
						<p className="mt-4 rounded-xl bg-green-500/10 border border-green-500 px-4 py-2 text-sm text-green-300">
							{success}
						</p>
					)}
				</form>
			</div>
		</div>
	);
}
