import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken(){
    
const cookie = await cookies();
const myToken = cookie.get("next-auth.session-token")?.value;
const decodedToken = await decode({token: myToken, secret: process.env.NEXTAUTH_SECRET!})
console.log("decoded token", decodedToken);

const token = decodedToken?.token;


return token;
}