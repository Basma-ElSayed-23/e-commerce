// "use client"

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// export default function Slider ({
//     spaceBetween = 0 ,
//     slidesPerView = 1,
//      listOfImages,
//      heightClass,
//  } : {spaceBetween? : number,
//     slidesPerView? : number, 
//     listOfImages : string[];
//     heightClass: string;
// } ) {
//   return (
//     <Swiper modules={[Navigation, Pagination]}
//      className={`${heightClass} my-1`}
//       spaceBetween={spaceBetween} 
//       slidesPerView ={slidesPerView}
//       pagination={{ clickable: true , renderBullet(index , className){
//        return `<span class = "${className} rounded-md"></span>`;
//        },
//       // bulletActiveClass : "w-8! h-4! bg-white!"
//       }}
//        navigation
//       >
//       {listOfImages.map((src) => (
//         <SwiperSlide key={src} className='h-full'>
//           <img src={src} className='w-full h-full object-cover' alt={src} />
//           <div className='absolute inset-0 bg-[linear-gradient(to_right,#00C950E5,#05DF7280)]'>
//           </div>
//           </SwiperSlide>
//         ))}
//     </Swiper>
//   );
// };


// "use client"

// import { useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';
// import type { Swiper as SwiperType } from 'swiper';


// export default function Slider({
//   spaceBetween = 0,
//   slidesPerView = 1,
//   listOfImages,
//   heightClass,
// }: {
//   spaceBetween?: number;
//   slidesPerView?: number;
//   listOfImages: string[];
//   heightClass: string;
// }) {
//   const swiperRef = useRef<SwiperType | null>(null);

//   return (
//     <div className="relative overflow-hidden">
//       <Swiper
//         onSwiper={(swiper) => (swiperRef.current = swiper)}
//         modules={[Pagination, Autoplay]}
//         className={`${heightClass} my-1`}
//         spaceBetween={spaceBetween}
//         slidesPerView={slidesPerView}
//        loop={listOfImages.length > 1}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         pagination={{
//   clickable: true,
//   type: 'bullets',                    // مهم نحدده صراحة
//   bulletClass: 'swiper-pagination-bullet',           // الـ default class
//   bulletActiveClass: 'swiper-pagination-bullet-active', // class للـ active
//   // لو عايزة renderBullet custom (مش ضروري دلوقتي)
//   // renderBullet: (index: number, className: string) => {
//   //   return `<span class="${className}"></span>`;
//   // },
// }}
//       >
//         {listOfImages.map((src) => (
//           <SwiperSlide key={src} className="h-full">
//             <img src={src} className="w-full h-full object-cover" alt={src} />
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,#00C950E5,#05DF7280)]" />

//             {/* ✅ النص جوه الـ Slide */}
//             <div className="absolute inset-0 flex flex-col justify-center px-16 z-10">
//               <h2 className="text-white text-4xl font-bold leading-tight max-w-sm">
//                 Fresh Products Delivered to your Door
//               </h2>
//               <p className="text-white mt-2 text-sm">
//                 Get 20% off your first order
//               </p>
//               <div className="flex gap-3 mt-5">
//   {/* Shop Now */}
//   <button className="bg-white text-green-600 font-semibold 
//     px-6 py-2 rounded-lg
//     hover:scale-105 transition-transform duration-200 cursor-pointer
//     border-none text-sm">
//     Shop Now
//   </button>

//   {/* View Deals */}
//   <button className="bg-transparent text-white font-semibold 
//     px-6 py-2 rounded-lg
//     border-2 border-white/50
//     hover:scale-105 transition-transform duration-200 cursor-pointer
//     text-sm">
//     View Deals
//   </button>
// </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* ✅ Prev Arrow */}
//       <button
//         onClick={() => swiperRef.current?.slidePrev()}
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
//           w-12 h-12 rounded-full bg-white/90 shadow-md
//           flex items-center justify-center
//           hover:scale-110 transition-all duration-200 cursor-pointer border-none"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700"
//           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>

//       {/* ✅ Next Arrow */}
//       <button
//         onClick={() => swiperRef.current?.slideNext()}
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
//           w-12 h-12 rounded-full bg-white/90 shadow-md
//           flex items-center justify-center
//           hover:scale-110 transition-all duration-200 cursor-pointer border-none"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700"
//           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
//     </div>
//   );
// }

"use client"

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination} from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

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
        }}
      >
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
                <button className="bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer border-none text-sm">
                  Shop Now
                </button>
                <button className="bg-transparent text-white font-semibold px-6 py-2 rounded-lg border-2 border-white/50 hover:scale-105 transition-transform duration-200 cursor-pointer text-sm">
                  View Deals
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-pointer border-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-pointer border-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}