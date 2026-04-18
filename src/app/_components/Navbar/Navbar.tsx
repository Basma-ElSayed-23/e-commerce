"use client";

import Link from "next/link";
import { Search, Headphones, X, Menu  } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoCartOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import FirstNav from "../FirstNav/FirstNav";
import { useSession } from "next-auth/react";
import { getLoggedUserCart } from "@/actions/cart.action";
import { getWishlist } from "@/actions/wishlist.action";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllCategories } from '@/api/services/routemisr.service';
import { CategoryType } from '@/api/types/product.type';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@base-ui/react/button";

export default function MainNavbar() {
  const router = useRouter();
  const { data: mySessionData , status } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

// useEffect(() => {
//   async function fetchCart() {
//     if (status === "authenticated") {
//       const token = (mySessionData as any)?.accessToken ?? "";
//       const res = await getLoggedUserCart(token);
//       if (res.status === "success") {
//         setCartCount(res.data?.products?.length ?? 0);
//       }
//     }
//   }
//   fetchCart();
// }, [status]);

useEffect(() => {
  if (status !== "authenticated") return;

  async function fetchCart() {
    const token = (mySessionData as any)?.accessToken ?? "";
    const res = await getLoggedUserCart(token);
    if (res.status === "success") {
      setCartCount(res.data?.products?.length ?? 0);
    }
  }

  fetchCart();

  window.addEventListener("cartUpdated", fetchCart);
  return () => window.removeEventListener("cartUpdated", fetchCart);
}, [status, mySessionData]);

useEffect(() => {
  if (status !== "authenticated") return;

  async function fetchWishlist() {
    const token = (mySessionData as any)?.accessToken ?? "";
    const res = await getWishlist(token);
    if (res?.data) setWishlistCount(res.data.length);
  }

  fetchWishlist();
  window.addEventListener("wishlistUpdated", fetchWishlist);
  return () => window.removeEventListener("wishlistUpdated", fetchWishlist);
}, [status, mySessionData]);

useEffect(() => {
  getAllCategories().then((data) => {
    setCategories(data || []);
    setCategoriesLoading(false);
  });
}, []);

console.log("STATUS:", status);
console.log("SESSION:", mySessionData);

//  return (
//   <>
//     <FirstNav />

//     <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
//       <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 md:py-4">

//         {/* ===== DESKTOP LAYOUT ===== */}
//         <div className="hidden lg:flex items-center justify-between gap-8">
//           <div className="flex items-center gap-3 shrink-0">
//             <TiShoppingCart className="text-4xl text-green-600" />
//             <Link href="/" className="text-2xl font-bold text-green-700 tracking-tight">FreshCart</Link>
//           </div>

//           <div className="flex-1 max-w-3xl mx-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search for products, brands and more..."
//                 className="w-full bg-green-50 border border-green-200 focus:border-green-500 focus:bg-white h-12 pl-6 pr-16 rounded-full text-sm outline-none transition-all"
//               />
//               <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all">
//                 <Search className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700 flex-shrink-0">
//             <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
//             <Link href="/shop" className="hover:text-green-600 transition-colors">Shop</Link>

//             <NavigationMenu>
//               <NavigationMenuList>
//                 <NavigationMenuItem>
//                   <NavigationMenuTrigger className="hover:text-green-600 bg-transparent hover:bg-transparent px-0 py-0 data-[state=open]:bg-transparent">
//                     Categories
//                   </NavigationMenuTrigger>
//                   <NavigationMenuContent>
//                     <ul className="grid w-56 gap-2 p-4">
//                       <li><Link href="/categories" className="block px-3 py-2 hover:bg-green-50 rounded-md font-medium">All Categories</Link></li>
//                       {categoriesLoading ? (
//                         <li className="px-3 py-2 text-gray-400 text-sm">Loading...</li>
//                       ) : (
//                         ["Electronics", "Women's Fashion", "Men's Fashion", "Beauty & Health"]
//                           .map(name => categories.find(cat => cat.name === name))
//                           .filter(Boolean)
//                           .map((cat) => (
//                             <li key={cat!._id}>
//                               <Link href={`/products?category=${cat!._id}&label=${encodeURIComponent(cat!.name)}`} className="block px-3 py-2 hover:bg-green-50 rounded-md">
//                                 {cat!.name}
//                               </Link>
//                             </li>
//                           ))
//                       )}
//                     </ul>
//                   </NavigationMenuContent>
//                 </NavigationMenuItem>
//               </NavigationMenuList>
//             </NavigationMenu>

//             <Link href="/brands" className="hover:text-green-600 transition-colors">Brands</Link>

//             <Link href="/support" className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
//               <Headphones className="w-5 h-5" />
//               <span className="text-xs leading-tight">Support<br />24/7 Help</span>
//             </Link>

//             <Link href="/wishlist" className="relative text-2xl hover:text-green-600 transition-colors">
//               <FaRegHeart />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{wishlistCount}</span>
//               )}
//             </Link>

//             <Link href="/cart" className="relative text-3xl hover:text-green-600 transition-colors">
//               <IoCartOutline />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
//               )}
//             </Link>

//             {status !== "authenticated" ? (
//               <Link href="/login" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-2.5 rounded-full text-sm font-semibold">
//                 <FaUser />
//                 <span>Sign In</span>
//               </Link>
//             ) : (
//               <Link href="/profile" className="text-2xl hover:text-green-600 transition-colors">
//                 <FaUser />
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* ===== MOBILE LAYOUT ===== */}
//         <div className="flex lg:hidden items-center justify-between gap-3">
//           <div className="flex items-center gap-2 shrink-0">
//             <TiShoppingCart className="text-3xl text-green-600" />
//             <Link href="/" className="text-xl font-bold text-green-700 tracking-tight">FreshCart</Link>
//           </div>

