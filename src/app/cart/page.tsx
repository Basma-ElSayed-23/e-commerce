"use client"

import React, { useEffect, useState } from 'react'
import FeaturedProducts from '../_components/FeaturedProducts/FeaturedProducts'
import { getLoggedUserCart } from '@/actions/cart.action'
import { FaTrash } from 'react-icons/fa6';
import Link from 'next/link';

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


const [cartData , setCartData] = useState<CartData | null>(null)
  
 async function getUserCart(){
    const res = await getLoggedUserCart();
    console.log(res);

 if (res.status === "success") {
  setCartData(res.data);
    }
 }


useEffect(() => {
  getUserCart()
  
}, [])


  const [coupon, setCoupon] = useState('')

  function handleRemove(_id: any): void {
    throw new Error('Function not implemented.')
  }

  function handleQuantity(_id: any, arg1: any): void {
    throw new Error('Function not implemented.')
  }

//   return (
//     <>
//     <div>Cart-page</div>
    
//     </>
    
//   )
// }


return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="w-[88%] mx-auto">

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-green-500 text-xl">🛒</span>
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
        </div>
        <p className="text-gray-400 text-sm mb-6">You have {cartData?.products.length || 0} items in your cart</p>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Cart Items Table */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 text-gray-400 text-sm font-medium border-b">
                <span className="col-span-5">Product Image</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-center">Price</span>
                <span className="col-span-3 text-center">Total Amount</span>
              </div>

              {/* Products */}
              {cartData?.products.map((item: CartProduct) => (
                <div key={item._id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b items-center">

                  {/* Product Info */}
                  <div className="col-span-5 flex items-center gap-4">
                    <img src={item.product.imageCover} alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-xl" />
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-1">{item.product.title}</h3>
                      <p className="text-gray-400 text-xs mt-1">{item.product.category?.name}</p>
                      <span className="text-xs text-green-500 font-medium bg-green-50 px-2 py-0.5 rounded-full mt-1 inline-block">In stock</span>
                      <p className="text-green-600 font-bold text-sm mt-1">{item.price} EGP</p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <button onClick={() => handleQuantity(item.product._id, item.count - 1)}
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold cursor-pointer text-gray-600">
                      -
                    </button>
                    <span className="w-6 text-center font-semibold">{item.count}</span>
                    <button onClick={() => handleQuantity(item.product._id, item.count + 1)}
                      className="w-7 h-7 rounded-full bg-green-500 text-white hover:bg-green-600 flex items-center justify-center font-bold cursor-pointer">
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center font-semibold text-gray-700">
                    {item.price} EGP
                  </div>

                  {/* Total + Delete */}
                  <div className="col-span-3 flex items-center justify-center gap-3">
                    <span className="font-bold text-gray-800">{item.price * item.count} EGP</span>
                    <button onClick={() => handleRemove(item.product._id)}
                      className="text-red-400 hover:text-red-600 cursor-pointer p-1">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Links */}
            <div className="flex justify-between mt-4 px-1">
              <Link href="/" className="text-green-500 hover:underline text-sm flex items-center gap-1">
                ← Continue Shopping
              </Link>
              <button className="text-gray-400 hover:text-red-500 text-sm">
                Clear all items
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-72 xl:w-80">
            <div className="bg-green-500 text-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-1">Order Summary</h2>
              <p className="text-sm text-white/80 mb-4">Delivery to your door</p>

              {/* Free Shipping */}
              <div className="bg-white/20 rounded-xl p-3 mb-5 text-center">
                <p className="text-sm font-semibold">🚚 Free Shipping!</p>
                <p className="text-xs text-white/80 mt-0.5">You qualify for free delivery</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">Subtotal</span>
                  <span className="font-semibold">{cartData?.totalCartPrice} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Shipping</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-white/30 pt-3">
                  <span>Total</span>
                  <span>{cartData?.totalAfterDiscount ?? cartData?.totalCartPrice} EGP</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Apply Promo Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 rounded-lg px-3 py-2 text-gray-800 text-sm outline-none"
                />
                <button className="bg-white text-green-600 font-bold px-3 py-2 rounded-lg text-sm hover:bg-gray-100 cursor-pointer">
                  Apply
                </button>
              </div>

              {/* Checkout */}
              <button className="w-full bg-white text-green-600 font-bold py-3 rounded-xl hover:bg-gray-50 cursor-pointer mb-4 flex items-center justify-center gap-2">
                🔒 Secure Checkout
              </button>

              {/* Trust Badges */}
              <div className="flex justify-center gap-4 text-xs text-white/80">
                <span>🔐 Secure Payment</span>
                <span>🚚 Fast Delivery</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}