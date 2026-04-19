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
        <div className="max-w-384 mx-auto px-6">
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
              </div>)}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{category?.name}</h1>
              <p className="text-white/80 mt-1 text-sm md:text-base">Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-384 mx-auto px-6 py-10">
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