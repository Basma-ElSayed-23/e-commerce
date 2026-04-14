// "use client";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function OrdersPage() {
//   const { data: session } = useSession();
//   const token = (session as any)?.accessToken ?? "";
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (!token) return;
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     const userId = payload.id || payload._id;
//     fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
//       headers: { token },
//     })
//       .then((res) => res.json())
//       .then((data) => { setOrders(data); setLoading(false); });
//   }, [token]);

//   if (loading) return (
//     <div className="h-screen flex items-center justify-center text-xl font-bold">Loading...</div>
//   );

//   if (orders.length === 0) return (
//     <div className="h-screen flex items-center justify-center text-xl font-bold text-gray-500">No orders yet!</div>
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen py-8">
//       <div className="max-w-4xl mx-auto px-4">

//         {/* Breadcrumb */}
//         <p className="text-sm text-gray-500 mb-4">
//           <span className="cursor-pointer hover:text-green-600" onClick={() => router.push("/")}>Home</span>
//           {" / "}
//           <span className="text-black font-medium">My Orders</span>
//         </p>

//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="bg-green-500 text-white p-3 rounded-xl text-xl">🛍️</div>
//             <div>
//               <h1 className="text-2xl font-bold">My Orders</h1>
//               <p className="text-sm text-gray-500">Track and manage your {orders.length} order{orders.length > 1 ? "s" : ""}</p>
//             </div>
//           </div>
//           <button
//             onClick={() => router.push("/shop")}
//             className="flex items-center gap-2 text-sm text-green-600 border border-green-500 px-4 py-2 rounded-xl hover:bg-green-50 transition"
//           >
//             🛒 Continue Shopping
//           </button>
//         </div>

//         {/* Orders */}
//         <div className="flex flex-col gap-4">
//           {orders.map((order: any) => (
//             <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

//               {/* Order Row */}
//               <div className="p-4 flex items-center gap-4">

//                 {/* Images Stack */}
//                 <div className="relative w-14 h-14 flex-shrink-0">
//                   {order.cartItems.slice(0, 2).map((item: any, i: number) => (
//                     <img
//                       key={item._id}
//                       src={item.product?.imageCover}
//                       alt={item.product?.title}
//                       className="w-12 h-12 rounded-lg object-cover border-2 border-white absolute"
//                       style={{ left: i * 8, top: i * 4, zIndex: i }}
//                     />
//                   ))}
//                   {order.cartItems.length > 1 && (
//                     <div className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10">
//                       +{order.cartItems.length - 1}
//                     </div>
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">● Processing</span>
//                   </div>
//                   <p className="font-bold text-gray-800">#{order._id.slice(-4).toUpperCase()}</p>
//                   <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
//                     <span>📅 {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
//                     <span>📦 {order.cartItems.length} item{order.cartItems.length > 1 ? "s" : ""}</span>
//                     <span>📍 {order.shippingAddress.city}</span>
//                   </div>
//                   <p className="font-bold text-gray-800 mt-1">{order.totalOrderPrice} EGP</p>
//                 </div>

//                 {/* Details Button */}
//                 <button
//                   onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
//                   className="flex items-center gap-1 text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
//                 >
//                   Details {expandedOrder === order._id ? "▲" : "▼"}
//                 </button>
//               </div>

//               {/* Expanded Details */}
//               {expandedOrder === order._id && (
//                 <div className="border-t px-4 py-4 bg-gray-50 space-y-3">
//                   {order.cartItems.map((item: any) => (
//                     <div key={item._id} className="flex items-center gap-3">
//                       <img src={item.product?.imageCover} alt={item.product?.title} className="w-12 h-12 rounded-lg object-cover" />
//                       <div className="flex-1">
//                         <p className="text-sm font-medium">{item.product?.title}</p>
//                         <p className="text-xs text-gray-500">{item.count} × {item.price} EGP</p>
//                       </div>
//                       <p className="font-semibold text-sm">{item.count * item.price} EGP</p>
//                     </div>
//                   ))}
//                   <div className="border-t pt-3 text-sm text-gray-600 space-y-1">
//                     <p>📍 {order.shippingAddress.city} — {order.shippingAddress.details}</p>
//                     <p>📞 {order.shippingAddress.phone}</p>
//                     <p>💳 {order.paymentMethodType === "cash" ? "Cash on Delivery" : "Online Payment"}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Footer Badges */}
//         <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { icon: "🚚", title: "Free Shipping", sub: "On orders over 500 EGP" },
//             { icon: "↩️", title: "Easy Returns", sub: "14-day return policy" },
//             { icon: "🔒", title: "Secure Payment", sub: "100% secure checkout" },
//             { icon: "🎧", title: "24/7 Support", sub: "Contact us anytime" },
//           ].map((b) => (
//             <div key={b.title} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
//               <span className="text-2xl">{b.icon}</span>
//               <div>
//                 <p className="text-sm font-semibold text-gray-800">{b.title}</p>
//                 <p className="text-xs text-gray-500">{b.sub}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }

