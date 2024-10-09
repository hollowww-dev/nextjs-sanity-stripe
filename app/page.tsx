import { PRODUCTS_QUERYResult } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import Product from "@/components/Product";
import Cart from "@/components/Cart";

export default async function Home() {
	const products: PRODUCTS_QUERYResult = await client.fetch(PRODUCTS_QUERY);

	return (
		<main className="container mx-auto flex flex-col gap-2">
			<Cart />
			<div className="flex gap-2">
				{products.map(product => (
					<Product product={product} key={product.id} />
				))}
			</div>
		</main>
	);
}
