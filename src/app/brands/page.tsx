"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTags } from "react-icons/fa";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { 
    fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setBrands(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('sorry, there was an error loading the brands. Please try again later.');
        setLoading(false);
      });
  }, []);

  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-lg">Loading brands...</p>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="text-6xl">😕</div>
        <h2 className="text-xl font-semibold text-gray-700">{error}</h2>
        <button
          onClick={() => { setError(null); setLoading(true); }}
          className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
        >
        try again
        </button>
      </div>
    );
  }
  if (brands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <div className="text-6xl">📦</div>
        <p className="text-gray-500 text-lg">No brands available at the moment</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 pt-8 pb-12">
        <div className="container mx-auto px-6">
          <nav className="flex items-center text-white/80 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Brands</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
      <FaTags className="text-white text-3xl" />
         </div>
            <div>
              <h1 className="text-white text-5xl font-bold tracking-tight">Top Brands</h1>
              <p className="text-white/90 mt-2 text-lg">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group bg-white rounded-3xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 overflow-hidden relative h-55 flex flex-col items-center justify-center p-6">
              <div className="relative w-28 h-28 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="112px"
                  className="object-contain"/>
              </div>
              <div className="absolute bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <p className="text-purple-600 font-semibold text-lg mb-1">{brand.name}</p>
                <p className="text-purple-500 text-sm flex items-center justify-center gap-1">
                  View Products <span>→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}