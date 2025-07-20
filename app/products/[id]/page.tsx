import NotFoundPage from "@/app/not-found";
import Image from "next/image";
export const dynamic = "force-dynamic";

export default async function ProductsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${params.id}`
  );
  const product = await response.json();
  if (!product) {
    return <NotFoundPage />;
  }
  return (
    <div className="fixed inset-0 min-h-screen min-w-full bg-gradient-to-br from-indigo-100 to-white py-10">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0 w-full md:w-1/2">
            <Image
              src={"/" + product.imageUrl}
              alt={product.name}
              className="rounded-2xl shadow-lg object-cover w-full h-80"
              width={500}
              height={320}
              priority
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-indigo-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <button className="w-full py-3 px-6 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition mb-6">
              Add to Cart
            </button>

            {/* Accordion */}
            <div className="space-y-3">
              <details className="group border border-gray-200 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer px-4 py-3 font-medium text-gray-800 group-open:text-indigo-600 transition">
                  Product Features
                  <span className="ml-2 transition group-open:rotate-180">
                    &#9660;
                  </span>
                </summary>
                <div className="px-4 pb-4 text-gray-600">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>High quality materials</li>
                    <li>Modern, sleek design</li>
                    <li>Eco-friendly packaging</li>
                  </ul>
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer px-4 py-3 font-medium text-gray-800 group-open:text-indigo-600 transition">
                  Shipping & Returns
                  <span className="ml-2 transition group-open:rotate-180">
                    &#9660;
                  </span>
                </summary>
                <div className="px-4 pb-4 text-gray-600">
                  <p>
                    Free shipping on orders over $50. Hassle-free returns within
                    30 days of purchase.
                  </p>
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer px-4 py-3 font-medium text-gray-800 group-open:text-indigo-600 transition">
                  FAQs
                  <span className="ml-2 transition group-open:rotate-180">
                    &#9660;
                  </span>
                </summary>
                <div className="px-4 pb-4 text-gray-600">
                  <p>
                    Have questions? Contact our support team for more
                    information about this product.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
