// import { getSingleCategory, getProductsByCategory } from '@/api/services/routemisr.service';
// import Link from 'next/link';

// export default async function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;

//   // const category = await getSingleCategory(id);
//   // const products = await getProductsByCategory(id);

//   const category = await getSingleCategory(id);
//   const response = await getProductsByCategory(id);
//   const products = response?.data ?? [];

//   if (!category) {
//   return <div className="text-center mt-20 text-red-500">Category not found</div>;
// }

//   return (
//     <div className="w-[90%] mx-auto my-8">

//       {/* Header */}
//       <div className="bg-linear-to-r from-green-500 to-emerald-400 text-white p-8 rounded-xl mb-6 flex items-center gap-4">
//         <img src={category.image} className="w-16 h-16 bg-white p-2 rounded" />
//         <div>
//           <h1 className="text-2xl font-bold">{category?.name}</h1>
//           <p>Choose a subcategory to browse products</p>
//         </div>
//       </div>

//       {/* Back */}
//       <Link href="/categories" className="text-gray-600 mb-6 block">
//         ← Back to Categories
//       </Link>

//       {/* No Products */}
//       {products.length === 0 && (
//         <div className="flex flex-col items-center justify-center mt-20 gap-4">
//           {/* Folder Icon */}
//           <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
//             </svg>
//           </div>

//           <p className="text-lg font-semibold text-gray-800">No Subcategories Found</p>
//           <p className="text-gray-500 text-sm">This category doesn't have any subcategories yet.</p>

//           <Link
//             href={`/products?category=${id}`}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
//           >
//             View All Products in {category.name}
//           </Link>
//         </div>
//       )}

//       {/* Products Grid */}
//       {products.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//           {products.map((product: any) => (
//             <div key={product.id} className="border p-3 rounded-lg">
//               <img src={product.imageCover} />
//               <h3 className="text-sm mt-2">{product.title}</h3>
//             </div>
//           ))}
//         </div>
//       )}

//     </div>
//   );
// }

// import Link from 'next/link';
// import { getSingleCategory, getSubcategoriesByCategory } from '@/api/services/routemisr.service';
// import { IoFolder } from "react-icons/io5";

// export default async function CategoryPage({ params }: { params: { id: string } }) {
//   const [category, subcategories] = await Promise.all([
//     getSingleCategory(params.id),
//     getSubcategoriesByCategory(params.id),
//   ]);

//  console.log("ID:", params.id);
//   console.log("Category:", JSON.stringify(category));
//   console.log("Subcategories:", JSON.stringify(subcategories));



//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Green Header */}
//       <div className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white py-16">
//         <div className="max-w-[1536px] mx-auto px-6 flex items-center gap-5">
//           {category?.image && (
//             <img src={category.image} alt={category.name} className="w-14 h-14 rounded-2xl object-cover" />
//           )}
//           <div>
//             <h1 className="text-4xl font-bold">{category?.name}</h1>
//             <p className="text-white/80 mt-1">Choose a subcategory to browse products</p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[1536px] mx-auto px-6 py-10">
//         <Link href="/categories" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6 transition">
//           ← Back to Categories
//         </Link>

