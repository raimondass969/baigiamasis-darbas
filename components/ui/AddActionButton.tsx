type AddButtonProps = {
	onClick: () => void;
	children: React.ReactNode;
};

export default function AddButton({ onClick, children }: AddButtonProps) {
	return (
		<button
			type="button"
			className="rounded-lg bg-blue-500 hover:bg-blue-800 py-2 px-4"
			onClick={onClick}
		>
			{children}
		</button>
	);
}
