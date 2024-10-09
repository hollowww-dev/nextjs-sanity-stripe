import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { CartDetails } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities";
import { parseCartItem, parseLineItem } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERYResult } from "@/sanity.types";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
	const { cartDetails }: { cartDetails: CartDetails } = await req.json();
	const line_items = Object.values(cartDetails).map(item => parseLineItem(item));
	try {
		const products: PRODUCTS_QUERYResult = await client.fetch(PRODUCTS_QUERY);
		validateCartItems(
			products.map(item => parseCartItem(item)),
			cartDetails
		);
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			success_url: `${headers().get("origin")}/success`,
			cancel_url: `${headers().get("origin")}`,
			line_items,
		});
		return NextResponse.json({ sessionId: session.id }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: "Error creating checkout session" }, { status: 400 });
	}
}
