"use client"
import React from 'react'
import { Button } from '@base-ui/react';
import { addToCart } from '@/actions/cart.action';

export default function AddBtn() {

  function AddProduct(){
 console.log("add");
 addToCart("")
  }

  return (
    <>
    <Button onClick={(e) => {e.preventDefault(); AddProduct();}} className='size-10 w-full rounded-lg bg-[#16A34A] text-white text-sm cursor-pointer p-4 my-4 font-bold '>Add to Cart</Button>
    </>
  )
}
