"use client";

import { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";

export default function Providers({ children }: { children: ReactNode }) {
	if (!process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY) {
		throw new Error("NEXT_STRIPE_TEST_PUBLISHABLE_KEY is missing. Please set the environment variable.");
	}

	return (
		<CartProvider
			cartMode="checkout-session"
			stripe={process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY}
			currency="EUR"
			shouldPersist={true}>
			{children}
		</CartProvider>
	);
}
