"use client"
import React from 'react'
import { Button } from '@base-ui/react';
import { addToCart } from '@/actions/cart.action';
import toast from 'react-hot-toast';

export default function AddBtn({classes, word , id }: {classes: string; word: string; id: string}) {

 async function AddProduct(){
 console.log("add");


 const res = await addToCart(id);
 if (res.status === "success") {
  toast.success(res.message , {position: "top-right" , duration: 2000});
 } else {
  toast.error(res.message , {position: "top-right" , duration: 2000});
 }
  }

  return (
    <>
    <Button onClick={(e) => {e.preventDefault(); AddProduct();}} className={classes} >{word}</Button>
    </>
  );
}

//className='size-10 w-full rounded-lg bg-[#16A34A] text-white text-sm cursor-pointer p-4 my-4 font-bold '