"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { RiUser6Line } from "react-icons/ri";
import FirstNav from "../FirstNav/FirstNav";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function NavigationMenuDemo() {
  return (

    
  <div>
   <FirstNav/>
  
    <NavigationMenu className="max-w-full md:px-20 bg-red-400 sticky top-0">
      <NavigationMenuList className="flex justify-between">
        <div className="flex">
          <TiShoppingCart className="color/green/36 mt-1" />
          <h6 className="w-165.16px h-32px">
            <Link href={`/`}>Fresh Cart</Link></h6>
        </div>
        
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built with Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem className="flex md:hidden">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <div className="gap-4  hidden md:flex">
          <NavigationMenuList className="  max-w-fit flex gap-6">
        <NavigationMenuItem>
            <Link href="/" className="hover:text-green-300 transition-all">Home</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <Link href="/shop">Shop</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <Link href="/categories">Categories</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <Link href="/brands">Brands</Link>
        </NavigationMenuItem>
        </NavigationMenuList>
        
        <NavigationMenuList className=" hidden md:flex max-w-fit gap-6">
        <NavigationMenuItem>
            <Link href="/wishlist"><FaRegHeart /></Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <Link href="/cart"><IoCart /></Link>
        </NavigationMenuItem>
        <Button className="py-2.5 px-5 rounded-full cursor-pointer"><RiUser6Line />Sign in</Button>
        </NavigationMenuList>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      {/* <NavigationMenuLink asChild> */}
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      {/* </NavigationMenuLink> */}
    </li>
    
  )
}