//         <h2 className="text-xl font-semibold mb-6">
//           {subcategories?.length || 0} Subcategories in {category?.name}
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {subcategories?.map((sub: { _id: string; name: string }) => (
//             <div key={sub._id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border-2 border-transparent hover:border-emerald-500 transition-all duration-300 cursor-pointer">
//               <IoFolder size={40} className="text-emerald-500 mb-4" />
//               <h3 className="text-lg font-semibold text-gray-800">{sub.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import Link from 'next/link';
// import { getSingleCategory, getSubcategoriesByCategory } from '@/api/services/routemisr.service';
// import { IoFolder } from "react-icons/io5";

// export default async function CategoryPage({ params }: { params: { id: string } }) {
// const [category, subcategories] = await Promise.all([
//   getSingleCategory(params.id),
//   getSubcategoriesByCategory(params.id),
// ]);



// return (
//   <div className="min-h-screen bg-gray-50">

//     {/* Header */}
//     <div className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white py-16">
//       <div className="max-w-[1536px] mx-auto px-6">

//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
//           <Link href="/" className="hover:text-white transition">Home</Link>
//           <span>/</span>
//           <Link href="/categories" className="hover:text-white transition">Categories</Link>
//           <span>/</span>
//           <span className="text-white font-medium">{category?.name}</span>
//         </div>

//         {/* Category Info */}
//         <div className="flex items-center gap-4">
//           {category?.image && (
//             <div className="bg-white/10 p-3 rounded-xl">
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="w-12 h-12 rounded-lg object-cover"
//               />
//             </div>
//           )}

//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold">
//               {category?.name}
//             </h1>
//             <p className="text-white/80 mt-1 text-sm md:text-base">
//               Choose a subcategory to browse products
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>

//     {/* Content */}
//     <div className="max-w-[1536px] mx-auto px-6 py-10">

//       {/* Back */}
//       <Link
//         href="/categories"
//         className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6 transition text-sm"
//       >
//         ← Back to Categories
//       </Link>

//       {/* Title */}
//       <h2 className="text-lg md:text-xl font-semibold mb-6">
//         {subcategories?.length || 0} Subcategories in {category?.name}
//       </h2>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {subcategories?.map((sub: { _id: string; name: string }) => {
//           if (!sub?._id) return null;

//           return (
//             <Link
//               key={sub._id}
//               href={`/products?category=${category?._id}&subcategory=${sub._id}`}
//             >
//               <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-emerald-400 transition-all duration-300 cursor-pointer group hover:-translate-y-1">

//                 <div className="bg-emerald-100 w-12 h-12 flex items-center justify-center rounded-xl mb-4 group-hover:bg-emerald-200 transition">
//                   <IoFolder size={24} className="text-emerald-600" />
//                 </div>

//                 <h3 className="text-base font-semibold text-gray-800 group-hover:text-emerald-600 transition">
//                   {sub.name}
//                 </h3>

//                 <p className="text-sm text-emerald-600 mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
//                   Browse Products →
//                 </p>

//               </div>
//             </Link>
//           );
//         })}
//       </div>

//     </div>
//   </div>
// );
// }
// import Link from 'next/link';
// import { getSingleCategory, getSubcategoriesByCategory } from '@/api/services/routemisr.service';
// import { IoFolder } from "react-icons/io5";

// export default async function CategoryPage({ params }: { params: { id: string } }) {
//   const [category, subcategories] = await Promise.all([
//     getSingleCategory(params.id),
//     getSubcategoriesByCategory(params.id),
//   ]);

//   return (
//     <div className="min-h-screen bg-gray-50">

//       <div className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white py-16">
//         <div className="max-w-[1536px] mx-auto px-6">

//           <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
//             <Link href="/" className="hover:text-white transition">Home</Link>
//             <span>/</span>
//             <Link href="/categories" className="hover:text-white transition">Categories</Link>
//             <span>/</span>
//             <span className="text-white font-medium">{category?.name}</span>
//           </div>

//           <div className="flex items-center gap-4">
//             {category?.image && (
//               <div className="bg-white/10 p-3 rounded-xl">
//                 <img src={category.image} alt={category.name} className="w-12 h-12 rounded-lg object-cover" />
//               </div>
//             )}
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold">{category?.name}</h1>
//               <p className="text-white/80 mt-1 text-sm md:text-base">Choose a subcategory to browse products</p>
//             </div>
//           </div>

//         </div>
//       </div>

//       <div className="max-w-[1536px] mx-auto px-6 py-10">

//         <Link href="/categories" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6 transition text-sm">
//           ← Back to Categories
//         </Link>

//         <h2 className="text-lg md:text-xl font-semibold mb-6">
//           {subcategories?.length || 0} Subcategories in {category?.name}
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {subcategories?.map((sub: { _id: string; name: string }) => {
//             if (!sub?._id) return null;
//             return (
//               <Link key={sub._id} href={`/products?category=${params.id}&subcategory=${sub._id}`}>
//                 <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-emerald-400 transition-all duration-300 cursor-pointer group hover:-translate-y-1">
//                   <div className="bg-emerald-100 w-12 h-12 flex items-center justify-center rounded-xl mb-4 group-hover:bg-emerald-200 transition">
//                     <IoFolder size={24} className="text-emerald-600" />
//                   </div>
//                   <h3 className="text-base font-semibold text-gray-800 group-hover:text-emerald-600 transition">
//                     {sub.name}
//                   </h3>
//                   <p className="text-sm text-emerald-600 mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
//                     Browse Products →
//                   </p>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }

import Link from 'next/link';
import { getSingleCategory, getSubcategoriesByCategory } from '@/api/services/routemisr.service';
import { IoFolder } from "react-icons/io5";

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [category, subcategories] = await Promise.all([
    getSingleCategory(id),
    getSubcategoriesByCategory(id),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white py-16">
        <div className="max-w-[1536px] mx-auto px-6">

          <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition">Categories</Link>
            <span>/</span>
            <span className="text-white font-medium">{category?.name}</span>
          </div>

          <div className="flex items-center gap-4">
            {category?.image && (
              <div className="bg-white/10 p-3 rounded-xl">
                <img src={category.image} alt={category.name} className="w-12 h-12 rounded-lg object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{category?.name}</h1>
              <p className="text-white/80 mt-1 text-sm md:text-base">Choose a subcategory to browse products</p>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-[1536px] mx-auto px-6 py-10">

        <Link href="/categories" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6 transition text-sm">
          ← Back to Categories
        </Link>

        <h2 className="text-lg md:text-xl font-semibold mb-6">
          {subcategories?.length || 0} Subcategories in {category?.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subcategories?.map((sub: { _id: string; name: string }) => {
            if (!sub?._id) return null;
            return (
              <Link key={sub._id} href={`/products?category=${id}&subcategory=${sub._id}`}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-emerald-400 transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                  <div className="bg-emerald-100 w-12 h-12 flex items-center justify-center rounded-xl mb-4 group-hover:bg-emerald-200 transition">
                    <IoFolder size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-emerald-600 transition">
                    {sub.name}
                  </h3>
                  <p className="text-sm text-emerald-600 mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Browse Products →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}