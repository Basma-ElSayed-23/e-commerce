import React from 'react'
import FeaturedProducts from './_components/FeaturedProducts/FeaturedProducts'
import Slider from './_components/Slider/Slider';
// import img1 from '../assets/images/img1.jpg';
import img4 from '../assets/images/img4.png';
// import HomeCategories from './_components/HomeCategories/HomeCategories';
import { lazy , Suspense } from 'react';



const LazyHomeCategoryComponent = lazy( () => import ("./_components/HomeCategories/HomeCategories"))

export default function Home() {
  return (
   <>
  
  <Slider heightClass= "h-85 fill" listOfImages={[img4.src]}/>
    
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
