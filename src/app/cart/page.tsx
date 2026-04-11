"use client"


import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import FeaturedProducts from '../_components/FeaturedProducts/FeaturedProducts'
import { getLoggedUserCart , removeFromCart, updateCartQuantity } from '@/actions/cart.action'
import { FaTrash } from 'react-icons/fa6';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ProductDetails from '../productdetails/[id]/page';

//https://ecommerce.routemisr.com/api/v1/products
//https://ecommerce.routemisr.com/api/v2/cart


interface CartProduct {
  _id: string;
  product: {
    _id: string;
    imageCover: string;
    title: string;
    category: {
      name: string;
    };
  };
  price: number;
  count: number;
}

interface CartData {
  products: CartProduct[];
  totalCartPrice: number;
  totalAfterDiscount?: number;
}

export default function Cart() {
  const { data: session, status } = useSession(); // ✅
  const token = (session as any)?.accessToken ?? ""; // ✅

  const [cartData, setCartData] = useState<CartData | null>(null);

  async function getUserCart() {
    const res = await getLoggedUserCart(token); // ✅
    console.log(res);
    if (res.status === "success") {
      setCartData(res.data);
    }
  }

  useEffect(() => {
    if (status === "authenticated") { // ✅
      getUserCart();
    }
  }, [status]); // ✅

  async function handleRemove(productId: string) {
    const res = await removeFromCart(productId, token); // ✅
    if (res.status === "success") getUserCart();
  }

  async function handleQuantity(productId: string, count: number) {
    if (count < 1) return;
    const res = await updateCartQuantity(productId, count, token); // ✅
    if (res.status === "success") getUserCart();
  }

return (
  <>
    {cartData?.products && cartData.products.length > 0 ? (
      // سلة فيها منتجات
      <div className="bg-gray-50 min-h-[calc(100vh-120px)] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">

            <div className="flex-1 bg-white rounded-2xl shadow-sm">

              {/* Header */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <p className="text-gray-400 text-sm">
                  {cartData.products.length} items
                </p>
              </div>

              {/* Products */}
              {cartData.products.map((product) => (
                <div
                  key={product._id || product.product?._id}
                  className="p-6 border-b flex flex-col md:flex-row justify-between gap-4"
                >
                  {/* Left Side */}
                  <div className="flex gap-4">
                    <img 
  src={product.product.imageCover} 
  alt={product.product.title}
  className="w-20 h-20 object-cover rounded-xl"
/>
                    <div>
                      <h3 className="font-semibold">{product.product.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {product.product.category?.name}
                      </p>
                      <p className="text-green-600 font-bold">
                        {product.price} EGP
                      </p>
                    </div>
                  </div>

                  {/* Right Side */}
                 
<button onClick={() => handleQuantity(product.product._id, product.count - 1)}
  className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
  -
</button>


<button onClick={() => handleQuantity(product.product._id, product.count + 1)}
  className="w-7 h-7 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors">
  +
</button>


<FaTrash 
  onClick={() => handleRemove(product.product._id)}
  className="text-red-400 hover:text-red-600 cursor-pointer transition-colors" 
  size={18}
/>
                </div>
              ))}
            </div>

            {/* RIGHT - Order Summary */}
            <div className="w-full lg:w-80 sticky top-24 h-fit">
              <div className="bg-green-500 text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{cartData.totalCartPrice} EGP</span>
                  </div>

                  <div className="flex justify-between font-bold border-t pt-3">
                    <span>Total</span>
                    <span>
                      {cartData.totalAfterDiscount ?? cartData.totalCartPrice} EGP
                    </span>
                  </div>
                </div>

                <button className="w-full bg-white text-green-600 mt-5 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
  <div className="bg-gray-50 min-h-[calc(100vh-120px)] py-12">
    <div className="max-w-2xl mx-auto text-center px-6">

     <div className="mx-auto mb-8 w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-14 h-14 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Your cart is empty
      </h2>
      
      <p className="text-gray-500 text-lg mb-10">
        Looks like you haven't added anything to your cart yet.<br />
        Start exploring our products!
      </p>

      {/*  btn Start Shopping */}
      <button 
        onClick={() => window.location.href = '/'}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-10 py-4 rounded-2xl transition-all duration-200 flex items-center gap-3 mx-auto group mb-16"
      >
        Start Shopping 
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>

      {/* Popular Categories */}
      <div>
        <p className="text-sm tracking-widest text-gray-400 mb-4">
          Popular Categories
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
  {[
    { name: "Electronics" },
    { name: "Fashion" },
    { name: "Home" },
    { name: "Beauty" }
  ].map((category) => (
    <button
      key={category.name}
      onClick={() => window.location.href = `/categories`}
      className="px-3 py-2 border border-gray-200 bg-gray-100 rounded-2xl text-gray-700 
                 hover:bg-green-50 hover:border-green-200 hover:text-green-700 
                 transition-all duration-200 active:scale-95"
    >
      {category.name}
    </button>
  ))}
</div>
      </div>

    </div>
  </div>
)}
  </>
);
}