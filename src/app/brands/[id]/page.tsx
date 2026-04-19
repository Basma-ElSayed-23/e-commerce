"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Heart, RefreshCw, Eye, Plus, Star, Filter } from 'lucide-react';

interface Brand {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string };
  brand: Brand;
}

export default function BrandDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const brandId = Array.isArray(id) ? id[0] : id;
    fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
      .then(r => r.json())
      .then(data => {
        const prods = data.data || [];
        setProducts(prods);
        if (prods.length > 0) setBrand(prods[0].brand);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="bg-white border-b px-6 py-3">
        <div className="container mx-auto text-sm text-gray-500">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Brands</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{brand?.name}</span>
        </div>
      </div>
      <div className="bg-green-500 py-12 px-6">
        <div className="container mx-auto flex items-center gap-5">
          {brand?.image && (
            <div className="bg-white rounded-xl p-3 w-20 h-20 flex items-center justify-center shadow">
              <Image
                src={brand.image}
                alt={brand.name}
                width={60}
                height={60}
                className="object-contain"/>
            </div>)}
          <div>
            <h1 className="text-white text-4xl font-bold">{brand?.name}</h1>
            <p className="text-white/80 mt-1">Shop {brand?.name} products</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
          <Filter size={15} />
          <span>Active Filters:</span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-1">
            {brand?.name}
            <button className="ml-1 hover:text-purple-900">×</button>
          </span>
          <button className="text-gray-400 underline hover:text-gray-600">Clear all</button>
        </div>
        <p className="text-sm text-gray-400 mb-6">Showing {products.length} products</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:pr-32 xl:pr-52">
          {products.map(product => {
            const discount = product.priceAfterDiscount
              ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
              : 0;
            const displayPrice = product.priceAfterDiscount ?? product.price;

            return (
              <div key={product._id} className="border rounded-xl p-4 bg-white relative group hover:shadow-md transition-shadow">
                {discount > 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">
                    -{discount}%
                  </span>)}

                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                  <button className="bg-white shadow p-1.5 rounded-full hover:text-red-500 transition-colors">
                    <Heart size={15} />
                  </button>
                  <button className="bg-white shadow p-1.5 rounded-full hover:text-green-500 transition-colors">
                    <RefreshCw size={15} />
                  </button>
                  <button className="bg-white shadow p-1.5 rounded-full hover:text-blue-500 transition-colors">
                    <Eye size={15} />
                  </button>
                </div>

                <div className="flex items-center justify-center h-48 mb-3">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={180}
                    height={180}
                    className="object-contain max-h-44"/>
                </div>
                <p className="text-xs text-gray-400 mb-1">{product.category?.name}</p>

                <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                  {product.title}
                </h2>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={13}
                      className={
                        star <= Math.round(product.ratingsAverage)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 fill-gray-200'
                      }/>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">
                    {product.ratingsAverage} ({product.ratingsQuantity})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-900">{displayPrice} EGP</span>
                    {product.priceAfterDiscount && (
                      <span className="text-gray-400 line-through text-xs ml-2">
                        {product.price} EGP
                      </span>
                    )}
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


