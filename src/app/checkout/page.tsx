"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getLoggedUserCart } from "@/actions/cart.action";
import { cashOrder, onlinePayment } from "@/actions/order.action";

interface CartProduct {
  _id: string;
  product: { _id: string; imageCover: string; title: string };
  price: number;
  count: number;
}

interface CartData {
  _id: string;
  products: CartProduct[];
  totalCartPrice: number;
  totalAfterDiscount?: number;
}

export default function Checkout() {
  const { data: session, status } = useSession();
  console.log(session);
  const token = (session as any)?.accessToken ?? "";
  const router = useRouter();

  const [cartData, setCartData] = useState<CartData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ city: "", details: "", phone: "" });
  const [errors, setErrors] = useState({ city: "", details: "", phone: "" });

 useEffect(() => {
  if (status === "authenticated" && token) {
    getLoggedUserCart(token).then((res) => {
      if (res.status === "success") setCartData(res.data);
    });
  }
}, [status, token]); 

  function validate() {
    const newErrors = { city: "", details: "", phone: "" };
    let valid = true;
    if (!form.city.trim()) { newErrors.city = "City is required"; valid = false; }
    if (!form.details.trim()) { newErrors.details = "Street address is required"; valid = false; }
    if (!/^01[0-9]{9}$/.test(form.phone)) { newErrors.phone = "Enter a valid Egyptian number"; valid = false; }
    setErrors(newErrors);
    return valid;
  }

 async function handlePlaceOrder() {
    if (!validate() || !cartData || !token) return; 
    setLoading(true);

    const shippingAddress = { city: form.city, details: form.details, phone: form.phone };

    if (paymentMethod === "cash") {
      const res = await cashOrder(cartData._id, shippingAddress, token);
      setLoading(false);
      if (res.status === "success") router.push("/orders");
      else alert(res.message);
    } else {
      const res = await onlinePayment(cartData._id, shippingAddress, token);
      setLoading(false);
      if (res.status === "success" && res.session?.url) {
        window.location.href = res.session.url;
      } else alert(res.message);
    }
  }
console.log(JSON.stringify(session))
  if (!cartData) return (
    <div className="h-screen flex items-center justify-center text-xl font-bold text-gray-700">Loading...</div>
  );


return (
  <div className="container mx-auto px-4 py-6">
    <h2 className="text-2xl font-semibold mb-2">Complete Your Order</h2>
    <p className="text-gray-500 mb-6">
      Review your items and complete your purchase
    </p>

    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      <div className="bg-white rounded-2xl shadow border overflow-hidden h-full">
        <div className="bg-green-600 text-white px-5 py-4">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
            </svg>
            Shipping Address
          </div>
          <p className="text-green-100 text-sm mt-0.5">Where should we deliver your order?</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-blue-600 flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
            </svg>
            <div>
              <p className="font-medium">Delivery Information</p>
              <p className="text-blue-400">Please ensure your address is accurate for smooth delivery</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7l7-5 7 5v12a2 2 0 01-2 2z" />
              </svg>
              <input
                type="text"
                placeholder="e.g. Cairo, Alexandria, Giza"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full border rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Street Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <textarea
                placeholder="Street name, building number, floor, apartment..."
                rows={3}
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className="w-full border rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"/>
            </div>
            {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.06 3.18a1 1 0 01-.23 1.05L7.5 9.5a16 16 0 006.99 7l1.58-1.58a1 1 0 011.05-.23l3.18 1.06a1 1 0 01.68.95V19a2 2 0 01-2 2C9.16 21 3 14.84 3 5z" />
              </svg>
              <input
                type="tel"
                placeholder="01xxxxxxxxx"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"/>
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            <p className="text-xs text-gray-400 mt-1 text-right">Egyptian numbers only</p>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl shadow border overflow-hidden h-full flex flex-col">
        <div className="bg-green-600 text-white px-5 py-4">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19M7 13h10M9 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            Order Summary
          </div>
          <p className="text-green-100 text-sm mt-0.5">{cartData?.products?.length ?? 0} items</p>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 px-4 py-2">
          {cartData?.products?.map((item) => (
            <div key={item._id} className="flex items-center gap-3 py-3">
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-12 h-12 rounded-lg object-cover border"/>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.product.title}</p>
                <p className="text-xs text-gray-500">{item.count} × {item.price} EGP</p>
              </div>
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                {item.count * item.price}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t px-5 py-4 space-y-2 bg-gray-50">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{cartData?.totalCartPrice ?? 0} EGP</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 items-center">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              Shipping
            </span>
            <span className="text-green-600 font-semibold">FREE</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t">
            <span>Total</span>
            <span className="text-green-600 text-xl">
              {cartData?.totalAfterDiscount ?? cartData?.totalCartPrice ?? 0}{" "}
              <span className="text-sm font-normal">EGP</span>
            </span>
          </div>
        </div>
        <div className="px-5 pb-5 pt-3 bg-gray-50">
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19M9 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
          <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11v1H4v7h16v-7h-2v-1c0-1.657-1.343-3-3-3s-3 1.343-3 3v1H9v-1z" />
              </svg>
              Secure
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              Fast Delivery
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Easy Returns
            </span>
          </div>
        </div>
      </div>
    </div>

    
    <div className="mt-6">
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="bg-green-600 text-white px-5 py-4">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h14a2 2 0 012 2v1H3V7zM3 10h18v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7zm13 3a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
            Payment Method
          </div>
          <p className="text-green-100 text-sm mt-0.5">Choose how you'd like to pay</p>
        </div>
        <div className="p-4 space-y-3">
          <label
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              paymentMethod === "cash"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:bg-gray-50"}`}>
            <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Cash on Delivery</p>
              <p className="text-sm text-gray-500">Pay when your order arrives at your doorstep</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              paymentMethod === "cash" ? "border-green-500 bg-green-500" : "border-gray-300" }`}>
              {paymentMethod === "cash" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>)}
            </div>
            <input type="radio" name="payment" className="hidden" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} />
          </label>

          <label
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              paymentMethod === "online"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:bg-gray-50"}`}>
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Pay Online</p>
              <p className="text-sm text-gray-500">Secure payment with Credit/Debit Card via Stripe</p>
              <div className="flex gap-2 mt-2">
                <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold italic">VISA</span>
                </div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                  <div className="flex">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-90" />
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 opacity-90 -ml-1.5" />
                  </div>
                </div>
                <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AMEX</span>
                </div>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              paymentMethod === "online" ? "border-green-500 bg-green-500" : "border-gray-300" }`}>
              {paymentMethod === "online" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>)}
            </div>
            <input type="radio" name="payment" className="hidden" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
          </label>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-green-800 text-sm">Secure & Encrypted</p>
              <p className="text-xs text-green-600">Your payment info is protected with 256-bit SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