//           <div className="flex items-center gap-3 text-gray-700">
//             <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className="p-1 hover:text-green-600 transition-colors">
//               <Search className="w-5 h-5" />
//             </button>

//             <Link href="/wishlist" className="relative p-1 hover:text-green-600 transition-colors">
//               <FaRegHeart className="text-xl" />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>
//               )}
//             </Link>

//             <Link href="/cart" className="relative p-1 hover:text-green-600 transition-colors">
//               <IoCartOutline className="text-2xl" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
//               )}
//             </Link>

//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1 hover:text-green-600 transition-colors">
//               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Collapsible Search */}
//         {mobileSearchOpen && (
//           <div className="lg:hidden mt-3">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="w-full bg-green-50 border border-green-200 focus:border-green-500 h-10 pl-4 pr-12 rounded-full text-sm outline-none transition-all"
//                 autoFocus
//               />
//               <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full">
//                 <Search className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ===== MOBILE MENU DRAWER ===== */}
//       {mobileMenuOpen && (
//         <>
//           {/* Overlay */}
//           <div
//             className="lg:hidden fixed inset-0 z-40 bg-black/30"
//             onClick={() => setMobileMenuOpen(false)}
//           />

//           {/* Drawer */}
//           <div className="lg:hidden fixed right-0 top-0 h-full w-80 z-50 bg-white flex flex-col shadow-2xl overflow-y-auto">

//             {/* Header */}
//             <div className="flex items-center justify-between px-4 py-4 border-b">
//               <div className="flex items-center gap-2">
//                 <TiShoppingCart className="text-3xl text-green-600" />
//                 <span className="text-xl font-bold text-green-700">FreshCart</span>
//               </div>
//               <button onClick={() => setMobileMenuOpen(false)}>
//                 <X className="w-6 h-6 text-gray-600" />
//               </button>
//             </div>

