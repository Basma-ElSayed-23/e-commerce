// import React from 'react'

// export default function Categories() {
//   return (
//     <div>Categories-page</div>
//   )
// }
import Link from 'next/link';
import { IoLayers } from "react-icons/io5";
import { getAllCategories } from '@/api/services/routemisr.service';

export default async function CategoriesPage() {
  const allCategories = await getAllCategories();


  return (
    <div className="min-h-screen bg-gray-50">
      
        {/* Green Header - مطابق للـ Figma */}
<div className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white py-16">
  <div className="max-w-[1536px] mx-auto px-6">
    
    {/* Breadcrumb */}
    <nav className="flex items-center gap-2 text-sm mb-6">
      <Link href="/" className="hover:underline">Home</Link>
      <span className="text-white/70">/</span>
      <span className="text-white/90">Categories</span>
    </nav>

    {/* All Categories + Layers Icon */}
    <div className="flex items-center gap-5">
      {/* Layers Icon - نفس الشكل في الـ Figma */}
      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
      <IoLayers size={36} className="text-white" />
      </div>

      <div>
        <h1 className="text-4xl font-bold tracking-tight">All Categories</h1>
        <p className="text-lg text-white/90 mt-1">
          Browse our wide range of product categories
        </p>
      </div>
    </div>
  </div>
</div>

{/* الـ Grid بتاع الكاتيجوريز */}
<div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-12">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">   {/* gap = 24px تقريبا */}
    {/* هنا الكروت بتاعتك ... */}
  </div>
</div>

      {/* Categories Grid - بدون أي لون أخضر قبل الهوفر */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {allCategories?.map((category: any) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group block"
            >
              <div className="bg-white border-2 border-transparent hover:border-emerald-500 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 p-5 text-center">
                
                <div className="w-full aspect-square overflow-hidden rounded-2xl mb-5 bg-gray-100">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>

                <h3 className="font-semibold text-lg text-gray-800 hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>

                <p className="text-emerald-600 text-sm mt-2 flex items-center justify-center gap-1 opacity-0 hover:opacity-100 transition-all">
                  View Subcategories 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

    