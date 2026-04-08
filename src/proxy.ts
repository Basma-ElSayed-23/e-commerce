import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function proxy (request:NextRequest) {

const protectedRoutes = ["/cart" , "/wishlist" , "/checkout" , "/allOrders" , "/profile"]
const authRoutes= ["/login" , "/register"]

// console.log("request", request.nextUrl.pathname);
const myPath = request.nextUrl.pathname;

const myToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
})



const token = myToken?.accessToken;


if(!token && protectedRoutes.some((path) => myPath.startsWith(path) )) {
    return NextResponse.redirect(new URL("/login", request.url));
}
    
 if(token && authRoutes.some((path) => myPath.startsWith(path) )) {
      return NextResponse.redirect(new URL("/", request.url));
 }
 return NextResponse.next();
}

export const config = {
    matcher: ["/cart/:path*" , "/wishlist/:path*" , "/checkout/:path*" , "/allOrders/:path*" , "/profile/:path*", "/login" , "/register"],
};