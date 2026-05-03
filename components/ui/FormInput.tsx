type FormInputProps = {
	id: string;
	name: string;
	label: string;
	type?: string;
	placeholder?: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput({
	id,
	name,
	label,
	type = 'text',
	placeholder,
	value,
	onChange,
}: FormInputProps) {
	return (
		<div className="flex flex-col gap-4 w-full">
			<label htmlFor={id} className="text-sm text-slate-400">
				{label}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="px-4 py-2 rounded-2xl bg-slate-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ease-out dark:bg-slate-800/40 dark:text-white dark:border-blue-500"
			/>
		</div>
	);
}
