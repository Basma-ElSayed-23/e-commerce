import { getSingleCategory, getProductsByCategory } from '@/api/services/routemisr.service';
import Link from 'next/link';

export default async function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // const category = await getSingleCategory(id);
  // const products = await getProductsByCategory(id);

  const category = await getSingleCategory(id);
  const response = await getProductsByCategory(id);
  const products = response?.data ?? [];

  return (
    <div className="w-[90%] mx-auto my-8">

      {/* Header */}
      <div className="bg-linear-to-r from-green-500 to-emerald-400 text-white p-8 rounded-xl mb-6 flex items-center gap-4">
        <img src={category.image} className="w-16 h-16 bg-white p-2 rounded" />
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p>Choose a subcategory to browse products</p>
        </div>
      </div>

      {/* Back */}
      <Link href="/categories" className="text-gray-600 mb-6 block">
        ← Back to Categories
      </Link>

      {/* No Products */}
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
          {/* Folder Icon */}
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
            </svg>
          </div>

          <p className="text-lg font-semibold text-gray-800">No Subcategories Found</p>
          <p className="text-gray-500 text-sm">This category doesn't have any subcategories yet.</p>

          <Link
            href={`/products?category=${id}`}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            View All Products in {category.name}
          </Link>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {products.map((product: any) => (
            <div key={product.id} className="border p-3 rounded-lg">
              <img src={product.imageCover} />
              <h3 className="text-sm mt-2">{product.title}</h3>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}