'use client';
import HeaderActionButtons from './HeaderActionButtons';

export default function Header() {
	return (
		<header className="border-b border-slate-800 px-6 py-4">
			<div className="flex items-center justify-end ">
				<HeaderActionButtons />
			</div>
		</header>
	);
}
