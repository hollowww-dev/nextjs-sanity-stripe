"use client";

import { useShoppingCart } from "use-shopping-cart";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CartEntry } from "use-shopping-cart/core";
import Image from "next/image";
import productNoImage from "@/assets/productNoImage.jpg";
import { useState } from "react";
import { createCheckoutSession } from "@/actions";

const CartItem = ({ entry }: { entry: CartEntry }) => {
	return (
		<Card>
		<CardContent className="flex items-center px-3 py-0">
			<Image
				src={entry.image || productNoImage.src}
				alt={entry.name}
				width={50}
				height={50}
				className="rounded-full p-1 border"
			/>
			<CardHeader>
				<CardTitle>
					{entry.name} {entry.quantity > 1 && `(${entry.quantity})`}
				</CardTitle>
				<CardDescription>{entry.formattedValue}</CardDescription>
			</CardHeader>
		</CardContent>
	</Card>
	);
};

const Cart = () => {
	const [checkoutLoading, setCheckoutLoading] = useState(false);
	const { cartCount, formattedTotalPrice, shouldDisplayCart, handleCartClick, cartDetails, redirectToCheckout } = useShoppingCart();
	const handleClick = async () => {
		try {
			setCheckoutLoading(true);
			if (!cartDetails) {
				throw new Error("No cart details");
			}
			const { sessionId } = await createCheckoutSession(cartDetails);
			await redirectToCheckout(sessionId)
		} catch (error) {
			setCheckoutLoading(false);
			console.log(error);
		}
	};
	return (
		<Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
			<SheetTrigger asChild>
				<Button variant={"outline"} type="button" className="self-end">
					Cart ({cartCount})
				</Button>
			</SheetTrigger>
			<SheetContent className="flex flex-col gap-2">
				<SheetHeader>
					<SheetTitle>Cart ({cartCount})</SheetTitle>
				</SheetHeader>
				{cartDetails &&
					Object.values(cartDetails).map((entry: CartEntry) => <CartItem entry={entry} key={entry.id} />)}
				<SheetFooter className="flex-row mt-auto justify-between sm:justify-between items-center">
					<p>Total: {formattedTotalPrice}</p>
					<Button size="lg" onClick={handleClick} disabled={checkoutLoading || !cartCount}>
						{checkoutLoading ? "Redirecting..." : "Checkout"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
