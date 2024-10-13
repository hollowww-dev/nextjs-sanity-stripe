import stripe from "@/lib/stripe";
import Cart from "@/components/Cart";
import Message from "@/components/Message";

export default async function Page({ params }: { params: { sessionId: string } }) {
	const {payment_status} = await stripe.checkout.sessions.retrieve(params.sessionId)

	return (
		<main className="container mx-auto flex flex-col gap-2">
			<Cart />
			<Message status={payment_status} />
		</main>
	);
}
