// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth/next";

// export async function getMyToken(){
    
// const cookie = await cookies();
// const myToken = cookie.get("next-auth.session-token")?.value;

// console.log("SECRET:", process.env.NEXTAUTH_SECRET); // أضيفي السطر ده
// console.log("myToken:", myToken);


// const decodedToken = await decode({token: myToken, secret: process.env.NEXTAUTH_SECRET!});
// console.log("decoded token", decodedToken);

// // if (!decodedToken) {
// // 	throw new Error("Failed to decode token");
// // }
// const token = (session as any)?.accessToken || (session?.user as any)?.token;
// // const token = decodedToken.accessToken;


// return token;
// }

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/next-auth/authOptions";
import { NextAuthOptions } from "next-auth";

export async function getMyToken() {
  const session = await getServerSession(authOptions as NextAuthOptions);
  console.log("SESSION:", session);
  console.log("TOKEN:", session?.accessToken);
  return session?.accessToken ?? null;
}

//secret: process.env.NEXTAUTH_SECRET!

