"use client";

import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";
import { FaTruck, FaUndo, FaShieldAlt, FaHeadset } from "react-icons/fa";
export default function Footer() {
  return (
    <>
<div className="w-full border-y border-green-100 bg-green-50 py-6 px-4 lg:px-52">
  <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

    <div className="flex items-center gap-3">
      <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
        <FaTruck className="text-green-600 text-lg" />
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-800">Free Shipping</p>
        <p className="text-xs text-gray-500">On orders over 500 EGP</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
        <FaUndo className="text-green-600 text-lg" />
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-800">Easy Returns</p>
        <p className="text-xs text-gray-500">14-day return policy</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
        <FaShieldAlt className="text-green-600 text-lg" />
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-800">Secure Payment</p>
        <p className="text-xs text-gray-500">100% secure checkout</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
        <FaHeadset className="text-green-600 text-lg" />
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-800">24/7 Support</p>
        <p className="text-xs text-gray-500">Contact us anytime</p>
      </div>
    </div>

  </div>
</div>
    <footer className="w-full bg-[#101828] pt-12 pb-0">
      <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-52">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-700">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 w-fit">
              <TiShoppingCart className="text-2xl text-green-600" />
              <span className="text-lg font-bold text-gray-900">FreshCart</span>
            </div>
            <p className="text-[14px] leading-6 text-gray-400 max-w-xs">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="tel:+18001234567" className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-green-400 transition-colors">
                <FaPhone className="text-green-500 text-sm" />
                +1 (800) 123-4567
              </Link>
              <Link href="mailto:support@freshcart.com" className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-green-400 transition-colors">
                <FaEnvelope className="text-green-500 text-sm" />
                support@freshcart.com
              </Link>
              <span className="flex items-center gap-2 text-[14px] text-gray-400">
                <FaMapMarkerAlt className="text-green-500 text-sm" />
                123 Commerce Street, New York, NY 10001
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              {[
                { icon: <FaFacebookF />, href: "https://facebook.com" },
                { icon: <FaTwitter />, href: "https://twitter.com" },
                { icon: <FaInstagram />, href: "https://instagram.com" },
                { icon: <FaYoutube />, href: "https://youtube.com" },
              ].map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  target="_blank"
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-green-600 flex items-center justify-center text-gray-300 hover:text-white text-sm transition-all">
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-[16px] mb-1">Shop</h4>
            {[
              { label: "All Products", href: "/shop" },
              { label: "Categories", href: "/categories" },
              { label: "Brands", href: "/brands" },
              { label: "Electronics", href: "/categories/electronics" },
              { label: "Men's Fashion", href: "/categories/mens-fashion" },
              { label: "Women's Fashion", href: "/categories/womens-fashion" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="text-[14px] text-gray-400 hover:text-green-400 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-[16px] mb-1">Account</h4>
            {[
              { label: "My Account", href: "/account" },
              { label: "Order History", href: "/orders" },
              { label: "Wishlist", href: "/wishlist" },
              { label: "Shopping Cart", href: "/cart" },
              { label: "Sign In", href: "/signin" },
              { label: "Create Account", href: "/register" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="text-[14px] text-gray-400 hover:text-green-400 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            {/* Support */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-semibold text-[16px] mb-1">Support</h4>
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "Help Center", href: "/help" },
                { label: "Shipping Info", href: "/shipping" },
                { label: "Returns & Refunds", href: "/returns" },
                { label: "Track Order", href: "/track" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="text-[14px] text-gray-400 hover:text-green-400 transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>

            
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-semibold text-[16px] mb-1">Legal</h4>
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="text-[14px] text-gray-400 hover:text-green-400 transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>  
        <div className="flex flex-col sm:flex-row items-center justify-between py-5 gap-3">
          <p className="text-[14px] text-gray-500">© 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1.5 text-[13px]">
              <SiVisa className="text-2xl text-blue-400" />
              <span>Visa</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px]">
              <SiMastercard className="text-2xl text-red-400" />
              <span>Mastercard</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px]">
              <SiPaypal className="text-2xl text-blue-500" />
              <span>PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}