import { useState } from 'react';
import FormSelect, { SelectOption } from '../ui/FormSelect';
import FormInput from '../ui/FormInput';

type IncomesFormProps = {
	onClose: () => void;
	projects: SelectOption[];
	categories: SelectOption[];
};

export default function IncomesForm({
	onClose,
	projects,
	categories,
}: IncomesFormProps) {
	const [projectId, setProjectId] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [amount, setAmount] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');

	async function submitForm(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		setError('');
		setSuccess('');

		if (!projectId || !categoryId || !amount) {
			setError('Laukai su * yra privalomi!');
			setSuccess('');
			return;
		}

		const response = await fetch('/api/incomes/createIncome', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				projectId,
				categoryId,
				amount,
				description,
				date,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			setError(data.message || 'Nepavyko sukurti pajamų įrašo');
			setSuccess('');
			return;
		}

		setSuccess('Pajamos sėkmingai sukurtos!');
		setProjectId('');
		setCategoryId('');
		setAmount('');
		setDescription('');
		setDate('');
		setTimeout(() => {
			onClose();
		}, 2000);
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90	">
			<div className="dark:bg-slate-900 mb-32 rounded-xl border border-slate-700 bg-white p-6 shadow-lg w-full max-w-md ">
				<form onSubmit={submitForm}>
					<div className="flex border-b border-slate-700/40 pb-4 mb-4 justify-between">
						<h1 className="text-xl font-bold ">Naujos pajamos</h1>

						<button
							type="button"
							className="dark:text-slate-400 rounded-xl dark:hover:bg-slate-700/50 p-2 "
							onClick={onClose}
						>
							X
						</button>
					</div>

					<div className="border-b border-slate-700/40 pb-4 mb-4 ">
						{/* Formos laukai */}
						<FormSelect
							id="projectId"
							name="projectId"
							label="Projektas"
							placeholder="Pasirinkite projektą"
							value={projectId}
							onChange={(e) => setProjectId(e.target.value)}
							options={projects}
						/>
						<FormInput
							id="amount"
							name="amount"
							label="Suma"
							type="number"
							placeholder="Įveskite sumą"
							value={amount}
							step={0.01}
							onChange={(e) => setAmount(e.target.value)}
						/>
						<FormSelect
							id="categoryId"
							name="categoryId"
							label="Kategorija"
							placeholder="Pasirinkite kategoriją"
							value={categoryId}
							onChange={(e) => setCategoryId(e.target.value)}
							options={categories}
						/>
						<FormInput
							id="date"
							name="date"
							label="Data"
							type="date"
							placeholder="Pasirinkite datą"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>

						<FormInput
							id="description"
							name="description"
							label="Aprašymas"
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Įveskite aprašymą (nebūtina)"
						/>

						<button
							type="submit"
							className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors duration-150"
						>
							Išsaugoti
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
