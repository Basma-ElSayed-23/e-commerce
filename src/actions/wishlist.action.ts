"use server";

const BASE = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function getWishlist(token: string) {
    if (!token) return { data: [] };
  const res = await fetch(BASE, {
    headers: { token },
    cache: "no-store",
  });
  return res.json();
}

export async function addToWishlist(productId: string, token: string) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function removeFromWishlist(productId: string, token: string) {
  const res = await fetch(`${BASE}/${productId}`, {
    method: "DELETE",
    headers: { token },
  });
  return res.json();
}