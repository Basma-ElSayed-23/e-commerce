"use client"

import { Button } from '@base-ui/react';
import { FaStar } from "react-icons/fa";  
import { ProductType } from '@/api/types/product.type';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import React, { useState } from 'react'
import { addToCart } from '@/actions/cart.action';
import { useSession } from 'next-auth/react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { addToWishlist, removeFromWishlist, getWishlist } from '@/actions/wishlist.action';


export default function ProductCard({product} : {product : ProductType}) {

const { data: session } = useSession();
const token = (session as any)?.accessToken;
const [isLoading, setIsLoading] = useState(false);

const queryClient = useQueryClient();
const [wishlistLoading, setWishlistLoading] = useState(false);

const { data: wishlistData } = useQuery({
  queryKey: ['wishlist'],
  queryFn: () => getWishlist(token),
  enabled: !!token,
  staleTime: 1000 * 60,
});

const isWishlisted = wishlistData?.data?.some((p: any) => p._id === product._id) ?? false;

// const handleAddToCart = () => {
//   toast.success("Product added to cart!" , { 
//     duration: 2000,
//     position: "top-center",
// });

// console.log("Product added to cart!");

// };

async function handleAddToCart() {
  setIsLoading(true);
  if (!token) {
    toast.error("please login first!", {position: "top-right", duration: 2000});
    setIsLoading(false);
    return;
  }
  const res = await addToCart(product.id, token);
  if (res.status === "success") {
    toast.success(res.message, {position: "top-right", duration: 2000});
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  } else {
    toast.error(res.message, {position: "top-right", duration: 2000});
  }
  setIsLoading(false);
}

async function handleWishlist(e: React.MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  if (!token) { toast.error("please login first!"); return; }
  setWishlistLoading(true);
  try {
    if (isWishlisted) {
      const res = await removeFromWishlist(product._id, token);
      if (res.status === "success") {
        toast.success("Removed from wishlist");
        queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        window.dispatchEvent(new CustomEvent("wishlistUpdated"));
      }
    } else {
      const res = await addToWishlist(product._id, token);
      if (res.status === "success") {
        toast.success("Added to wishlist");
        queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        window.dispatchEvent(new CustomEvent("wishlistUpdated"));
      }
    }
  } catch { toast.error("Something went wrong"); } 
  finally { setWishlistLoading(false); }
}


  return (
  <div>
   <Link href={`/productdetails/${product.id}`}>
    <div className='border rounded-lg p-3 relative'>

     <button
  onClick={handleWishlist}
  disabled={wishlistLoading}
  className='absolute top-3 right-3 z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors'
>
  <svg viewBox="0 0 24 24" width="22" height="22"
    fill={isWishlisted ? "#e53935" : "none"}
    stroke={isWishlisted ? "#e53935" : "#9ca3af"}
    strokeWidth="1.8">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
</button>


      <img src={product.imageCover} alt={product.title} className='w-full'/>
      <h2 className='line-clamp-1'>{product.title}</h2>
      <h3 className='line-clamp-1'>{product.description}</h3>
    <div className='rate flex items-center gap-2'><FaStar className='text-yellow-300' /> <FaStar className='text-yellow-300' /> 
    <FaStar className='text-yellow-300' /> <FaStar className='text-yellow-300' /> <FaStar />
    {product.ratingAverage}
    {`(${product.ratingsQuantity})`} reviews
</div>
<div className='price flex justify-between items-center'>{product.priceAfterDiscount ? (
  <>
  <div className='flex gap-2 items-center'>
 <span className='text-[#16A34A] font-bold text-lg'>{product.priceAfterDiscount}</span>
  <span className='text-sm text-slate-600 line-through'>{product.price}</span>
  </div>
  </>
) :( product.price
)}
{/* <Button onClick={handleAddToCart} id={product.id} className='size-10 rounded-full bg-[#16A34A] text-white cursor-pointer text-xl font-bold'>+</Button> */}


<Button 
  onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
  disabled={isLoading}
  id={product.id} 
  className='size-10 rounded-full bg-[#16A34A] text-white cursor-pointer text-xl font-bold flex items-center justify-center'>
  {isLoading ? (
  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
) : "+"}
</Button>
    </div>
    </div>
    </Link>
   </div>
    )
  }


// "use client"

