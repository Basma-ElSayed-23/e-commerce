// import { DefaultSession, NextAuthOptions } from "next-auth";
// import credentials from "next-auth/providers/credentials";
// import { jwtDecode } from "jwt-decode";

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     user: DefaultSession["user"] & {
//       id?: string;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     routeToken?: string;
//      accessToken?: string;
//   }
// }



// export const authOptions : NextAuthOptions = {
// providers: [
//     credentials({
//         name: "myLogin",

//         credentials: {
//             email:{label: "email", type:"email", placeholder:"example@example.com"},
//             password: {label: "password", type:"password", placeholder:"********"},
//         },
//     async authorize(credentials , req){

//        try{
//               const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, 
//         {   
//             method: "POST",
//             body: JSON.stringify({
//                 email: credentials?.email,
//                 password: credentials?.password,
//             }),
//             headers: {
//                 "content-type": "application/json",
//             },
//         },
//     );

//     const result = await res.json();
//     console.log("result of login",result);


// if (!res.ok){
// throw new Error(result.message || "invalid login");

// }

// const jwt :{id : string}= jwtDecode(result.token)
// // console.log("jwt-decode" , jwt)

// return{
// id: jwt.id,
// name : result.user.name,
// email : result.user.email,
// accessToken: result.token

// }

//        }
//        catch (err){
//        console.log("error from api" , err)
//        throw new Error((err as Error).message)
//     //    return null;
//        }
//         },
//     }),
// ],

// callbacks:{
// jwt(param) {
// console.log("jwt param...",param)


// if (param.user){
//   const user = param.user as { accessToken?: string; id?: string };
//   param.token.accessToken = user.accessToken;
//   param.token.id = user.id;
// }

// return param.token
// },

// session({token, session}) {
//   if (session.user) {
//     session.user.id = token.id as string;
//   }
//   session.accessToken = token.accessToken as string; 
//   return session
// }
// },


// pages:{
// signIn: "/login"
// },
// };


import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User, NextAuthOptions } from "next-auth"; 

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok && data.token) {
          return {
            ...data.user,
            token: data.token,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};