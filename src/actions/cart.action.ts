"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { getMyToken } from "@/utilities";


export async function addToCart(productId: string) {
const token = await getMyToken();

if (!token) {
    throw new Error("please login first !");
}

 const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: 'POST',
    headers: {
        token: token as string,
      "content-type": 'application/json',
    },
    body: JSON.stringify({ productId: productId }),
  });

  const data = await res.json();
  return data;
}