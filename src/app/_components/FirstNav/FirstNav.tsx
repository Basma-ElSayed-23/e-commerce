import React from 'react'
import { FaTruck } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import  Link  from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';

export default function FirstNav() {
  const { data: session } = useSession();
  return <>
  
  <div className="hidden w-full border-b  border-gray-100  justify-between xl:flex p-1">
      <div className="flex items-center justify-between px-3 w-full h-10.25 ">
        <div className="flex items-center gap-10 justify-between">
          <span className="flex items-center gap-1.5 text-[14px] font-medium leading-5 text-[#6a7282]">
            <FaTruck fill='#16A34A' />Free Shipping on Orders 500 EGP
          </span>

          <span className="flex items-center gap-1.5 text-[14px] font-medium leading-5 text-[#6a7282]">
            <FaGift fill='#16A34A' /> New Arrivals Daily
          </span>
        </div>
        <div className="flex items-center gap-6 text-[14px] font-medium leading-5 text-[#6a7282]">
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-green-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 12V5z"/>
            </svg>
            +1 (800) 123-4567
          </span>

          <span className="flex items-center gap-1.5 cursor-pointer hover:text-green-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            support@freshcart.com
          </span>

          {session ? (
  <div className="flex items-center gap-3">
    <span className="flex items-center gap-1 text-green-700 font-semibold">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
      {session.user?.name}
    </span>
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </button>
  </div>
) : (
  
  <div className="flex items-center gap-3">
    <span className="flex items-center gap-1 cursor-pointer hover:text-green-600 transition-colors">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
      <Link href='/login'>Sign In</Link>
    </span>
    <span className="flex items-center gap-1 cursor-pointer hover:text-green-600 transition-colors">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
      </svg>
      <Link href='/register'>Sign Up</Link>
    </span>
  </div>)}
        </div>

      </div>
    </div>
  
  </>
    
}
