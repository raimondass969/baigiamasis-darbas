import { useState } from 'react';
import FormSelect, { SelectOption } from '../ui/FormSelect';
import FormInput from '../ui/FormInput';

type ExpenseFormProps = {
	onClose: () => void;
	projectSelect: SelectOption[];
	expenseCategories: SelectOption[];
};

export default function ExpenseForm({
	onClose,
	projectSelect,
	expenseCategories,
}: ExpenseFormProps) {
	const [amount, setAmount] = useState('');
	const [expenseProjectId, setProjectId] = useState('');
	const [expenseCategoryId, setExpenseCategoryId] = useState('');
	const [expenseDate, setExpenseDate] = useState('');
	const [expenseDescription, setExpenseDescription] = useState('');
	const [expenseFormError, setExpenseFormError] = useState('');
	const [expenseFormSuccess, setExpenseFormSuccess] = useState('');

	async function submitExpenseForm(
		event: React.SubmitEvent<HTMLFormElement>,
	) {
		event.preventDefault();

		setExpenseFormError('');

		if (!expenseProjectId || !expenseCategoryId || !amount) {
			setExpenseFormError('Laukai su * yra privalomi!');
			return;
		}

		const response = await fetch('/api/incomes/createIncome', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				projectId: expenseProjectId,
				categoryId: expenseCategoryId,
				description: expenseDescription,
				date: expenseDate,
				amount,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			setExpenseFormError(
				data.message || 'Nepavyko sukurti išlaidų įrašo',
			);
			return;
		}

		setExpenseFormSuccess('Išlaidos sėkmingai sukurtos!');
		setTimeout(() => {
			onClose();
		}, 2000);
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 r">
			<div className="dark:bg-slate-900 mb-32 rounded-xl border border-slate-700 bg-white p-6 shadow-lg w-full max-w-md ">
				<form onSubmit={submitExpenseForm}>
					<div className="flex border-b border-slate-700/40 pb-4 mb-4 justify-between">
						<h1 className="text-xl font-bold ">Naujos išlaidos</h1>

						<button
							className="dark:text-slate-400 rounded-xl dark:hover:bg-slate-700/50 p-2 "
							type="button"
							onClick={onClose}
						>
							X
						</button>
					</div>

					<div className="border-b border-slate-700/40 pb-4 mb-4">
						<FormSelect
							id="expenseProjectId"
							value={expenseProjectId}
							name="expenseProjectId"
							options={projectSelect}
							label="Projektas"
							placeholder="Pasirinkite projektą"
							onChange={(e) => setProjectId(e.target.value)}
						/>
						<FormInput
							id="expenseAmount"
							name="expensesAmount"
							label="Suma"
							type="number"
							placeholder="Įveskite sumą"
							value={amount}
							step={0.01}
							onChange={(e) => setAmount(e.target.value)}
						/>

						<FormSelect
							id="expenseCategoryId"
							name="expenseCategoryId"
							label="kategorija"
							placeholder="Pasirinkite išlaidų kategoriją"
							value={expenseCategoryId}
							options={expenseCategories}
							onChange={(e) =>
								setExpenseCategoryId(e.target.value)
							}
						/>

						<FormInput
							id="expenseDate"
							name="expenseDate"
							value={expenseDate}
							label="Data"
							placeholder="Pasirinkite datą"
							type="date"
							onChange={(e) => setExpenseDate(e.target.value)}
						/>

						<FormInput
							id="ExpenseDescription"
							name="ExpenseDescription"
							value={expenseDescription}
							label="Aprašymas"
							placeholder="Įveskite aprašymą (nebūtina)"
							type="text"
							onChange={(e) =>
								setExpenseDescription(e.target.value)
							}
							required={false}
						/>

						<button
							type="submit"
							className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors duration-150"
						>
							Išsaugoti
						</button>
					</div>

					{expenseFormError && (
						<p className="mt-4 rounded-xl bg-red-500/10 border border-red-500 px-4 py-2 text-sm text-red-300">
							{expenseFormError}
						</p>
					)}

					{expenseFormSuccess && (
						<p className="mt-4 rounded-xl bg-green-500/10 border border-green-500 px-4 py-2 text-sm text-green-300">
							{expenseFormSuccess}
						</p>
					)}
				</form>
			</div>
		</div>
	);
}
