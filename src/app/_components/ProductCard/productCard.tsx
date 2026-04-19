"use client"

import { Button } from '@base-ui/react';
import { FaStar , FaStarHalfAlt } from "react-icons/fa";  
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

console.log(product)
  return (
  <div>
   <Link href={`/productdetails/${product.id}`}>
    <div className='border rounded-lg p-3 relative'>
    {product.priceAfterDiscount && (
    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">
      -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
    </span>)}
     <button onClick={handleWishlist}  disabled={wishlistLoading}
  className='absolute top-3 right-3 z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors'>
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
    <div className='rate flex items-center gap-1 text-xs sm:text-sm'>
  {[1, 2, 3, 4, 5].map((star) => {
    const rating = Number(product.ratingsAverage);
    if (star <= Math.floor(rating)) {
      return <FaStar key={star} className='text-yellow-400' />;
    } else if (star === Math.ceil(rating) && rating % 1 >= 0.5) {
      return <FaStarHalfAlt key={star} className='text-yellow-400' />;
    } else {
      return <FaStar key={star} className='text-gray-200' />;
    }
  })}
  <span className='text-xs'>{product.ratingsAverage} ({product.ratingsQuantity})</span>
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

<Button onClick={(e) => { e.preventDefault(); handleAddToCart(); }} disabled={isLoading} id={product.id} 
  className='size-10 rounded-full bg-[#16A34A] text-white cursor-pointer text-xl font-bold flex items-center justify-center'>
  {isLoading ? (
  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
) : "+"}
</Button>
    </div>
    </div>
    </Link>
   </div>
    );
  }


