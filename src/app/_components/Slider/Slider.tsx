"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Slider ({
    spaceBetween = 0 ,
    slidesPerView = 1,
     listOfImages,
     heightClass,
 } : {spaceBetween? : number,
    slidesPerView? : number, 
    listOfImages : string[];
    heightClass: string;
} ) {
  return (
    <Swiper modules={[Navigation, Pagination]}
     className={`${heightClass} my-1`}
      spaceBetween={spaceBetween} 
      slidesPerView ={slidesPerView}
      pagination={{ clickable: true , renderBullet(index , className){
       return `<span class = "${className} rounded-md"></span>`;
       },
      // bulletActiveClass : "w-8! h-4! bg-white!"
      }}
       navigation
      >
      {listOfImages.map((src) => (
        <SwiperSlide key={src} className='h-full'>
          <img src={src} className='w-full h-full object-cover' alt={src} />
          <div className='absolute inset-0 bg-[linear-gradient(to_right,#00C950E5,#05DF7280)]'>
          </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
