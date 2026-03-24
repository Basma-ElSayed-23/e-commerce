import React from 'react'
import { getAllProducts } from '@/api/services/routemisr.service';
import ProductCard from '../ProductCard/productCard';
import Link from 'next/link';

export default async function FeaturedProducts() {


  const allProducts = await getAllProducts();
   console.log("data", allProducts);

  return (  
    <>
    <div className='w-full max-w-[1536px] mx-auto py-8 px-4 '>
    <h1 className='text-3xl font-bold w-[90%] mx-auto border-s-8 border-[#16A34A] ps-2 mb-6 text-gray-800'>Featured <span className=' text-emerald-600'>Products</span> </h1>
  <div className='w-full max-w-[1536px] mx-auto py-8 px-4 flex flex-wrap gap-6'>
{allProducts?.map((product) => (
  <Link
   href={`/productdetails/${product.id}`} key={product.id} className='w-full sm:w-1/2 lg:w-1/4 xl:w-1/5'>
    <ProductCard product={product}/>
    </Link>
))}
  </div>
  </div>
  </>
  );
}


