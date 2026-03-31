// import React from 'react'

// export default function Login() {
//   return (
//     <div>Login-page</div>
//   )
// }

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import loginImg from '@/assets/images/login.png';
import toast from "react-hot-toast";
import { LoginSchema , LoginType } from "@/schemas/authSchemas.schemas";
import { ZodObject, ZodEmail, ZodString } from "zod";
import { $strip } from "zod/v4/core";
import { UserLogin } from "@/actions/auth.action";
import {useForm} from "react-hook-form"
 import {zodResolver} from "@hookform/resolvers/zod"


export default function Login() {
const router = useRouter();

const form = useForm<LoginType>({
  defaultValues: {
    email: "",
    password: "",
  },
  resolver: zodResolver(LoginSchema),
 });
 
 const {handleSubmit, control} = form;

 async function mySubmit(data : LoginType) {
  console.log("data" , data);

const result = await UserLogin(data)

  if (result) {
    toast.success("welcome back ✅", {
      duration: 3000,
      position:"top-center",
    });
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }
 }  
 
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();

  function handleLogin() {
  if (!email || !password) {
    toast.error("من فضلك املئي البيانات ❌");
    return;
  }

  // حفظ البيانات
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userName", email);

  toast.success("تم تسجيل الدخول بنجاح 🎉");

  setTimeout(() => {
    router.push("/");
    router.refresh();
  }, 1000);
}
  return (
    <div className="bg-[#f5f7f9] min-h-screen flex items-center justify-center px-4">

      {/* Container */}
      <div className="max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col items-center text-center">
          <Image src={loginImg} alt="login" className='w-[350px] mb-6' />

          <h2 className="text-[20px] font-semibold mb-2">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>

          <p className="text-gray-500 text-sm mb-6 max-w-[400px]">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs.
          </p>

          <div className="flex gap-6 text-sm text-gray-600">
            <span>Free Delivery</span>
            <span>Secure Payment</span>
            <span>24/7 Support</span>
          </div>
        </div>

        {/* RIGHT SIDE (CARD) */}
        <div className="mx-auto w-full max-w-[616px] bg-white rounded-[16px] p-8 custom-shadow">

          <h2 className="text-[22px] font-bold text-green-600 text-center">
            FreshCart
          </h2>

          <h3 className="text-[16px] font-semibold text-center mb-6">
            Welcome Back!
          </h3>

          {/* Social Buttons */}
          <button className="w-full border rounded-lg py-2 mb-3 flex items-center justify-center gap-2 hover:bg-gray-50">
            Continue with Google
          </button>

          <button className="w-full border rounded-lg py-2 mb-4 flex items-center justify-center gap-2 hover:bg-gray-50">
            Continue with Facebook
          </button>

          <p className="text-center text-gray-400 text-sm mb-4">
            OR CONTINUE WITH EMAIL
          </p>

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Password */}
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 pr-10"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 cursor-pointer text-gray-400"
            >
              👁️
            </span>
          </div>

          {/* Options */}
          <div className="flex justify-between items-center text-sm mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Keep me signed in
            </label>

            <a href="#" className="text-green-600">
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Sign In
          </button>

          {/* Footer */}
          <p className="text-center text-sm mt-4">
            New to FreshCart?
            <a href="#" className="text-green-600 font-medium ml-1">
              Create an account
            </a>
          </p>
        </div>
      </div>

      {/* Shadow Style */}
      <style>
        {`
          .custom-shadow {
            box-shadow: 0px 8px 10px rgba(0,0,0,0.10),
                        0px 20px 25px rgba(0,0,0,0.10);
          }
        `}
      </style>
    </div>
  );
}

// function zodResolver(LoginSchema: ZodObject<{ email: ZodEmail; password: ZodString; }, $strip>) {
//   throw new Error("Function not implemented.");
// }
