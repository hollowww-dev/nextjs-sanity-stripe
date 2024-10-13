"use client";

import Link from "next/link";
import { useEffect } from "react";
import type Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

const Message = ({ status }: { status: Stripe.Checkout.Session.PaymentStatus }) => {
	const { cartCount, clearCart } = useShoppingCart();

	useEffect(() => {
		if (cartCount && status === "paid") {
			clearCart();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cartCount, status]);

	return (
		<section className="p-2 text-center">
			{status === "paid" ? (
				<>
					<p>Thank you for supporting us!</p>
					<p>Confirmation has been sent to your email.</p>
				</>
			) : <p>Something went wrong. Please check your payment details and try again.</p>}
			<Link href="/" className="underline">
				Continue shopping
			</Link>
		</section>
	);
};

export default Message;
