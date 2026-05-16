import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

// Tikrinam prisijungusi sessijos vartotoja -> grazinam jo id
// naudojama api puslapiuose
export async function getCurrentUser() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		//Jei neprisijunges programa sustoja
		return null;
	}
	// grazinam prisijungusi useri
	return Number(session.user.id);
}
