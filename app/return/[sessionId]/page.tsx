import Cart from "@/components/Cart";
import Message from "../../../components/Message";

export default async function Page({ params }: { params: { sessionId: string } }) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout_sessions/${params.sessionId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const { session, error } = await response.json();

	return (
		<main className="container mx-auto flex flex-col gap-2">
			<Cart />
			<section className="p-2 text-center">{error ?? <Message session={session} />}</section>
		</main>
	);
}