"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken ?? "";
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id || payload._id;
    fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
      headers: { token },
    })
      .then((res) => res.json())
      .then((data) => { setOrders(data); setLoading(false); });
  }, [token]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center text-xl font-bold">Loading...</div>
  );

  if (orders.length === 0) return (
    <div className="h-screen flex items-center justify-center text-xl font-bold text-gray-500">No orders yet!</div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-4">
          <span className="cursor-pointer hover:text-green-600" onClick={() => router.push("/")}>Home</span>
          {" / "}
          <span className="text-black font-medium">My Orders</span>
        </p>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 text-white p-3 rounded-xl text-xl">🛍️</div>
            <div>
              <h1 className="text-2xl font-bold">My Orders</h1>
              <p className="text-sm text-gray-500">Track and manage your {orders.length} order{orders.length > 1 ? "s" : ""}</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/shop")}
            className="flex items-center gap-2 text-sm text-green-600 border border-green-500 px-4 py-2 rounded-xl hover:bg-green-50 transition"
          >
            🛒 Continue Shopping
          </button>
        </div>

        {/* Orders */}
        <div className="flex flex-col gap-4">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Order Row */}
              <div className="p-4 flex items-center gap-4">

                {/* Images Stack */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  {order.cartItems.slice(0, 2).map((item: any, i: number) => (
                    <img
                      key={item._id}
                      src={item.product?.imageCover}
                      alt={item.product?.title}
                      className="w-12 h-12 rounded-lg object-cover border-2 border-white absolute"
                      style={{ left: i * 8, top: i * 4, zIndex: i }}
                    />
                  ))}
                  {order.cartItems.length > 1 && (
                    <div className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10">
                      +{order.cartItems.length - 1}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">● Processing</span>
                  </div>
                  <p className="font-bold text-gray-800"># {order._id.slice(-5).toUpperCase()}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>📅 {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span>📦 {order.cartItems.length} item{order.cartItems.length > 1 ? "s" : ""}</span>
                    <span>📍 {order.shippingAddress.city}</span>
                  </div>
                  <p className="font-bold text-gray-800 mt-1">{order.totalOrderPrice} <span className="text-xs font-normal text-gray-500">EGP</span></p>
                </div>

                {/* Details Button */}
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                  className="flex items-center gap-1 text-sm text-gray-600 border border-gray-200 px-4 py-1.5 rounded-lg hover:bg-gray-50 transition"
                >
                  {expandedOrder === order._id ? "Hide ▲" : "Details ▼"}
                </button>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order._id && (
                <div className="border-t px-4 py-4 space-y-4">

                  {/* Order Items */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                      <p className="text-sm font-semibold text-gray-700">Order Items</p>
                    </div>
                    <div className="space-y-3">
                      {order.cartItems.map((item: any) => (
                        <div key={item._id} className="flex items-center gap-3">
                          <img src={item.product?.imageCover} alt={item.product?.title} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.product?.title}</p>
                            <p className="text-xs text-gray-500">{item.count} × {item.price} EGP</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm">{item.count * item.price}</p>
                            <p className="text-xs text-gray-400">EGP</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Address + Summary */}
                  <div className="grid grid-cols-2 gap-4">

                    
                    {/* Delivery Address */}
                       <div className="w-1/2 border rounded-xl p-4">
                      <div className="flex items-center  gap-2 mb-2">
                        <span className="text-green-500">📍</span>
                        <p className="text-sm font-semibold text-gray-700">Delivery Address</p>
                      </div>
                      <p className="text-sm font-medium text-gray-800">{order.shippingAddress.city}</p>
                      <p className="text-sm text-gray-500">{order.shippingAddress.city} , {order.shippingAddress.details}</p>
                      <p className="text-sm text-gray-500 mt-1">📞 {order.shippingAddress.phone}</p>
                    </div>

                    {/* Order Summary */}
                    <div className="w-1/2 bg-[#FEF3C6] border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-500">🧾</span>
                        <p className="text-sm font-semibold text-gray-700">Order Summary</p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>{order.totalOrderPrice} EGP</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-400 border-t pt-3 pb-3 mt-3">
                          <span>Total</span>
                          <span>{order.totalOrderPrice} EGP</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Badges */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🚚", title: "Free Shipping", sub: "On orders over 500 EGP" },
            { icon: "↩️", title: "Easy Returns", sub: "14-day return policy" },
            { icon: "🔒", title: "Secure Payment", sub: "100% secure checkout" },
            { icon: "🎧", title: "24/7 Support", sub: "Contact us anytime" },
          ].map((b) => (
            <div key={b.title} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{b.title}</p>
                <p className="text-xs text-gray-500">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}