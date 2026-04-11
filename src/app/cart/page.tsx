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
  const { data: session, status } = useSession(); 
  const token = (session as any)?.accessToken ?? "";
  const [showClearModal, setShowClearModal] = useState(false);
  const [cartCleared, setCartCleared] = useState(false);

  const [cartData, setCartData] = useState<CartData | null>(null);

  async function getUserCart() {
    const res = await getLoggedUserCart(token); 
    console.log(res);
    if (res.status === "success") {
      setCartData(res.data);
    }
  }

  useEffect(() => {
    if (status === "authenticated") { 
      getUserCart();
    }
  }, [status]); // ✅

  async function handleRemove(productId: string) {
    const res = await removeFromCart(productId, token); 
    if (res.status === "success") getUserCart();
  }

  async function handleQuantity(productId: string, count: number) {
    if (count < 1) return;
    const res = await updateCartQuantity(productId, count, token); 
    if (res.status === "success") getUserCart();
  }
  async function handleClearCart() {
  if (!cartData?.products) return;
  for (const product of cartData.products) {
    await removeFromCart(product.product._id, token);
  }
  await getUserCart();
  setCartCleared(true);
}
  
if (!cartData){
  return <div className='h-screen text-black text-2xl font-bold flex justify-center items-center '>Loading...</div>
}

return (
  <>
    {cartData?.products && cartData?.products.length > 0 ? (
      <div className="bg-gray-50 min-h-[calc(100vh-120px)] py-8">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Breadcrumb */}
          <p className="text-sm text-gray-500 mb-4">Home / <span className="text-black font-medium">Shopping Cart</span></p>

          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 text-white p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <p className="text-sm text-gray-500">You have <span className="text-green-500 font-semibold">{cartData.products.length} item{cartData.products.length > 1 ? 's' : ''}</span> in your cart</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* LEFT - Products */}
            <div className="flex-1 flex flex-col gap-4">
              {cartData.products.map((product) => (
                <div key={product._id || product.product?._id} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                  <img src={product.product.imageCover} alt={product.product.title} className="w-20 h-20 object-cover rounded-xl" />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.product.title}</h3>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">{product.product.category?.name}</span>
                    <p className="text-green-600 font-bold mt-1">{product.price} EGP</p>
                  </div>

                  {/* Quantity + Total + Delete */}
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleQuantity(product.product._id, product.count - 1)}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold transition-colors">
                      -
                    </button>
                    <span className="w-6 text-center font-semibold">{product.count}</span>
                    <button onClick={() => handleQuantity(product.product._id, product.count + 1)}
                      className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center font-bold transition-colors">
                      +
                    </button>
                  </div>

                  <p className="font-bold text-gray-800 w-24 text-right">
                    {product.price * product.count} EGP
                  </p>

                  <button onClick={() => handleRemove(product.product._id)}
                    className="w-9 h-9 bg-red-100 hover:bg-red-200 text-red-500 rounded-full flex items-center justify-center transition-colors">
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}

              {/* Continue Shopping + Clear */}
              <div className="flex justify-between items-center mt-2">
                <button onClick={() => window.location.href = '/'} className="text-sm text-gray-500 hover:text-green-600 flex items-center gap-1 transition-colors">
                  ← Continue Shopping
                </button>
                
                <button onClick={() => setShowClearModal(true)} className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors">
                  <FaTrash size={12} /> Clear all items
                </button>
              </div>
            </div>

            {/* RIGHT - Order Summary */}
{/* RIGHT - Order Summary */}
<div className="w-full lg:w-[420px] h-fit sticky top-24">
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
    
    {/* Header */}
    <div className="bg-green-500 text-white p-5 flex items-center gap-3">
      <span className="text-xl">🔒</span>
      <div>
        <h3 className="font-bold text-lg">Order Summary</h3>
        <p className="text-sm text-green-100">{cartData.products.length} item{cartData.products.length > 1 ? 's' : ''} in your cart</p>
      </div>
    </div>

    <div className="p-5 space-y-4">

      {/* Free Shipping */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
        <span className="text-2xl">🚚</span>
        <div>
          <p className="text-green-700 font-bold text-sm">Free Shipping!</p>
          <p className="text-green-600 text-xs">You qualify for free delivery</p>
        </div>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between text-gray-600 text-sm">
        <span>Subtotal</span>
        <span className="font-semibold text-gray-900">{cartData.totalCartPrice} EGP</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between text-gray-600 text-sm">
        <span>Shipping</span>
        <span className="font-bold text-green-500">FREE</span>
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-xl border-t pt-4">
        <span>Total</span>
        <span>{cartData.totalAfterDiscount ?? cartData.totalCartPrice} <span className="text-sm font-normal text-gray-500">EGP</span></span>
      </div>

      {/* Promo Code */}
      <button className="w-full border border-gray-200 rounded-xl py-3 text-gray-500 hover:border-green-400 hover:text-green-500 transition-colors flex items-center justify-center gap-2 text-sm">
        🏷️ Apply Promo Code
      </button>

      {/* Checkout Button */}
      <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
        🔒 Secure Checkout
      </button>

      {/* Secure Payment + Fast Delivery */}
      <div className="flex justify-center gap-6 text-xs text-gray-400 pt-1">
        <span className="flex items-center gap-1">🛡️ Secure Payment</span>
        <span className="flex items-center gap-1">🚚 Fast Delivery</span>
      </div>

      {/* Continue Shopping */}
      <button onClick={() => window.location.href = '/'} className="w-full text-center text-sm text-gray-400 hover:text-green-500 transition-colors pt-1">
        ← Continue Shopping
      </button>

    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    ) : (
      <div className="bg-gray-50 min-h-[calc(100vh-120px)] py-12">
        <div className="max-w-2xl mx-auto text-center px-6">
          <div className="mx-auto mb-8 w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 text-lg mb-10">Looks like you haven't added anything to your cart yet.<br />Start exploring our products!</p>
          <button onClick={() => window.location.href = '/'} className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-10 py-4 rounded-2xl transition-all duration-200 flex items-center gap-3 mx-auto group mb-16">
            Start Shopping
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <div className="flex flex-wrap justify-center gap-3">
            {["Electronics", "Fashion", "Home", "Beauty"].map((name) => (
              <button key={name} onClick={() => window.location.href = '/categories'}
                className="px-3 py-2 border border-gray-200 bg-gray-100 rounded-2xl text-gray-700 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all duration-200">
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    )}

{/* Clear Cart Modal */}
{showClearModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white  py-4 px-10 max-w-sm w-full mx-14 text-center shadow-xl">
      
      {/* Icon */}
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">Clear Your Cart?</h3>
      <p className="text-gray-500 text-sm mb-6">All items will be removed from your cart. This action cannot be undone.</p>

      <div className="flex gap-3">
        <button 
          onClick={() => setShowClearModal(false)}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors">
          Keep Shopping
        </button>
        <button 
          onClick={() => { setShowClearModal(false); handleClearCart(); }}
          className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors">
          Yes, Clear All
        </button>
      </div>

    </div>
  </div>
)}

{/* Cart Cleared Modal */} 
      {cartCleared && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-xl">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cart Cleared!</h3>
            <p className="text-gray-500 text-sm mb-6">Your cart is now empty.</p>
            <button 
              onClick={() => { setCartCleared(false); window.location.href = '/'; }}
              className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      )}


  </>
);
}

