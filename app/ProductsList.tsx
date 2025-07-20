'use client';
import Image from 'next/image';
import Link from 'next/link';
import {Product} from './product-data';
import { useState } from 'react';

export default function ProductsList({products, initialCartProducts}: {products: Product[], initialCartProducts: Product[]}) {
  const [cartProducts, setCartProducts] = useState<Product[]>(initialCartProducts);
  function addToCart(productId: string) {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/1/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({productId}),
    })
    .then(response => response.json())
    .then(data => {
      const updatedCartProducts = data;
      setCartProducts(updatedCartProducts);
      alert('Product added to cart!');
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
    });
  }

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


  function productIsInCart(productId: string) {
    return cartProducts.some(product => product.id === productId);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map(product => (
      <div
        key={product.id}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border flex flex-col"
      >
        <Link href={"/products/" + product.id} className="flex-1 flex flex-col">
        <div className="relative w-full h-48 bg-gray-100 rounded-t-xl overflow-hidden">
          <Image
          src={"/" + product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }}
          className="rounded-t-xl"
          sizes="(max-width: 768px) 100vw, 300px"
          priority
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h2>
          <p className="text-gray-700 mb-2 line-clamp-2">{product.description}</p>
          <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
          </div>
        </div>
        </Link>
        {productIsInCart(product.id) ? (
          <button
            className="m-4 mt-0 bg-red-700 text-white-700 font-semibold py-2 px-4 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              removeFromCart(product.id);
            }}
          >
            Remove From Cart
          </button>
        ) : <button
        className="m-4 mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        onClick={(e) => {
          e.preventDefault();
          addToCart(product.id);
        }}
        >
        Add to Cart
        </button>}
        
      </div>
      ))}
    </div>
  )
}