// import { Button } from '@base-ui/react';
// import { FaStar } from "react-icons/fa";
// import { ProductType } from '@/api/types/product.type';
// import Link from 'next/link';
// import { toast } from 'react-hot-toast';
// // import React, { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useQueryClient } from '@tanstack/react-query';
// import { addToCart } from '@/actions/cart.action';
// import { addToWishlist, removeFromWishlist } from '@/actions/wishlist.action';
// import { getWishlist } from "@/actions/wishlist.action";
// import React, { useEffect, useState } from 'react';

// export default function ProductCard({ product }: { product: ProductType }) {

//   const { data: session } = useSession();
//   const queryClient = useQueryClient();

//   const [isLoading, setIsLoading] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   const token = (session as any)?.accessToken;

//   // 🛒 Add to Cart
//   async function handleAddToCart() {
//     setIsLoading(true);

//     if (!token) {
//       toast.error("please login first!");
//       setIsLoading(false);
//       return;
//     }

//     const res = await addToCart(product._id, token);

//     if (res.status === "success") {
//       toast.success(res.message);
//       window.dispatchEvent(new CustomEvent("cartUpdated"));
//     } else {
//       toast.error(res.message);
//     }

//     setIsLoading(false);
//   }

  
//   async function handleWishlist(e: React.MouseEvent) {
//     e.preventDefault();
//     e.stopPropagation(); 

//     if (!token) {
//       toast.error("please login first!");
//       return;
//     }

//     setWishlistLoading(true);

//     try {
//       if (isWishlisted) {
//         // Remove from wishlist
//         const res = await removeFromWishlist(product._id, token);

//         if (res.status === "success") {
//           setIsWishlisted(false);
//           toast.success("Removed from wishlist");
//         } else {
//           toast.error(res.message || "Failed to remove");
//         }
//       } else {
//         // Add to wishlist
//         const res = await addToWishlist(product._id, token);

//         if (res.status === "success") {
//           setIsWishlisted(true);
//           toast.success("Added to wishlist");

          
//           queryClient.invalidateQueries({ queryKey: ['wishlist'] });
//         } else {
//           toast.error(res.message || "Failed to add");
//         }
//       }
//     } catch (err: any) {
//       console.error("Wishlist Error:", err);
//       toast.error("Something went wrong");
//     } finally {
//       setWishlistLoading(false);
//     }
//   }

//   useEffect(() => {
//   if (!token) return;

//   async function checkWishlist() {
//     const data = await getWishlist(token);
//     const ids: string[] = data?.data?.map((p: any) => p._id) || [];
//     setIsWishlisted(ids.includes(product._id)); // ✅ _id مش id
//   }

//   checkWishlist();

//   window.addEventListener("wishlistUpdated", checkWishlist);
//   return () => window.removeEventListener("wishlistUpdated", checkWishlist);
// }, [token]);

//   return (
//     <div>
//       <Link href={`/productdetails/${product._id}`} className="block">
//         <div className='border rounded-lg p-3 relative hover:shadow-lg transition-shadow'>

//           {/* ❤️ Wishlist Button */}
//           <button
//             onClick={handleWishlist}
//             disabled={wishlistLoading}
//             className='absolute top-3 right-3 z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors'
//           >
//             <svg 
//               viewBox="0 0 24 24" 
//               width="22" 
//               height="22"
//               fill={isWishlisted ? "#e53935" : "none"}
//               stroke={isWishlisted ? "#e53935" : "#9ca3af"}
//               strokeWidth="1.8"
//             >
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//             </svg>
//           </button>

//           <img 
//             src={product.imageCover} 
//             alt={product.title} 
//             className='w-full aspect-square object-cover rounded-md mb-3'
//           />

//           <h2 className='line-clamp-2 font-medium text-sm mb-1'>{product.title}</h2>
//           <h3 className='line-clamp-2 text-xs text-gray-500 mb-2'>{product.description}</h3>

//           <div className='flex items-center gap-1 text-sm mb-3'>
//             <FaStar className='text-yellow-400' />
//             <span>{product.ratingAverage}</span>
//             <span className='text-gray-500 text-xs'>({product.ratingsQuantity})</span>
//           </div>

//           <div className='flex justify-between items-center'>
//             <span className='font-bold text-lg text-green-600'>
//               {product.priceAfterDiscount || product.price} EGP
//             </span>

//             <Button
//               onClick={(e) => { 
//                 e.preventDefault(); 
//                 e.stopPropagation();
//                 handleAddToCart(); 
//               }}
//               disabled={isLoading}
//               className='size-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors'
//             >
//               {isLoading ? "..." : "+"}
//             </Button>
//           </div>

