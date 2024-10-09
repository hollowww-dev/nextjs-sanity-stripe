"use client";

import { urlFor } from "@/sanity/lib/image";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { PRODUCTS_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import productNoImage from "@/assets/productNoImage.jpg";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { Button } from "./ui/button";
import { parseCartItem } from "@/lib/utils";

const Product = ({ product }: { product: PRODUCTS_QUERYResult[number] }) => {
	const { addItem } = useShoppingCart();

	return (
		<Card key={product.id}>
			<CardHeader>
				<Image
					src={product.image ? urlFor(product.image).width(200).height(200).url() : productNoImage.src}
					alt={product.name}
					width={200}
					height={200}
				/>
			</CardHeader>
			<CardContent>
				<CardTitle>{product.name}</CardTitle>
				<CardDescription>{product.description}</CardDescription>
			</CardContent>
			<CardFooter className="justify-between">
				{formatCurrencyString(product.price)}
				<Button onClick={() => addItem(parseCartItem(product))}>Add to cart</Button>
			</CardFooter>
		</Card>
	);
};

export default Product;
