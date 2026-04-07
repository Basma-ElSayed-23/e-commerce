
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import {Inter} from "next/font/google";
import "./globals.css";
import FirstNav from "./_components/FirstNav/FirstNav";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
// import Providers from "./_components/Providers";
import Providers from "./Providers/Providers";
import { Metadata } from "next";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],

});

 export const metadata: Metadata = {
   title: "Fresh Cart",
  description: "E-Commerce App",
 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <meta/>
      </head> */}
      <body
        className={`${inter.variable} font-(family-name:--font-inter) antialiased`}
      >
      <Providers>
        {/* <FirstNav/> */}
        <Navbar/>
        {children}
        <Toaster/>
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}

