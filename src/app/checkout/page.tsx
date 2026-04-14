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
  if (status === "authenticated" && token) { // ✅ تأكد إن token موجود
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
    <div className="bg-gray-50 min-h-[calc(100vh-120px)] py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-4">Home / Cart / <span className="text-black font-medium">Checkout</span></p>

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 text-white p-2 rounded-lg">🧾</div>
            <div>
              <h1 className="text-2xl font-bold">Complete Your Order</h1>
              <p className="text-sm text-gray-500">Review your items and complete your purchase</p>
            </div>
          </div>
          <button onClick={() => router.push("/cart")} className="text-sm text-gray-500 hover:text-green-600 transition-colors">
            ← Back to Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-5">

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-green-500 text-white p-4 flex items-center gap-3">
                <span>🏠</span>
                <div>
                  <h3 className="font-bold">Shipping Address</h3>
                  <p className="text-sm text-green-100">Where should we deliver your order?</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2 text-sm text-blue-600">
                  <span>ℹ️</span>
                  <div>
                    <p className="font-semibold">Delivery Information</p>
                    <p className="text-blue-500">Please ensure your address is accurate for smooth delivery</p>
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">City *</label>
                  <div className={`flex items-center border rounded-xl px-4 py-3 gap-2 ${errors.city ? "border-red-400" : "border-gray-200"}`}>
                    <span className="text-gray-400">🏙️</span>
                    <input
                      type="text"
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="flex-1 outline-none text-sm"
                    />
                  </div>
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                {/* Street Address */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Street Address *</label>
                  <div className={`flex items-start border rounded-xl px-4 py-3 gap-2 ${errors.details ? "border-red-400" : "border-gray-200"}`}>
                    <span className="text-gray-400 mt-0.5">📍</span>
                    <textarea
                      placeholder="Street name, building number, floor, apartment..."
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      rows={3}
                      className="flex-1 outline-none text-sm resize-none"
                    />
                  </div>
                  {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number *</label>
                  <div className={`flex items-center border rounded-xl px-4 py-3 gap-2 ${errors.phone ? "border-red-400" : "border-gray-200"}`}>
                    <span className="text-gray-400">📞</span>
                    <input
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="flex-1 outline-none text-sm"
                    />
                    <span className="text-xs text-gray-400">Egyptian numbers only</span>
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-green-500 text-white p-4 flex items-center gap-3">
                <span>💳</span>
                <div>
                  <h3 className="font-bold">Payment Method</h3>
                  <p className="text-sm text-green-100">Choose how you'd like to pay</p>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {/* Cash */}
                <div
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === "cash" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white text-lg">💵</div>
                    <div>
                      <p className="font-semibold text-gray-800">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when your order arrives at your doorstep</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cash" ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                    {paymentMethod === "cash" && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>

                {/* Online */}
                <div
                  onClick={() => setPaymentMethod("online")}
                  className={`flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === "online" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">💳</div>
                    <div>
                      <p className="font-semibold text-gray-800">Pay Online</p>
                      <p className="text-sm text-gray-500">Secure payment with Credit/Debit Card via Stripe</p>
                      <div className="flex gap-1 mt-1">
                        {["VISA", "MC", "AMEX"].map((card) => (
                          <span key={card} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{card}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "online" ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                    {paymentMethod === "online" && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>

                {/* SSL */}
                <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 bg-gray-50">
                  <span className="text-green-500">🔒</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Secure & Encrypted</p>
                    <p className="text-xs text-gray-500">Your payment info is protected with 256-bit SSL encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Order Summary */}
          <div className="w-full lg:w-[400px] h-fit sticky top-24">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-green-500 text-white p-5 flex items-center gap-3">
                <span className="text-xl">🔒</span>
                <div>
                  <h3 className="font-bold text-lg">Order Summary</h3>
                  <p className="text-sm text-green-100">{cartData.products.length} items</p>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {cartData.products.map((p) => (
                  <div key={p._id} className="flex items-center gap-3">
                    <img src={p.product.imageCover} alt={p.product.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{p.product.title}</p>
                      <p className="text-xs text-gray-500">{p.count} × {p.price} EGP</p>
                    </div>
                    <span className="font-semibold text-sm">{p.price * p.count}</span>
                  </div>
                ))}

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{cartData.totalCartPrice} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-500 font-semibold">50 EGP</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span className="text-green-600">{(cartData.totalAfterDiscount ?? cartData.totalCartPrice) + 50} EGP</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? "Processing..." : "🔒 Place Order"}
                </button>

                <div className="flex justify-center gap-4 text-xs text-gray-400">
                  <span>🛡️ Secure</span>
                  <span>🚚 Fast Delivery</span>
                  <span>↩️ Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}