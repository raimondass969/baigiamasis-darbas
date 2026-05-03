'use client';
import HeaderActionButtons from './HeaderActionButtons';
import Image from 'next/image';

export default function Header() {
	return (
		<header className="border-b border-slate-800 px-6 py-4">
			<div className="flex items-center justify-end">
				{/*
				<Image
					src="/financial-system-finance.svg"
					alt="inancial-system"
					width={60}
					height={40}
				/>
				*/}
				<HeaderActionButtons />
			</div>
		</header>
	);
}
