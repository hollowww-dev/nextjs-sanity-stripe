import { PRODUCTS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartEntry, Product } from "use-shopping-cart/core";
import type { Stripe } from "stripe";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseCartItem(product: PRODUCTS_QUERYResult[number]): Product {
	return {
		id: product.id,
		name: product.name,
		description: product.description || undefined,
		image: product.image ? urlFor(product.image).width(400).height(400).url() : undefined,
		currency: product.price.currency,
		price: product.price.value,
	};
}

export function parseLineItem(product: CartEntry): Stripe.Checkout.SessionCreateParams.LineItem {
	return {
		price_data: {
			unit_amount: product.price,
			currency: product.currency,
			product_data: {
				name: product.name,
				description: product.description,
				images: product.image ? [product.image] : undefined,
			},
		},
		quantity: product.quantity,
	};
}
