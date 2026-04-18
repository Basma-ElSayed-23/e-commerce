// "use client";

// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import { removeFromWishlist } from "@/actions/wishlist.action";
// import Link from "next/link";
// import Image from "next/image";

// interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   imageCover: string;
//   ratingsAverage: number;
// }

// export default function WishlistClient({ initialItems }: { initialItems: Product[] }) {
//   const { data: session } = useSession();
//   const [items, setItems] = useState<Product[]>(initialItems);
//   const [loadingId, setLoadingId] = useState<string | null>(null);

//   async function handleRemove(productId: string) {
//     const token = (session as any)?.accessToken || "";
//     if (!token) return;
//     setLoadingId(productId);
//     await removeFromWishlist(productId, token);
//     setItems(prev => prev.filter(p => p._id !== productId));
//     setLoadingId(null);
//   }

//   if (items.length === 0) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3 text-center">
//           <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
//             <svg className="w-9 h-9 text-gray-400" viewBox="0 0 24 24" fill="none"
//               stroke="currentColor" strokeWidth="1.5">
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//             </svg>
//           </div>
//           <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
//           <p className="text-gray-500 text-sm">Browse products and save your favorites here.</p>
//           <Link href="/products"
//             className="mt-3 bg-green-500 hover:bg-green-600 text-white px-12 py-3 rounded-lg font-medium transition-colors">
//             Browse Products →
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold mb-6">
//         My Wishlist <span className="text-gray-400 text-lg">({items.length})</span>
//       </h1>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {items.map(item => (
//           <div key={item._id} className="border rounded-xl p-3 flex flex-col gap-2">
//             <Image
//               src={item.imageCover}
//               alt={item.title}
//               width={300}
//               height={200}
//               className="w-full h-40 object-contain"
//             />
//             <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
//             <p className="text-green-600 font-semibold">{item.price} EGP</p>
//             <button
//               onClick={() => handleRemove(item._id)}
//               disabled={loadingId === item._id}
//               className="mt-auto text-sm text-red-500 border border-red-300 rounded-lg py-1.5 hover:bg-red-50 transition-colors disabled:opacity-50">
//               {loadingId === item._id ? "Removing..." : "Remove"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getWishlist, removeFromWishlist, addToWishlist } from "@/actions/wishlist.action";
import { addToCart } from "@/actions/cart.action";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from '@tanstack/react-query';




interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  category?: { name: string };
}

export default function WishlistClient() {
  const { data: session } = useSession();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [cartLoadingId, setCartLoadingId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  

  useEffect(() => {
    const token = (session as any)?.accessToken;
    if (!token) { setLoading(false); return; }
    getWishlist(token).then((data) => {
      setItems(data?.data || []);
      setLoading(false);
    });
  }, [session]);

  async function handleRemove(productId: string) {
  const token = (session as any)?.accessToken;
  if (!token) return;
  setLoadingId(productId);
  await removeFromWishlist(productId, token);
  queryClient.invalidateQueries({ queryKey: ['wishlist'] });
  window.dispatchEvent(new CustomEvent("wishlistUpdated"));
  toast.success("Removed from wishlist", { position: "top-right", duration: 2000 });
  setLoadingId(null);
}

async function handleAddToCart(productId: string) {
  const token = (session as any)?.accessToken;
  if (!token) return;
  setCartLoadingId(productId);
  const res = await addToCart(productId, token);
  if (res.status === "success") {
    toast.success("Added to cart!", { position: "top-right", duration: 2000 });
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  } else {
    toast.error("Failed to add to cart", { position: "top-right", duration: 2000 });
  }
  setCartLoadingId(null);
}

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <p className="text-lg">Loading...</p>
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-9 h-9 text-gray-400" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
          <p className="text-gray-500 text-sm">Browse products and save your favorites here.</p>
          <Link href="/products"
            className="mt-3 bg-green-500 hover:bg-green-600 text-white px-12 py-3 rounded-lg font-medium transition-colors">
            Browse Products →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <p className="text-gray-500 text-sm">{items.length} items saved</p>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 border-b">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {/* Table Rows */}
        {items.map((item, index) => (
          <div key={item._id}
            className={`grid grid-cols-12 px-6 py-4 items-center ${index !== items.length - 1 ? 'border-b' : ''}`}>
            
            {/* Product */}
            <div className="col-span-6 flex items-center gap-4">
              <Image src={item.imageCover} alt={item.title}
                width={80} height={80}
                className="w-16 h-16 object-contain rounded-lg border p-1"/>
              <div>
                <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                <p className="text-sm text-gray-500">{item.category?.name || "Product"}</p>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-2 text-center font-semibold text-gray-900">
              {item.price} EGP
            </div>

            {/* Status */}
            <div className="col-span-2 text-center">
              <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                In Stock
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-center gap-2">
              <button
                onClick={() => handleAddToCart(item._id)}
                disabled={cartLoadingId === item._id}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                {cartLoadingId === item._id ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => handleRemove(item._id)}
                disabled={loadingId === item._id}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50">
                {loadingId === item._id ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"/>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}