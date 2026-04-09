import React from 'react'
import FeaturedProducts from './_components/FeaturedProducts/FeaturedProducts'
import Slider from './_components/Slider/Slider';
// import img1 from '../assets/images/img1.jpg';
import img4 from '../assets/images/img4.png';
import HomeCategories from './_components/HomeCategories/HomeCategories';
import { lazy , Suspense } from 'react';






const LazyHomeCategoryComponent = lazy( () => import ("./_components/HomeCategories/HomeCategories"))

export default function Home() {
  return (
   <>
  
  {/* <Slider heightClass= "h-85 fill" listOfImages={[img4.src]}/> */}
  <Slider heightClass="h-85" listOfImages={[
  { src: img4.src, title: "Fresh Products Delivered to your Door", desc: "Get 20% off your first order"},
  { src: img4.src, title: "Premium Quality Guaranteed", desc: "Fresh from farm to your table"},
  { src: img4.src, title: "Fast & Free Delivery", desc: "Same day delivery available"},
]} />
    
<Suspense
 fallback ={   
  <div className='h-75 bg-white text-black text-2xl font-bold flex justify-center items-center '>Loading...</div>
}>
<LazyHomeCategoryComponent/>
</Suspense>


    <FeaturedProducts/>

 </>
 )
}
