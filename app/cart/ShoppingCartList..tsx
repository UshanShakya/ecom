'use client';

import { useState } from "react";
import {Product} from "@/app/product-data";
import Link from "next/link";
import Image from "next/image";


export default function ShoppingCartList({ initialCartProducts }: { initialCartProducts: Product[] }) {
   const [cartProducts, setCartProducts] = useState<Product[]>(initialCartProducts);

    function removeFromCart(productId: string) {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/1/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({productId}),
    })
    .then(response => response.json())
    .then(data => {
      const updatedCartProducts = data;
      setCartProducts(updatedCartProducts);
      alert('Product removed to cart!');
    })
    .catch(error => {
      console.error('Error removing product to cart:', error);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-black ">Cart Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {cartProducts.map(product => (
          <Link key={product.id} href={"/products/"+ product.id} className="border rounded-lg p-4">
            <Image src={"/" + product.imageUrl} alt={product.name} className="h-48 object-cover mb-4" width={300} height={300} />
            <h2 className="text-xl text-black font-semibold mb-2">{product.name}</h2>
            <p className="text-lg text-black font-bold">${product.price.toFixed(2)}</p>
            <button
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              onClick={(e) => {
                e.preventDefault();
                removeFromCart(product.id);
              }}
            > Remove From Cart</button>
          </Link>

        ))}
      </div>
    </div>
  );
}