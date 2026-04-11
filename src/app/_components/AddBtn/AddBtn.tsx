// "use client"
// import React from 'react'
// import { Button } from '@base-ui/react';
// import { addToCart } from '@/actions/cart.action';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// export default function AddBtn({classes, word , id }: {classes: string; word: string; id: string}) {
//  const router = useRouter();

//  async function AddProduct(){
//  console.log("add");


//  const res = await addToCart(id);
//  if (res.status === "success") {
//   toast.success(res.message , {position: "top-right" , duration: 2000});
//   setTimeout(() => {
//         router.push('/cart');
//       }, 2000);
//  } else {
//   toast.error(res.message , {position: "top-right" , duration: 2000});
//  }
//   }

//   return (
//     <>
//     <Button onClick={(e) => {e.preventDefault(); AddProduct();}} className={classes} >{word}</Button>
//     </>
//   );
// }

//className='size-10 w-full rounded-lg bg-[#16A34A] text-white text-sm cursor-pointer p-4 my-4 font-bold '

"use client"
import React from 'react'
import { addToCart } from '@/actions/cart.action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // ✅

export default function AddBtn({classes, word, id}: {classes: string; word: string; id: string}) {
  const router = useRouter();
  const { data: session } = useSession(); // ✅

  async function AddProduct() {
    console.log("add");
    
    const token = (session as any)?.accessToken; // ✅ جيبي التوكن من الكلاينت
    
    if (!token) {
      toast.error("please login first!", {position: "top-right", duration: 2000});
      return;
    }

    const res = await addToCart(id, token); // ✅ ابعتي التوكن
    
    if (res.status === "success") {
      toast.success(res.message, {position: "top-right", duration: 2000});
      setTimeout(() => router.push('/cart'), 2000);
    } else {
      toast.error(res.message, {position: "top-right", duration: 2000});
    }
  }

  return (
    <button onClick={(e) => {e.preventDefault(); AddProduct();}} className={classes}>
      {word}
    </button>
  );
}