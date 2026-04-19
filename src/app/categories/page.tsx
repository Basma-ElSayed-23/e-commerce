import { getAllCategories } from '@/api/services/routemisr.service';
import Link from 'next/link';

export default async function CategoriesPage() {
  const allCategories = await getAllCategories();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white py-12">
        <div className="max-w-384 mx-auto px-8">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Categories</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 512 512">
                <path d="M64 32C46.3 32 32 46.3 32 64v80c0 17.7 14.3 32 32 32h80c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H64zm192 0c-17.7 0-32 14.3-32 32v80c0 17.7 14.3 32 32 32h80c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H256zM32 256c0-17.7 14.3-32 32-32h80c17.7 0 32 14.3 32 32v80c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V256zm224-32c-17.7 0-32 14.3-32 32v80c0 17.7 14.3 32 32 32h80c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32H256z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">All Categories</h1>
              <p className="text-white/80 text-sm">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1536px] mx-auto px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {allCategories?.map((category) => (
            <Link key={category._id} href={`/categories/${category._id}`}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden">
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
                </div>
                <div className="py-4 px-2 text-center">
                  <h2 className="text-sm font-semibold text-gray-800">{category.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}