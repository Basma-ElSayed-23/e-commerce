"use client"

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination} from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link'

type SlideItem = {
  src: string;
  title: string;
  desc: string;
};
export default function Slider({
  spaceBetween = 0,
  slidesPerView = 1,
  listOfImages,
  heightClass,
}: {
  spaceBetween?: number;
  slidesPerView?: number;
  listOfImages: SlideItem[];
  heightClass: string;
}) {

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative overflow-hidden">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Pagination]}
        className={`${heightClass} my-1`}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={(listOfImages ?? []).length > 1}
        pagination={{
          clickable: true,
          type: 'bullets',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}>
        {(listOfImages ?? []).map((item) => (
          <SwiperSlide key={item.src + item.title} className="h-full">
            <img src={item.src} className="w-full h-full object-cover" alt={item.title} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00C950E5,#05DF7280)]" />
            <div className="absolute inset-0 flex flex-col justify-center px-16 z-10">
              <h2 className="text-white text-4xl font-bold leading-tight max-w-sm">
                {item.title}
              </h2>
              <p className="text-white mt-2 text-sm">{item.desc}</p>
              <div className="flex gap-3 mt-5">
                <Link href='/products' className="bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer border-none text-sm">
                  Shop Now
                </Link>
                <button className="bg-transparent text-white font-semibold px-6 py-2 rounded-lg border-2 border-white/50 hover:scale-105 transition-transform duration-200 cursor-pointer text-sm">
                  View Deals
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-pointer border-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-pointer border-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}