'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
	return (
		<button
			onClick={() => signOut({ callbackUrl: '/' })}
			className="rounded-xl bg-red px-4 py-2 text-white"
		>
			Atsijungti
		</button>
	);
}
