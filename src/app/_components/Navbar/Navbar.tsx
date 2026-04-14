"use client";

import Link from "next/link";
import { Search, Headphones } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoCartOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import FirstNav from "../FirstNav/FirstNav";
import { useSession } from "next-auth/react";
import { getLoggedUserCart } from "@/actions/cart.action";
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
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

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
  getAllCategories().then((data) => {
    setCategories(data || []);
    setCategoriesLoading(false);
  });
}, []);

console.log("STATUS:", status);
console.log("SESSION:", mySessionData);

  return (
    <>
      <FirstNav  />

      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="w-full">
          <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 md:py-4">
            <div className="flex items-center justify-between gap-8">

              {/* Logo */}
              <div className="flex items-center gap-3 shrink-0">
                <TiShoppingCart className="text-4xl text-green-600" />
                <Link href="/" className="text-2xl font-bold text-green-700 tracking-tight">
                  FreshCart
                </Link>
              </div>

              {/* Search Bar */}
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

              {/* Right Side */}
              <div className="flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700 flex-shrink-0">

                <Link href="/" className="hover:text-green-600 transition-colors hidden md:block">Home</Link>
                <Link href="/shop" className="hover:text-green-600 transition-colors hidden md:block">Shop</Link>

                 {/* <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="hover:text-green-600 bg-transparent hover:bg-transparent px-0 py-0 data-[state=open]:bg-transparent">
                        Categories
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-56 gap-2 p-4">
                          <li><Link href="/categories" className="block px-3 py-2 hover:bg-green-50 rounded-md">All Categories</Link></li>
                          <li><Link href="/categories/electronics" className="block px-3 py-2 hover:bg-green-50 rounded-md">Electronics</Link></li>
                          <li><Link href="/categories/womens-fashion" className="block px-3 py-2 hover:bg-green-50 rounded-md">Women's Fashion</Link></li>
                          <li><Link href="/categories/mens-fashion" className="block px-3 py-2 hover:bg-green-50 rounded-md">Men's Fashion</Link></li>
                          <li><Link href="/categories/beauty-health" className="block px-3 py-2 hover:bg-green-50 rounded-md">Beauty & Health</Link></li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>  */}
                 
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
                

                <Link href="/brands" className="hover:text-green-600 transition-colors hidden md:block">Brands</Link>

                <Link href="/support" className="flex items-center gap-1.5 hover:text-green-600 transition-colors hidden lg:flex">
                  <Headphones className="w-5 h-5" />
                  <span className="text-xs leading-tight">Support<br />24/7 Help</span>
                </Link>

                <Link href="/wishlist" className="text-2xl hover:text-green-600 transition-colors">
                  <FaRegHeart />
                </Link>

 
                {/* <Link href="/cart" className="relative text-3xl hover:text-green-600 transition-colors">
                  <IoCartOutline />
                </Link> */}
                <Link href="/cart" className="relative text-3xl hover:text-green-600 transition-colors">
  <IoCartOutline />
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  )}
</Link>


{/* {status !== "authenticated" && (
  <Link href="/login" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-2.5 rounded-full text-sm font-semibold">
    <FaUser />
    <span>Sign In</span>
  </Link>
)} */}
        {status !== "authenticated" && (
  <Link href="/login" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-2.5 rounded-full text-sm font-semibold">
    <FaUser />
    <span>Sign In</span>
  </Link>
)}

{status === "authenticated" && (
  <Link href="/profile" className="text-2xl hover:text-green-600 transition-colors">
    <FaUser />
  </Link>
)}        

{/* 
                {status === "authenticated" ? (<Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all">
               <FaUser/>
                  <Link href="/login">Sign In</Link> 
  </Button>
): (
  ""
   )} */}

          {/* User Section in MainNavbar */}

   {/* <Link 
    href="/profile" 
    className="flex items-center gap-2 hover:text-green-600 transition-colors">
    <RiUserLine className="text-2xl text-green-600" />
    <span className="text-sm font-semibold hidden lg:block">
      
    </span>
  </Link> 

   */}

              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}