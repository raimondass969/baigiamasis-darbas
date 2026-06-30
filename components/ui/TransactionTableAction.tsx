'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type TransactionTableActionProps = {
	transactionId: number;
	label: 'pajamų' | 'išlaidų';
};

export default function TransactionTableAction({
	transactionId,
	label,
}: TransactionTableActionProps) {
	const router = useRouter();
	const [error, setError] = useState('');

	async function handleDelete() {
		const confirmed = confirm(
			`Ar tikrai norite pašalinti šį ${label} įrašą?`,
		);

		if (!confirmed) {
			return;
		}

		const respone = await fetch(`/api/transactions/${transactionId}`, {
			method: 'DELETE',
		});

		if (!respone.ok) {
			setError(`Nepavyko pašalinti ${label} įrašo`);
			return;
		}
		router.refresh();
	}

	return (
		<div className="flex gap-2">
			<button
				type="button"
				className="rounded-lg bg-slate-700 px-3 py-1 text-sm hover:bg-slate-600"
			>
				Redaguoti
			</button>

			<button
				type="button"
				onClick={handleDelete}
				className="rounded-lg bg-slate-700 px-3 py-1 text-sm hover:bg-slate-600"
			>
				Šalinti
			</button>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
}
