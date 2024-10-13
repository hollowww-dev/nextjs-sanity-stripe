import { PRODUCTS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Product } from "use-shopping-cart/core";

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