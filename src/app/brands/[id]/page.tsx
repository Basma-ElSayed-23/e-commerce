'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export default function BrandDetails() {
  const { id } = useParams(); // 👈 ده الـ brand id

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Brand Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-xl p-4">
            <Image
              src={product.imageCover}
              alt={product.title}
              width={200}
              height={200}
              className="object-cover"
            />
            <h2 className="mt-2 font-semibold">{product.title}</h2>
            <p className="text-purple-600">{product.price} EGP</p>
          </div>
        ))}
      </div>
    </div>
  );
}