//         </div>
//       </Link>
//     </div>
//   )
// }
// "use client"

// import { Button } from '@base-ui/react';
// import { FaStar } from "react-icons/fa";
// import { ProductType } from '@/api/types/product.type';
// import Link from 'next/link';
// import { toast } from 'react-hot-toast';
// import { useSession } from 'next-auth/react';
// import { useQueryClient, useQuery } from '@tanstack/react-query';
// import { addToCart } from '@/actions/cart.action';
// import { addToWishlist, removeFromWishlist, getWishlist } from '@/actions/wishlist.action';
// import React, { useState } from 'react';

// export default function ProductCard({ product }: { product: ProductType }) {

//   const { data: session } = useSession();
//   const queryClient = useQueryClient();

//   const [isLoading, setIsLoading] = useState(false);
//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   const token = (session as any)?.accessToken;

//   const { data: wishlistData } = useQuery({
//     queryKey: ['wishlist'],
//     queryFn: () => getWishlist(token),
//     enabled: !!token,
//     staleTime: 1000 * 60,
//   });

//   const isWishlisted = wishlistData?.data?.some((p: any) => p._id === product._id) ?? false;

//   async function handleAddToCart() {
//     setIsLoading(true);

//     if (!token) {
//       toast.error("please login first!");
//       setIsLoading(false);
//       return;
//     }

//     const res = await addToCart(product._id, token);

//     if (res.status === "success") {
//       toast.success(res.message);
//       window.dispatchEvent(new CustomEvent("cartUpdated"));
//     } else {
//       toast.error(res.message);
//     }

//     setIsLoading(false);
//   }

//   async function handleWishlist(e: React.MouseEvent) {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!token) {
//       toast.error("please login first!");
//       return;
//     }

//     setWishlistLoading(true);

//     try {
//       if (isWishlisted) {
//         const res = await removeFromWishlist(product._id, token);
//         if (res.status === "success") {
//           toast.success("Removed from wishlist");
//           queryClient.invalidateQueries({ queryKey: ['wishlist'] });
//           window.dispatchEvent(new CustomEvent("wishlistUpdated"));
//         } else {
//           toast.error(res.message || "Failed to remove");
//         }
//       } else {
//         const res = await addToWishlist(product._id, token);
//         if (res.status === "success") {
//           toast.success("Added to wishlist");
//           queryClient.invalidateQueries({ queryKey: ['wishlist'] });
//           window.dispatchEvent(new CustomEvent("wishlistUpdated"));
//         } else {
//           toast.error(res.message || "Failed to add");
//         }
//       }
//     } catch (err: any) {
//       console.error("Wishlist Error:", err);
//       toast.error("Something went wrong");
//     } finally {
//       setWishlistLoading(false);
//     }
//   }

//   return (
//     <div>
//       <Link href={`/productdetails/${product._id}`} className="block">
//         <div className='border rounded-lg p-3 relative hover:shadow-lg transition-shadow'>

//           <button
//             onClick={handleWishlist}
//             disabled={wishlistLoading}
//             className='absolute top-3 right-3 z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors'
//           >
//             <svg
//               viewBox="0 0 24 24"
//               width="22"
//               height="22"
//               fill={isWishlisted ? "#e53935" : "none"}
//               stroke={isWishlisted ? "#e53935" : "#9ca3af"}
//               strokeWidth="1.8"
//             >
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//             </svg>
//           </button>

//           <img
//             src={product.imageCover}
//             alt={product.title}
//             className='w-full aspect-square object-cover rounded-md mb-3'
//           />

//           <h2 className='line-clamp-2 font-medium text-sm mb-1'>{product.title}</h2>
//           <h3 className='line-clamp-2 text-xs text-gray-500 mb-2'>{product.description}</h3>

//           <div className='flex items-center gap-1 text-sm mb-3'>
//             <FaStar className='text-yellow-400' />
//             <span>{product.ratingAverage}</span>
//             <span className='text-gray-500 text-xs'>({product.ratingsQuantity})</span>
//           </div>

//           <div className='flex justify-between items-center'>
//             <span className='font-bold text-lg text-green-600'>
//               {product.priceAfterDiscount || product.price} EGP
//             </span>

//             <Button
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 handleAddToCart();
//               }}
//               disabled={isLoading}
//               className='size-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors'
//             >
//               {isLoading ? "..." : "+"}
//             </Button>
//           </div>

//         </div>
//       </Link>
//     </div>
//   );
// }