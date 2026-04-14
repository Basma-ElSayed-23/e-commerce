'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ecommerce.routemisr.com/api/v1/brands')
      .then(res => res.json())
      .then(data => {
        setBrands(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-2xl">جاري تحميل البرندات...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Brands</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col items-center p-6"
          >
            <div className="relative w-32 h-32 mb-5 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden">
              <Image
                src={brand.image}
                alt={brand.name}
                width={110}
                height={110}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-800 text-center">{brand.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}