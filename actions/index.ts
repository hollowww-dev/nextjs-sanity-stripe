"use server"

import stripe from "@/lib/stripe";
import { type CartDetails } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities";
import { parseCartItem } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERYResult } from "@/sanity.types";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";

export async function createCheckoutSession(cartDetails: CartDetails): Promise<{ sessionId: string }> {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");
      }
	try {
		const products: PRODUCTS_QUERYResult = await client.fetch(PRODUCTS_QUERY);
		const line_items = validateCartItems(
			products.map(item => parseCartItem(item)),
			cartDetails
		);
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/return/{CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
			line_items,
		});
		return { sessionId: session.id };
	} catch (error) {
		console.error(error);
        if (error instanceof Error) {
            throw new Error(`Failed to create checkout session: ${error.message}`);
          } else {
            throw new Error("An unknown error occurred while creating the checkout session");
          }
	}
}