// import NextAuth from "next-auth"

// declare module "next-auth" {
 

// interface User {
//     id: string;
//     email: string;
//     name: string;
//     accessToken: string;
// }




//     interface Session {
//         user: {
//             id: string;
//             email: string;
//             name: string;
//         };
//     }
//   }


//   declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     /** OpenID ID Token */
//     routeToken?: string;
//     idToken?: string
//   }
// }

import NextAuth from "next-auth";

declare module "next-auth" {

  interface User {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      accessToken?: string;
    };
    accessToken?: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}