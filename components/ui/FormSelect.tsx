export type SelectOption = {
	id: string;
	name: string;
};

type FormSelectProps = {
	id: string;
	name: string;
	label: string;
	value: string;
	required?: boolean;
	options: SelectOption[];
	placeholder: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function FormSelect({
	id,
	name,
	label,
	value,
	required = true,
	onChange,
	options,
	placeholder,
}: FormSelectProps) {
	return (
		<div className="flex flex-col gap-4 w-full">
			<label htmlFor={id} className="text-sm text-slate-400 text-left">
				{label}
			</label>
			<select
				id={id}
				name={name}
				value={value}
				required={required}
				onChange={onChange}
				className="px-4 py-3 rounded-xl bg-slate-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ease-out dark:bg-slate-800/40 dark:text-white dark:border-blue-500 w-full"
			>
				<option value="">{placeholder}</option>

				{options.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
}