//             {/* Search */}
//             <div className="px-4 py-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="w-full bg-gray-50 border border-gray-200 h-10 pl-4 pr-12 rounded-full text-sm outline-none"
//                 />
//                 <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full">
//                   <Search className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Links */}
//             <div className="flex-1 flex flex-col px-4 py-2">
//               <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-4 text-gray-700 font-medium border-b hover:text-green-600 hover:pl-2 transition-all duration-200">Home</Link>
//               <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-4 text-gray-700 font-medium border-b hover:text-green-600 hover:pl-2 transition-all duration-200">Shop</Link>
//               <Link href="/categories" onClick={() => setMobileMenuOpen(false)} className="py-4 text-gray-700 font-medium border-b hover:text-green-600 hover:pl-2 transition-all duration-200">Categories</Link>
//               <Link href="/brands" onClick={() => setMobileMenuOpen(false)} className="py-4 text-gray-700 font-medium border-b hover:text-green-600 hover:pl-2 transition-all duration-200">Brands</Link>

//               <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="py-4 flex items-center gap-3 text-gray-700 font-medium border-b hover:text-green-600 hover:pl-2 transition-all duration-200">
//                 <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
//                   <FaRegHeart className="text-red-500" />
//                 </span>
//                 Wishlist
//               </Link>
//               <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="py-4 flex items-center gap-3 text-gray-700 font-medium border-b hover:text-green-600 hover:pl-2 transition-all duration-200">
//                 <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                   <IoCartOutline className="text-green-600" />
//                 </span>
//                 Cart
//               </Link>
//             </div>

//             {/* Sign In & Sign Up */}
//             <div className="px-4 py-4 flex gap-3">
//               <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-semibold text-center">
//                 Sign In
//               </Link>
//               <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 border-2 border-green-600 text-green-600 py-3 rounded-xl text-sm font-semibold text-center">
//                 Sign Up
//               </Link>
//             </div>

//             {/* Need Help */}
//             <div className="px-4 py-4 border-t flex items-center gap-3">
//               <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                 <Headphones className="w-5 h-5 text-green-600" />
//               </span>
//               <div>
//                 <p className="text-sm font-medium text-gray-700">Need Help?</p>
//                 <Link href="/support" className="text-xs text-green-600">Contact Support</Link>
//               </div>
//             </div>

//           </div>
//         </>
//       )}
//     </nav>
//   </>
// );

