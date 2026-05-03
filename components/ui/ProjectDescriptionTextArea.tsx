type FormTextAreaProps = {
	id: string;
	name: string;
	label: string;
	placeholder?: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function FormTextArea({
	id,
	name,
	label,
	placeholder,
	value,
	onChange,
}: FormTextAreaProps) {
	return (
		<div className="flex flex-col gap-4 w-full">
			<label htmlFor={id} className="text-sm text-slate-400">
				{label}
			</label>
			<textarea
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="resize-y max-h-48 min-h-24 dark:bg-slate-800/40 rounded-xl px-4 py-2"
			/>
		</div>
	);
}
