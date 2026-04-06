"use client"

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


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],

});

// export const metadata: Metadata = {
//   title: "Fresh Cart",
//   description: "E-Commerce App",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta/>
      </head>
      <body
        className={`${inter.variable} font-(family-name:--font-inter) antialiased`}
      >
      <SessionProvider>
        {/* <FirstNav/> */}
        <Navbar/>
        {children}
        <Toaster/>
        <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}