return (
  <>
    <FirstNav />

    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 md:py-4">

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden lg:flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <TiShoppingCart className="text-4xl text-green-600" />
            <Link href="/" className="text-2xl font-bold text-green-700 tracking-tight">FreshCart</Link>
          </div>

          <div className="flex-1 max-w-3xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full bg-green-50 border border-green-200 focus:border-green-500 focus:bg-white h-12 pl-6 pr-16 rounded-full text-sm outline-none transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700 flex-shrink-0">
            <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
            <Link href="/products" className="hover:text-green-600 transition-colors">Shop</Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:text-green-600 bg-transparent hover:bg-transparent px-0 py-0 data-[state=open]:bg-transparent">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-56 gap-2 p-4">
                      <li><Link href="/categories" className="block px-3 py-2 hover:bg-green-50 rounded-md font-medium">All Categories</Link></li>
                      {categoriesLoading ? (
                        <li className="px-3 py-2 text-gray-400 text-sm">Loading...</li>
                      ) : (
                        ["Electronics", "Women's Fashion", "Men's Fashion", "Beauty & Health"]
                          .map(name => categories.find(cat => cat.name === name))
                          .filter(Boolean)
                          .map((cat) => (
                            <li key={cat!._id}>
                              <Link href={`/products?category=${cat!._id}&label=${encodeURIComponent(cat!.name)}`} className="block px-3 py-2 hover:bg-green-50 rounded-md">
                                {cat!.name}
                              </Link>
                            </li>
                          ))
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/brands" className="hover:text-green-600 transition-colors">Brands</Link>

            <Link href="/support" className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
              <Headphones className="w-5 h-5" />
              <span className="text-xs leading-tight">Support<br />24/7 Help</span>
            </Link>

            <Link href="/wishlist" className="relative text-2xl hover:text-green-600 transition-colors">
              <FaRegHeart />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{wishlistCount}</span>
              )}
            </Link>

            <Link href="/cart" className="relative text-3xl hover:text-green-600 transition-colors">
              <IoCartOutline />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </Link>

            {status !== "authenticated" ? (
              <Link href="/login" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-2.5 rounded-full text-sm font-semibold">
                <FaUser />
                <span>Sign In</span>
              </Link>
            ) : (
              <Link href="/profile" className="text-2xl hover:text-green-600 transition-colors">
                <FaUser />
              </Link>
            )}
          </div>
        </div>

        {/* ===== MOBILE LAYOUT ===== */}
        <div className="flex lg:hidden items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <TiShoppingCart className="text-3xl text-green-600" />
            <Link href="/" className="text-xl font-bold text-green-700 tracking-tight">FreshCart</Link>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className="p-1 hover:text-green-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <Link href="/wishlist" className="relative p-1 hover:text-green-600 transition-colors">
              <FaRegHeart className="text-xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>
              )}
            </Link>

            <Link href="/cart" className="relative p-1 hover:text-green-600 transition-colors">
              <IoCartOutline className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </Link>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1 hover:text-green-600 transition-colors">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Collapsible Search */}
        {mobileSearchOpen && (
          <div className="lg:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-green-50 border border-green-200 focus:border-green-500 h-10 pl-4 pr-12 rounded-full text-sm outline-none transition-all"
                autoFocus
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== MOBILE MENU DRAWER ===== */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="lg:hidden fixed right-0 top-0 h-full w-80 z-50 bg-white flex flex-col shadow-2xl overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <div className="flex items-center gap-2">
                <TiShoppingCart className="text-3xl text-green-600" />
                <span className="text-xl font-bold text-green-700">FreshCart</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-gray-50 border border-gray-200 h-10 pl-4 pr-12 rounded-full text-sm outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col px-4 py-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-4 px-2 text-gray-700 font-medium border-b hover:text-green-600 hover:bg-green-50 transition-colors duration-200">Home</Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="py-4 px-2 text-gray-700 font-medium border-b hover:text-green-600 hover:bg-green-50 transition-colors duration-200">Shop</Link>
              <Link href="/categories" onClick={() => setMobileMenuOpen(false)} className="py-4 px-2 text-gray-700 font-medium border-b hover:text-green-600 hover:bg-green-50 transition-colors duration-200">Categories</Link>
              <Link href="/brands" onClick={() => setMobileMenuOpen(false)} className="py-4 px-2 text-gray-700 font-medium border-b hover:text-green-600 hover:bg-green-50 transition-colors duration-200">Brands</Link>

              <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="py-4 px-2 flex items-center gap-3 text-gray-700 font-medium border-b hover:text-green-600 hover:bg-green-50 transition-colors duration-200">
                <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <FaRegHeart className="text-red-500" />
                </span>
                Wishlist
              </Link>
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="py-4 px-2 flex items-center gap-3 text-gray-700 font-medium border-b hover:text-green-600 hover:bg-green-50 transition-colors duration-200">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <IoCartOutline className="text-green-600" />
                </span>
                Cart
              </Link>
            </div>

            {/* Sign In & Sign Up */}
            <div className="px-4 py-4 flex gap-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-semibold text-center">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 border-2 border-green-600 text-green-600 py-3 rounded-xl text-sm font-semibold text-center">
                Sign Up
              </Link>
            </div>

            {/* Need Help */}
            <div className="px-4 py-4 border-t flex items-center gap-3">
              <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Headphones className="w-5 h-5 text-green-600" />
              </span>
              <div>
                <p className="text-sm font-medium text-gray-700">Need Help?</p>
                <Link href="/support" className="text-xs text-green-600">Contact Support</Link>
              </div>
            </div>

          </div>
        </>
      )}
    </nav>
  </>
);
}