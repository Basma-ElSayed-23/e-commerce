"use client"

import React, { useState } from 'react'
import { addToCart } from '@/actions/cart.action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


export default function AddBtn({classes, word, id}: {classes: string; word: string; id: string}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function AddProduct() {
    console.log("add");
    setIsLoading(true); 
    const token = (session as any)?.accessToken; 
    
    if (!token) {
      toast.error("please login first!", {position: "top-right", duration: 2000});
      return;
    }

    const res = await addToCart(id, token); 
    
    if (res.status === "success") {
      toast.success(res.message, {position: "top-right", duration: 2000});
      window.dispatchEvent(new CustomEvent("cartUpdated"))
      setTimeout(() => router.push('/cart'), 2000);
    } else {
      toast.error(res.message, {position: "top-right", duration: 2000});
    }
    setIsLoading(false);
  }

  return ( 
    <button onClick={(e) => {e.preventDefault(); AddProduct();}}  disabled={isLoading}
     className={classes}> {isLoading ? ( 
        <svg className="animate-spin w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      ) : word}
      {word}
    </button>
  );
}