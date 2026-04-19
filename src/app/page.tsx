import React from 'react'
import FeaturedProducts from './_components/FeaturedProducts/FeaturedProducts'
import Slider from './_components/Slider/Slider';
// import img1 from '../assets/images/img1.jpg';
import img4 from '../assets/images/img4.png';
import HomeCategories from './_components/HomeCategories/HomeCategories';
import { FaEnvelope, FaLeaf, FaTruck } from "react-icons/fa";
import { FaStar , FaApple, FaGooglePlay } from "react-icons/fa";
import { lazy , Suspense } from 'react';
import Link from 'next/link';

const LazyHomeCategoryComponent = lazy( () => import ("./_components/HomeCategories/HomeCategories"))

export default function Home() {
  return (
   <>
  <Slider heightClass="h-85" listOfImages={[
  { src: img4.src, title: "Fresh Products Delivered to your Door", desc: "Get 20% off your first order"},
  { src: img4.src, title: "Premium Quality Guaranteed", desc: "Fresh from farm to your table"},
  { src: img4.src, title: "Fast & Free Delivery", desc: "Same day delivery available"},
]} />
    
<Suspense
 fallback ={   
  <div className='h-75 bg-white text-black text-2xl font-bold flex justify-center items-center '>Loading...</div>
}>
<LazyHomeCategoryComponent/>
</Suspense>

<div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    
    <div className="relative rounded-2xl p-8 overflow-hidden" style={{background: 'linear-gradient(135deg, #00BC7D, #007A55)'}}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-green-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40" />
      <div className="relative z-10">
        <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
          🔥 Deal of the Day
        </span>
        <h3 className="text-white text-2xl font-bold mb-2">Fresh Organic Fruits</h3>
        <p className="text-green-100 text-sm mb-4">Get up to 40% off on selected organic fruits</p>
        <p className="text-white font-bold text-xl mb-1">40% OFF <span className="text-green-100 text-sm font-normal">Use code: <strong>ORGANIC40</strong></span></p>
        <Link href="/products" className="inline-flex items-center gap-2 mt-4 bg-white text-green-700 font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-green-50 transition-colors">
          Shop Now →
        </Link>
      </div>
    </div>

   
    <div className="relative rounded-2xl p-8 overflow-hidden" style={{background: 'linear-gradient(135deg, #FF8904, #FF2056)'}}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-300 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40" />
      <div className="relative z-10">
        <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
          ✨ New Arrivals
        </span>
        <h3 className="text-white text-2xl font-bold mb-2">Exotic Vegetables</h3>
        <p className="text-orange-100 text-sm mb-4">Discover our latest collection of premium vegetables</p>
        <p className="text-white font-bold text-xl mb-1">25% OFF <span className="text-orange-100 text-sm font-normal">Use code: <strong>FRESH25</strong></span></p>
        <Link href="/products" className="inline-flex items-center gap-2 mt-4 bg-white text-orange-600 font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-orange-50 transition-colors">
          Explore Now →
        </Link>
      </div>
    </div>

  </div>
</div>

    <FeaturedProducts/>
  
   
<div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    
<div className="bg-gray-50 border border-gray-200 border-l-2 border-l-green-200 rounded-3xl p-8 pl-10">
  <div className="flex items-center gap-2 mb-3">
    <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
      <FaEnvelope className="text-white text-sm" />
    </span>
    <div>
      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Newsletter</p>
      <p className="text-xs text-gray-400">10,000+ Subscribers</p>
    </div>
  </div>
  <h3 className="text-2xl font-bold text-gray-900 mb-1">Get the Freshest Updates <span className="text-green-600">Delivered Free</span></h3>
  <p className="text-gray-500 text-sm mb-4">Weekly recipes, seasonal offers & exclusive member perks.</p>

  <div className="flex flex-wrap gap-4 mb-5 text-sm text-gray-600">
    <span className="flex items-center gap-2">
      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center"><FaLeaf className="text-green-600 text-xs" /></span>
      Fresh Picks Weekly
    </span>
    <span className="flex items-center gap-2">
      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center"><FaTruck className="text-green-600 text-xs" /></span>
      Free Delivery Codes
    </span>
    <span className="flex items-center gap-2">
      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center"><FaStar className="text-green-600 text-xs" /></span>
      Members-Only Deals
    </span>
  </div>

  <div className="flex gap-2">
    <input
      type="email"
      placeholder="you@example.com"
      className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm outline-none focus:border-green-500"
    />
    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors">
      Subscribe →
    </button>
  </div>
  <p className="text-xs text-gray-400 mt-2">Unsubscribe anytime. No spam, ever.</p>
</div>

    
    <div className="bg-gray-900 rounded-3xl p-8 flex flex-col justify-between">
      <div>
        <span className="inline-flex items-center gap-1 bg-green-600/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          📱 MOBILE APP
        </span>
        <h3 className="text-white text-2xl font-bold mb-2">Shop Faster on Our App</h3>
        <p className="text-gray-400 text-sm mb-6">Get app-exclusive deals & 15% off your first order.</p>
      </div>

      <div className="flex flex-col gap-3">
        <a href="#" className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl transition-colors">
  <FaApple className="text-2xl" />
  <div>
    <p className="text-xs text-gray-400">DOWNLOAD ON</p>
    <p className="text-sm font-semibold">App Store</p>
     </div>
     </a>
     <a href="#" className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl transition-colors">
     <FaGooglePlay className="text-xl text-green-400" />
  <div>
    <p className="text-xs text-gray-400">GET IT ON</p>
    <p className="text-sm font-semibold">Google Play</p>
    </div>
   </a>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-400 text-sm">★★★★★</span>
          <span className="text-gray-400 text-xs ml-1">4.9 · 100K+ downloads</span>
        </div>
      </div>
    </div>

  </div>
</div>

 </>
 )}
