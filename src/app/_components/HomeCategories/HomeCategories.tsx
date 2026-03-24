import { getAllCategories } from '@/api/services/routemisr.service';
import { CategoryType } from '@/api/types/product.type';
import React from 'react'

export default async function HomeCategories() {


const allCategories = await getAllCategories()

  return <>
  <div className='w-[90%] mx-auto my-8'>
  <h1 className='text-[30px] leading-9 font-bold font-[var--(font-family)] border-s-8 
    border-[#16A34A] ps-2 mb-6 text-gray-800'>Shop By<span className=' text-emerald-600'>Category</span>
 </h1>
 <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4'>
 {allCategories?.map((category) => <div key={category._id}>
  <div className='rounded-lg border p-4 flex flex-col gap-3 items-center shadow-[0px_1px_2px_-1px_rgba(0,0,0,0,1),0px_1px_3px_0px_rgba(0,0,0,0,1)]
   hover:shadow-xl transition-all
   bg-white h-37 justify-center'>
  <img src={category.image} className='size-20 rounded-full object-cover'  alt="" />
   <h2 className='text-sm font-medium text-center'>{category.name}</h2>
  </div>
   
  </div>)}
  </div>
 </div>
  
    
 </>
}
