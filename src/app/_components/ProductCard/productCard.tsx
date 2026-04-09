"use client"

import { Button } from '@base-ui/react';
import React from 'react' 
import { FaStar } from "react-icons/fa";  
import { ProductType } from '@/api/types/product.type';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ProductCard({product} : {product : ProductType}) {



const handleAddToCart = () => {
  toast.success("Product added to cart!" , { 
    duration: 2000,
    position: "top-center",
});

console.log("Product added to cart!");

};




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
<Button onClick={handleAddToCart} id={product.id} className='size-10 rounded-full bg-[#16A34A] text-white cursor-pointer text-xl font-bold'>+</Button>
    </div>
    </div>
    </Link>
   </div>
    )
  }
