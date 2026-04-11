// "use server";

// import { cookies } from "next/headers";
// import { decode } from "next-auth/jwt";
// import { getMyToken } from "@/utilities";


// export async function addToCart(productId: string) {
// const token = await getMyToken();

// if (!token) {
//     // throw new Error("please login first !");
//     return { status: "error", message: "please login first !" };
// }

//  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
//     method: 'POST',
//     headers: {
//         token: token as string,
//       "content-type": 'application/json',
//     },
//     body: JSON.stringify({ productId: productId }),
//   });

//   const data = await res.json();
//   return data;
// }

// export async function getLoggedUserCart() {
// const token = await getMyToken();

// if (!token) {
//     // throw new Error("please login first !");
//     return { status: "error", message: "please login first !" };
// }
                         
//  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
//     method: 'GET',
//     headers: {
//         token: token as string,
//       "content-type": 'application/json',
//     },
//   });

//   const data = await res.json();
//   return data;
// }

// export async function removeFromCart(productId: string) {
//   const token = await getMyToken();
//   if (!token) return { status: "error", message: "please login first!" };

//   const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
//     method: 'DELETE',
//     headers: { token: token as string },
//   });
//   return await res.json();
// }

// export async function updateCartQuantity(productId: string, count: number) {
//   const token = await getMyToken();
//   if (!token) return { status: "error", message: "please login first!" };

//   const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
//     method: 'PUT',
//     headers: { token: token as string, "content-type": "application/json" },
//     body: JSON.stringify({ count }),
//   });
//   return await res.json();
// }



"use server";

import { revalidatePath } from "next/cache";

export async function addToCart(productId: string, token: string) {
  if (!token) {
    return { status: "error", message: "please login first!" };
  }

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: "POST",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();
    revalidatePath("/cart");
    return data;
  } catch (error) {
    return { status: "error", message: "Something went wrong, please try again!" };
  }
}

export async function getLoggedUserCart(token: string) {
  if (!token) {
    return { status: "error", message: "please login first!" };
  }

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: "GET",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return { status: "error", message: "Something went wrong, please try again!" };
  }
}

export async function removeFromCart(productId: string, token: string) {
  if (!token) return { status: "error", message: "please login first!" };

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
      method: "DELETE",
      headers: { token: token },
    });
    const data = await res.json();
    revalidatePath("/cart");
    return data;
  } catch (error) {
    return { status: "error", message: "Something went wrong, please try again!" };
  }
}

export async function updateCartQuantity(productId: string, count: number, token: string) {
  if (!token) return { status: "error", message: "please login first!" };

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
      method: "PUT",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({ count }),
    });
    const data = await res.json();
    revalidatePath("/cart");
    return data;
  } catch (error) {
    return { status: "error", message: "Something went wrong, please try again!" };
  }
}