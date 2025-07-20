import ProductsList from "../ProductsList";
import NotFoundPage from "@/app/not-found";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`);
  const products = await response.json();

  const cartResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/1/cart`,
    {cache: 'no-cache'}
  );
  const cartProducts = await cartResponse.json();

  if (!products || products.length === 0) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-white">Products Page</h1>
      <ProductsList products={products} initialCartProducts= {cartProducts} />
    </div>
  );
}