import Link from 'next/link';
export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
      <Link href="/" className="text-2xl font-extrabold tracking-tight text-white hover:text-yellow-300 transition-colors duration-200">
        E-Commerce
      </Link>
      <div className="flex space-x-6">
        <Link href="/products" className="text-white hover:text-yellow-300 font-medium transition-colors duration-200">
        Products
        </Link>
        <Link href="/cart" className="text-white hover:text-yellow-300 font-medium transition-colors duration-200 relative">
        Cart
        {/* Example badge for cart items */}
        <span className="absolute -top-2 -right-3 bg-yellow-400 text-indigo-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-md">2</span>
        </Link>
        <Link href="/checkout" className="text-white hover:text-yellow-300 font-medium transition-colors duration-200">
        Checkout
        </Link>
      </div>
      </div>
    </nav>
    
  )
}