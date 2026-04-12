// "use client"

// import * as React from "react"
// import Link from "next/link"
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu"
// import { TiShoppingCart } from "react-icons/ti";
// import { FaRegHeart } from "react-icons/fa";
// import { IoCart } from "react-icons/io5";
// import { Button } from "@/components/ui/button";
// import { RiUser6Line } from "react-icons/ri";
// import FirstNav from "../FirstNav/FirstNav";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ]

// export default function NavigationMenuDemo() {
//   return (

    
//   <div>
//    <FirstNav/>
  
//     <NavigationMenu className="max-w-full md:px-20 bg-emerald-200 sticky top-0 z-50">
//       <NavigationMenuList className="flex justify-between">
//         <div className="flex">
//           <TiShoppingCart className="color/green/36 mt-1" />
//           <h6 className="w-165.16px h-32px">
//             <Link href={`/`}>Fresh Cart</Link></h6>
//         </div>
        
//         {/* <NavigationMenuItem>
//           <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="w-96">
//               <ListItem href="/docs" title="Introduction">
//                 Re-usable components built with Tailwind CSS.
//               </ListItem>
//               <ListItem href="/docs/installation" title="Installation">
//                 How to install dependencies and structure your app.
//               </ListItem>
//               <ListItem href="/docs/primitives/typography" title="Typography">
//                 Styles for headings, paragraphs, lists...etc
//               </ListItem>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem> */}
//         <NavigationMenuItem className="flex md:hidden">
//           <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
//               {components.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>

//         <div className="gap-4  hidden md:flex">
//           <NavigationMenuList className="  max-w-fit flex gap-6">
//         <NavigationMenuItem>
//             <Link href="/" className="hover:text-green-300 transition-all">Home</Link>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//             <Link href="/shop">Shop</Link>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//             <Link href="/categories">Categories</Link>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//             <Link href="/brands">Brands</Link>
//         </NavigationMenuItem>
//         </NavigationMenuList>
        
//         <NavigationMenuList className=" hidden md:flex max-w-fit gap-6">
//         <NavigationMenuItem>
//             <Link href="/wishlist"><FaRegHeart /></Link>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//             <Link href="/cart"><IoCart /></Link>
//         </NavigationMenuItem>
//         <Button className="py-2.5 px-5 rounded-full cursor-pointer"><RiUser6Line />Sign in</Button>
//         </NavigationMenuList>
//         </div>
//       </NavigationMenuList>
//     </NavigationMenu>
//     </div>
//   );
// }

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       {/* <NavigationMenuLink asChild> */}
//         <Link href={href}>
//           <div className="flex flex-col gap-1 text-sm">
//             <div className="leading-none font-medium">{title}</div>
//             <div className="line-clamp-2 text-muted-foreground">{children}</div>
//           </div>
//         </Link>
//       {/* </NavigationMenuLink> */}
//     </li>
    
//   )
// }




// "use client";

// import Link from "next/link";
// import { Search, Headphones } from "lucide-react";
// import { FaRegHeart } from "react-icons/fa";
// import { TiShoppingCart } from "react-icons/ti";
// import { IoCartOutline } from "react-icons/io5";
// import { RiUserLine } from "react-icons/ri";
// import FirstNav from "../FirstNav/FirstNav";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";

// export default function MainNavbar() {
//   return (
//     <>
//       <FirstNav />

//       {/* Main Navbar - Full Width زي الموقع بالظبط */}
//       <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
//         <div className="w-full">   {/* ← مهم: w-full بدل max-w */}
//           <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 md:py-4">
//             <div className="flex items-center justify-between gap-8">

//               {/* Logo */}
//               <div className="flex items-center gap-3 shrink-0">
//                 <TiShoppingCart className="text-4xl text-green-600" />
//                 <Link href="/" className="text-2xl font-bold text-green-700 tracking-tight">
//                   FreshCart
//                 </Link>
//               </div>

//               {/* Search Bar - عريض جدًا */}
//               <div className="flex-1 max-w-3xl mx-4">   {/* ← max-w-3xl عشان يبقى عريض */}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search for products, brands and more..."
//                     className="w-full bg-green-50 border border-green-200 focus:border-green-500 focus:bg-white h-12 pl-6 pr-16 rounded-full text-sm outline-none transition-all"
//                   />
//                   <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all">
//                     <Search className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Right Side */}
//               <div className="flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700 flex-shrink-0">
                
//                 <Link href="/" className="hover:text-green-600 transition-colors hidden md:block">Home</Link>
//                 <Link href="/shop" className="hover:text-green-600 transition-colors hidden md:block">Shop</Link>

//                 <NavigationMenu>
//                   <NavigationMenuList>
//                     <NavigationMenuItem>
//                       <NavigationMenuTrigger className="hover:text-green-600 bg-transparent hover:bg-transparent px-0 py-0 data-[state=open]:bg-transparent">
//                         Categories 
//                       </NavigationMenuTrigger>
//                       <NavigationMenuContent>
//                         <ul className="grid w-56 gap-2 p-4">
//                           <li><Link href="/categories" className="block px-3 py-2 hover:bg-green-50 rounded-md">All Categories</Link></li>
//                           <li><Link href="/categories/electronics" className="block px-3 py-2 hover:bg-green-50 rounded-md">Electronics</Link></li>
//                           <li><Link href="/categories/womens-fashion" className="block px-3 py-2 hover:bg-green-50 rounded-md">Women's Fashion</Link></li>
//                           <li><Link href="/categories/mens-fashion" className="block px-3 py-2 hover:bg-green-50 rounded-md">Men's Fashion</Link></li>
//                           <li><Link href="/categories/beauty-health" className="block px-3 py-2 hover:bg-green-50 rounded-md">Beauty & Health</Link></li>
//                         </ul>
//                       </NavigationMenuContent>
//                     </NavigationMenuItem>
//                   </NavigationMenuList>
//                 </NavigationMenu>

//                 <Link href="/brands" className="hover:text-green-600 transition-colors hidden md:block">Brands</Link>

//                 <Link href="/support" className="flex items-center gap-1.5 hover:text-green-600 transition-colors hidden lg:flex">
//                   <Headphones className="w-5 h-5" />
//                   <span className="text-xs leading-tight">24/7 Help</span>
//                 </Link>

//                 <Link href="/wishlist" className="text-2xl hover:text-green-600 transition-colors">
//                   <FaRegHeart />
//                 </Link>

//                 <Link href="/cart" className="relative text-3xl hover:text-green-600 transition-colors">
//                   <IoCartOutline />
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                     1
//                   </span>
//                 </Link>

//                 <Link
//                   href="/signin"
//                   className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all"
//                 >
//                   <RiUserLine className="text-lg" />
//                   Sign In
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

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

                <NavigationMenu>
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