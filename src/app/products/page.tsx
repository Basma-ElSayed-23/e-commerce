'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductsByCategory , getProductsBySubcategory } from '@/api/services/routemisr.service';
import { ProductType } from '@/api/types/product.type';
import Link from "next/link";
import { useRouter } from 'next/navigation';


export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

 useEffect(() => {
  if (!categoryId && !subcategoryId) return;
  setLoading(true);

  if (subcategoryId) {
    // استخدم الـ subcategory بس
    getProductsBySubcategory(subcategoryId).then((data) => {
      setProducts(data?.data || []);
      setLoading(false);
    });
  } else {
    getProductsByCategory(categoryId!).then((data) => {
      setProducts(data?.data || []);
      setLoading(false);
    });
  }
}, [categoryId, subcategoryId]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

//   return (
//     <div className="min-h-[calc(100vh-180px)] flex flex-col">
//       <h2 className="text-xl font-semibold mb-6">
//         {products.length} Products Found
//       </h2>

//     {products.length === 0 ? (
//   <div className="flex-1 flex flex-col items-center justify-center text-center min-h-[60vh]">
//     <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 640 512">
//         <path d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"/>
//       </svg>
//     </div>
//     <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Found</h3>
//     <p className="text-gray-500 mb-6">No products match your current filters.</p>
    
//       <Link
//   href="/products"
//   className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
// >
//   View All Products
// </Link>
//   </div>
// ) : (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//     {products.map((product) => (
//       <div key={product._id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-emerald-400 transition-all duration-300">
//         <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover rounded-xl mb-4" />
//         <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.title}</h3>
//         <p className="text-emerald-600 font-bold mt-2">{product.price} EGP</p>
//       </div>
//     ))}
//   </div>
// )}
//     </div>
//   );

return (
  <div className="min-h-[calc(100vh-200px)] flex flex-col px-6 py-8">
    
    {/* Active Filters */}
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">Active Filters:</span>
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          Kid's Fashion
          <button className="ml-1 hover:text-emerald-900">×</button>
        </span>
      </div>
      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
        Clear all
      </button>
    </div>

    {/* Showing 0 products */}
    <p className="text-gray-600 mb-12">Showing 0 products</p>

    {/* No Products Found - مطابق للصورة */}
    <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-10 h-10 text-gray-400" 
          fill="currentColor" 
          viewBox="0 0 640 512"
        >
          <path d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"/>
        </svg>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Products Found</h3>
      <p className="text-gray-500 max-w-md mb-10">
        No products match your current filters.
      </p>

      <button
  onClick={() => router.push('/products')}
  className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white px-10 py-3.5 rounded-2xl font-semibold text-base"
>
  View All Products
</button>
    </div>
  </div>
);

}