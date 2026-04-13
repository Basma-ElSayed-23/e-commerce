'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductsByCategory } from '@/api/services/routemisr.service';
import { ProductType } from '@/api/types/product.type';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!categoryId) return;
  setLoading(true);
  getProductsByCategory(categoryId, subcategoryId || undefined).then((data) => {
    setProducts(data?.data || []);
    setLoading(false);
  });
}, [categoryId, subcategoryId]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-[1536px] mx-auto px-6 py-10">
      <h2 className="text-xl font-semibold mb-6">
        {products.length} Products Found
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-emerald-400 transition-all duration-300">
              <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.title}</h3>
              <p className="text-emerald-600 font-bold mt-2">{product.price} EGP</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}