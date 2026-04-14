"use server";

export async function cashOrder(cartId: string, shippingAddress: { city: string; details: string; phone: string }, token: string) {
  if (!token) return { status: "error", message: "please login first!" };

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
      method: "POST",
      headers: { token, "content-type": "application/json" },
      body: JSON.stringify({ shippingAddress }),
    });
    return await res.json();
  } catch {
    return { status: "error", message: "Something went wrong!" };
  }
}

export async function onlinePayment(cartId: string, shippingAddress: { city: string; details: string; phone: string }, token: string) {
  if (!token) return { status: "error", message: "please login first!" };

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}`,
      {
        method: "POST",
        headers: { token, "content-type": "application/json" },
        body: JSON.stringify({ shippingAddress }),
      }
    );
    return await res.json();
  } catch {
    return { status: "error", message: "Something went wrong!" };
  }
}
