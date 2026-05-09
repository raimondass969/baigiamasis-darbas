import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { redirect } from 'next/navigation';

// Tikrinam prisijungusi vartotoja -> grazinam jo id
export async function checkUserSession() {
	const session = await getServerSession(authOptions);

	if (!session?.user.id) {
		redirect('/');
	}
	return Number(session.user.id);
}
