'use client';

import { useState } from 'react';
import AddButton from '../ui/AddActionButton';
import ExpenseForm from './CreateExpensesForm';
import { SelectOption } from '../ui/FormSelect';

type CreateExpenseProps = {
	projectSelect: SelectOption[];
	expenseCategories: SelectOption[];
};

export default function CreateExpenses({
	projectSelect,
	expenseCategories,
}: CreateExpenseProps) {
	const [openExpenseForm, setOpenExpenseForm] = useState(false);
	return (
		<div className="py-4 px-2 space-y-4">
			<div className="flex flex-wrap justify-between gap-4">
				<h1 className="text-3xl">Išlaidos</h1>

				<AddButton onClick={() => setOpenExpenseForm(true)}>
					+ Pridėti išlaidų įrašą
				</AddButton>
			</div>
			<p className="text-slate-400">
				Čia galite registruoti savo išlaidas
			</p>

			{openExpenseForm && (
				<ExpenseForm
					projectSelect={projectSelect}
					expenseCategories={expenseCategories}
					onClose={() => setOpenExpenseForm(false)}
				/>
			)}
		</div>
	);
}
