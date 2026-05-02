import Description from '@/components/landing/MainDescription';
import AuthCardChanger from '@/components/auth/AuthCardsChanger';

export default function Page() {
	return (
		<main className="flex min-h-screen w-full items-center justify-center ">
			<div className="mx-auto grid w-full max-w-350 grid-cols-1 items-center gap-16 px-8 py-6 lg:grid-cols-2">
				<Description />
				<AuthCardChanger />
			</div>
		</main>
	);
}
