'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {getAllProducts, getProductsByCategory , getProductsBySubcategory } from '@/api/services/routemisr.service';
import { ProductType } from '@/api/types/product.type';
import Link from "next/link";
import ProductCard from '../_components/ProductCard/productCard';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');
  const filterLabel = searchParams.get('label') || 'Filter';

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  

 useEffect(() => {
  setLoading(true);

  if (subcategoryId) {
    getProductsBySubcategory(subcategoryId).then((data) => {
      setProducts(data?.data || []);
      setLoading(false);
    });
  } else if (categoryId) {
    getProductsByCategory(categoryId).then((data) => {
      setProducts(data?.data || []);
      setLoading(false);
    });
  } else {
    getAllProducts().then((data) => {
      setProducts(data || []);
      setLoading(false);
    });
  }
}, [categoryId, subcategoryId]);

  // if (loading) return <div className="min-h-[calc(100vh-200px)] flex flex-col px-6 py-8 items-center justify-center text-lg">Loading...</div>;

 if (loading) return (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-4xl font-bold text-black">Loading...</p>
  </div>
);


return (
  <div className="min-h-[calc(100vh-200px)] flex flex-col px-6 py-8">

    {(categoryId || subcategoryId) && (
      <div className="flex items-center gap-3 mb-6">
        <span className="text-gray-600 text-sm">Active Filters:</span>
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
        {filterLabel}
          <button onClick={() => window.location.href = '/products'} className="ml-1 hover:text-emerald-900 font-bold">×</button>
        </span>
        <button onClick={() => window.location.href = '/products'} className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          Clear all
        </button>
      </div>
    )}

    <p className="text-gray-600 mb-10">Showing {products.length} products</p>

    {products.length === 0 ? (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 640 512">
            <path d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"/>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Products Found</h3>
        <p className="text-gray-500 mb-8">No products match your current filters.</p>
        <button
          onClick={() => window.location.href = '/products'}
          style={{ backgroundColor: '#16a34a', color: 'white', fontWeight: '600', padding: '14px 40px', borderRadius: '16px', border: 'none', cursor: 'pointer', fontSize: '16px' }}
        >
          View All Products
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    )}

  </div>
);


}