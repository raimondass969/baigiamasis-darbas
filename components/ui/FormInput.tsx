type FormInputProps = {
	id: string;
	name: string;
	label: string;
	type?: string;
	placeholder?: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	min?: number;
	step?: string | number;
};

export default function FormInput({
	id,
	name,
	label,
	type = 'text',
	placeholder,
	value,
	onChange,
	required = false,
	min,
	step,
}: FormInputProps) {
	return (
		<div className="flex flex-col gap-2 w-full">
			<label
				htmlFor={id}
				className="text-sm text-slate-700 dark:text-slate-200"
			>
				{label}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				min={min}
				step={step}
				className="w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-700/40 dark:text-slate-100 dark:placeholder:text-slate-500"
			/>
		</div>
	);
}
