"use client";

import React, { useState } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import loginImg from '@/assets/images/login.png';
import toast from "react-hot-toast";
import { LoginSchema , LoginType } from "@/schemas/authSchemas.schemas";
import { UserLogin } from "@/actions/auth.action";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";


export default function Login() {
const router = useRouter();
const form = useForm<LoginType>({
  defaultValues: {
    email: "",
    password: "",
  },
  resolver: zodResolver(LoginSchema),
 });
 
//  const {handleSubmit, control} = form;
const {handleSubmit, register , formState: {errors, isSubmitting}} = form;

 async function mySubmit(data : LoginType) {
  // console.log("data" , data);
  // console.log("email:", data.email, "password:", data.password);

const response = await signIn("credentials", {...data , redirect: false, callbackUrl: "/"})

  if (response?.ok) {
    toast.success("welcome back ✅", {
      duration: 3000,
      position:"top-center",
    });
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }else{
    toast.error(response?.error || "Login failed", {
      duration: 3000,
      position:"top-center",
    });
  }
 }  
 
  const [showPassword, setShowPassword] = useState(false);
  
 return (
  <div className="bg-[#f5f7f9] min-h-screen flex flex-col">
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        <div className="hidden lg:flex flex-col items-center text-center">
          <Image src={loginImg} alt="login" className='w-154 h-96 rounded-2xl object-cover mb-6 [box-shadow:0px_4px_6px_-4px_rgba(0,0,0,0.10),0px_10px_15px_-3px_rgba(0,0,0,0.10)]' />
          <h2 className="text-[28px] font-bold mb-2">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-gray-500 text-sm mb-6 max-w-100">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>Free Delivery</span>
            <span>Secure Payment</span>
            <span>24/7 Support</span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-154 bg-white rounded-[16px] p-8 custom-shadow">

          <h2 className="text-[22px] font-bold text-green-600 text-center">
            FreshCart
          </h2>
          <h3 className="text-[16px] font-semibold text-center mb-6">
            Welcome Back!
          </h3>
          <button onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full border border-gray-200 rounded-xl py-2.5 mb-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm font-medium text-gray-700">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
          <button className="w-full border border-gray-200 rounded-xl py-2.5 mb-5 flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm font-medium text-gray-700">
            <FaFacebook className="text-xl text-blue-600" />
            Continue with Facebook
          </button>

          <p className="text-center text-gray-400 text-sm mb-4">
            OR CONTINUE WITH EMAIL
          </p>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"/>
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Link href="/forgetpassword" className="text-green-600 text-xs hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"/>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2 mb-5">
            <input type="checkbox" id="keepSignedIn" className="w-4 h-4 accent-green-600 rounded" />
            <label htmlFor="keepSignedIn" className="text-sm text-gray-600">Keep me signed in</label>
          </div>
          <button
            onClick={handleSubmit(mySubmit)}
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-center text-sm mt-4">
            New to FreshCart?
            <a href="/register" className="text-green-600 font-medium ml-1">
              Create an account
            </a>
          </p>
        </div>

      </div>
    </div>
    <style>
      {`.custom-shadow {
          box-shadow: 0px 8px 10px rgba(0,0,0,0.10),
                      0px 20px 25px rgba(0,0,0,0.10);}
      `}
    </style>
  </div>
);
}