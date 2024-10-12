"use client";

import Link from "next/link";
import { useEffect } from "react";
import type Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

const Message = ({ session }: { session: Stripe.Checkout.Session }) => {
	const { cartCount, clearCart } = useShoppingCart();

	useEffect(() => {
		if (cartCount && session?.payment_status === "paid") {
			clearCart();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cartCount, session]);

	return (
		<>
			<p>Thank you for your purchase!</p>
			<p>
				Confirmation has been sent to <strong>{session.customer_details?.email}</strong>
			</p>
			<Link href="/" className="underline">
				Continue shopping
			</Link>
		</>
	);
};

export default Message;
