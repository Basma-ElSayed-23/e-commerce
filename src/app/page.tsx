import React from 'react'
import FeaturedProducts from './_components/FeaturedProducts/FeaturedProducts'
import Slider from './_components/Slider/Slider';
// import img1 from '../assets/images/img1.jpg';
import img4 from '../assets/images/img4.png';
import HomeCategories from './_components/HomeCategories/HomeCategories';


export default function Home() {
  return (
   <>
  
  <Slider heightClass= "h-[400px] fill" listOfImages={[img4.src]}/>
    

<HomeCategories/>

    <FeaturedProducts/>

 </>
 )
}
