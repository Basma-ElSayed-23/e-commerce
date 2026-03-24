import React from 'react'
import { FaStar } from "react-icons/fa";  
import { ProductType } from '@/api/types/product.type';
import AddBtn from '@/app/_components/AddBtn/AddBtn';
import { getSingleProduct } from '@/api/services/routemisr.service';


//https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b

export default async function productDetails(props :{params : Promise<{id : string}>}) {

const params = await props.params
const id = params.id



const myProduct = await getSingleProduct(id)

  return (
    <>
    <div className='w-[70%] mx-auto flex'>
      <div className='w-1/4 p-3'>
      <img src={myProduct?.imageCover} alt={myProduct?.title} className='flex items-center justify-center' />
      <div className='flex'>
        {myProduct?.images.map((src) => <div key={src} className='w-1/3 my-2 me-1 ms-1'>
          <img src={src} alt={src} />
          </div> )} 
      </div>
      </div>
      
      <div className='w-3/4 p-3'>
      <h2 className='text-2xl font-bold'>{myProduct?.title}</h2>
      <h3 className='my-5 font-bold'>{myProduct?.description}</h3>
      <div className='flex gap-2 items-center'>
        <span>Price:</span>
 <span className='text-[#16A34A] font-bold text-lg'>{myProduct?.priceAfterDiscount}</span>
  <span className='text-sm text-slate-600 line-through'>{myProduct?.price}</span>
  </div>
  <div className='rate flex items-center gap-2'><FaStar className='text-yellow-300' /> <FaStar className='text-yellow-300' /> 
      <FaStar className='text-yellow-300' /> <FaStar className='text-yellow-300' /> <FaStar />
      {myProduct?.ratingAverage}
      {`(${myProduct?.ratingsQuantity})`} reviews
  </div>
 <AddBtn/>
      </div>
      </div>
      
    </>
    
  )
}

































// import React from 'react';
// import { FaStar } from 'react-icons/fa';
// import Image from 'next/image';

// interface Product {
//   id: string;
//   title: string;
//   description?: string;
//   price: number;
//   priceAfterDiscount?: number;
//   imageCover: string;
//   images: string[];
//   ratingAverage?: number;          // غيّرناه لـ optional
//   ratingsQuantity?: number;        // غيّرناه لـ optional
//   brand?: { name: string };
//   category?: { name: string };
//   // أضف باقي الحقول حسب الـ API
// }

// async function getSingleProduct(id: string): Promise<Product | undefined> {
//   try {
//     const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
//       next: { revalidate: 3600 }, // cache لمدة ساعة
//     });
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     const { data } = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch product:", error);
//     return undefined;
//   }
// }

// export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const product = await getSingleProduct(id);

//   if (!product) {
//     return <div className="text-center py-32 text-3xl">المنتج غير موجود 😔</div>;
//   }

//   const finalPrice = product.priceAfterDiscount ?? product.price;
//   const hasDiscount = product.priceAfterDiscount != null && product.priceAfterDiscount < product.price;

//   // معالجة التقييم بشكل آمن
//   const ratingAvg = product.ratingAverage ?? 0;
//   const ratingsCount = product.ratingsQuantity ?? 0;
//   const displayRating = ratingAvg > 0 ? ratingAvg.toFixed(1) : "—";

//   return (
//     <div className="bg-gray-50 min-h-screen py-10">
//       <div className="mx-auto max-w-[1504px] px-6 md:px-10 lg:px-12">
//         <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          
//           {/* اليسار - الصور */}
//           <div className="w-full lg:w-[45%] space-y-6">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//               <div className="relative aspect-[4/4] md:aspect-[5/5]">
//                 <Image
//                   src={product.imageCover}
//                   alt={product.title}
//                   fill
//                   className="object-contain p-8 sm:p-12"
//                   priority
//                 />
//               </div>
//             </div>

//             {product.images?.length > 0 && (
//               <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-300">
//                 {product.images.map((img, i) => (
//                   <div
//                     key={i}
//                     className="min-w-[110px] w-1/4 sm:w-[18%] aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex-shrink-0 hover:border-green-500 transition"
//                   >
//                     <Image
//                       src={img}
//                       alt={`صورة ${i + 1} لـ ${product.title}`}
//                       width={140}
//                       height={140}
//                       className="object-contain p-3 hover:scale-105 transition-transform"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* اليمين - التفاصيل */}
//           <div className="w-full lg:w-[55%] space-y-7 pt-2">
//             <div className="text-sm text-gray-500 flex items-center gap-2">
//               Home • Shop • {product.category?.name || 'Women’s Fashion'} • {product.title}
//             </div>

//             <h1 className="text-4xl font-bold text-gray-900 leading-tight">
//               {product.title}
//             </h1>

//             {/* Rating - معالجة آمنة */}
//             <div className="flex items-center gap-4">
//               <div className="flex text-2xl text-yellow-400">
//                 {Array(5).fill(0).map((_, i) => (
//                   <FaStar
//                     key={i}
//                     className={i < Math.round(ratingAvg) ? 'text-yellow-400' : 'text-gray-300'}
//                   />
//                 ))}
//               </div>
//               <span className="text-xl font-semibold">{displayRating}</span>
//               <span className="text-gray-500 text-lg">
//                 ({ratingsCount}) reviews
//               </span>
//             </div>

//             {/* Price */}
//             <div className="flex items-end gap-5">
//               <span className="text-5xl font-bold text-green-600">
//                 {finalPrice} EGP
//               </span>
//               {hasDiscount && (
//                 <div className="space-x-3">
//                   <span className="text-3xl text-gray-500 line-through">
//                     {product.price} EGP
//                   </span>
//                   <span className="text-lg bg-red-50 text-red-600 px-3 py-1 rounded-full font-medium">
//                     خصم {Math.round(((product.price - finalPrice) / product.price) * 100)}%
//                   </span>
//                 </div>
//               )}
//             </div>

//             {product.description && (
//               <div className="text-gray-700 text-lg leading-relaxed border-b pb-6">
//                 {product.description}
//               </div>
//             )}

//             {/* Quantity + Buttons */}
//             <div className="flex flex-wrap items-center gap-5 pt-4">
//               <div className="flex border border-gray-300 rounded-lg overflow-hidden text-lg font-medium">
//                 <button className="px-5 py-3 bg-gray-100 hover:bg-gray-200 transition">-</button>
//                 <input
//                   type="text"
//                   defaultValue="1"
//                   className="w-20 text-center border-x border-gray-300 py-3 focus:outline-none"
//                 />
//                 <button className="px-5 py-3 bg-gray-100 hover:bg-gray-200 transition">+</button>
//               </div>

//               <button className="flex-1 min-w-[220px] bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-4 px-10 rounded-xl transition shadow-md">
//                 Add to Cart
//               </button>

//               <button className="flex-1 min-w-[220px] bg-gray-900 hover:bg-gray-800 text-white font-bold text-xl py-4 px-10 rounded-xl transition shadow-md">
//                 Buy Now
//               </button>
//             </div>

//             <button className="text-gray-700 hover:text-red-600 flex items-center gap-2 text-lg font-medium">
//               ♡ Add to Wishlist
//             </button>

//             <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t text-center text-gray-600 text-base font-medium">
//               <div>Free Delivery</div>
//               <div>30 Days Returns</div>
//               <div>Secure Payment</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }