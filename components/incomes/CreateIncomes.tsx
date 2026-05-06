'use client';

import AddButton from '@/components/ui/AddActionButton';
import { useState } from 'react';
import IncomesForm from './CreateIncomesForm';
import { SelectOption } from '../ui/FormSelect';

type CreateIncomeProps = {
	projects: SelectOption[];
	categories: SelectOption[];
};

export default function CreateIncomes({
	projects,
	categories,
}: CreateIncomeProps) {
	const [openIncomesForm, setOpenIncomesForm] = useState(false);

	return (
		<div className="py-4 px-2">
			<div className="flex justify-between gap-4">
				<h1 className="text-3xl font-bold">Pajamos</h1>

				<AddButton onClick={() => setOpenIncomesForm(true)}>
					+ Pridėti pajamų įrašą
				</AddButton>
			</div>

			<p className="text-slate-400">
				Čia galite registruoti savo pajamas
			</p>

			{openIncomesForm && (
				<IncomesForm
					onClose={() => setOpenIncomesForm(false)}
					projects={projects}
					categories={categories}
				/>
			)}
		</div>
	);
}
