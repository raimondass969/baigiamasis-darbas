'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type SelectOption = {
	id: string;
	name: string;
};

type FilterSelectProps = {
	id: string;
	name: string;
	value: string;
	options: SelectOption[];
	placeholder: string;
	onChange: (selectId: string) => void;
};

export default function FilterSelect({
	id,
	name,
	value,
	onChange,
	options,
	placeholder,
}: FilterSelectProps) {
	const [open, setOpen] = useState(false);

	const selectedOption = options.find((option) => option.id === value);

	function handleSelect(optionId: string) {
		onChange(optionId);
		setOpen(false);
	}
	return (
		<div className="w-fit relative  ">
			<button
				className="flex items-center justify-between px-4 py-2 gap-2 rounded-xl border dark:border-slate-700 dark:bg-slate-800 hover:bg-slate-800   "
				onClick={() => setOpen((current) => !current)}
			>
				<span>{selectedOption?.name ?? placeholder}</span>
				<ChevronDown
					className={`transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
					size={16}
				/>
			</button>

			{open && (
				<div className="absolute left-0 top-full mt-2 rounded-xl dark:bg-slate-800 border border-slate-700 shadow-lg overflow-hidden z-50 ">
					<button
						className="w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-slate-700  "
						type="button"
						onClick={() => handleSelect('')}
					>
						{placeholder}
					</button>
					{options.map((option) => (
						<button
							className={`w-full text-left text-sm px-3 py-2 hover:dark:bg-slate-700 ${option.id === value ? 'dark:bg-slate-700/60' : ''}`}
							type="button"
							key={option.id}
							onClick={() => handleSelect(option.id)}
						>
							{option.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
