"use client"

import { Button } from '@base-ui/react';
import { FaStar } from "react-icons/fa";  
import { ProductType } from '@/api/types/product.type';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import React, { useState } from 'react'
import { addToCart } from '@/actions/cart.action';
import { useSession } from 'next-auth/react';


export default function ProductCard({product} : {product : ProductType}) {

const { data: session } = useSession();
const [isLoading, setIsLoading] = useState(false);

// const handleAddToCart = () => {
//   toast.success("Product added to cart!" , { 
//     duration: 2000,
//     position: "top-center",
// });

// console.log("Product added to cart!");

// };

async function handleAddToCart() {
  setIsLoading(true);
  const token = (session as any)?.accessToken;
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


  return (
  <div>
   <Link href={`/productdetails/${product.id}`}>
    <div className='border rounded-lg p-3'>
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
