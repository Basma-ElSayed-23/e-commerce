import React from 'react'
import { FaStar } from "react-icons/fa";  
import { ProductType } from '@/api/types/product.type';
import AddBtn from '@/app/_components/AddBtn/AddBtn';
import { getSingleProduct } from '@/api/services/routemisr.service';


//https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b

// export default async function productDetails(props :{params : Promise<{id : string}>}) {

// const params = await props.params
// const id = params.id

export default async function ProductDetails({ params }: { params:Promise < { id: string } > }) {

const { id } = await params

const myProduct = await getSingleProduct(id)

  return (
    <>
    <div className='w-[70%] mx-auto flex'>
      <div className='w-1/4 p-3'>
      <img src={myProduct?.imageCover} alt={myProduct?.title} className='flex items-center justify-center' />
      <div className='flex'>
        {myProduct?.images.map((src) => <div key={src} className='w-1/3 my-2 me-1 ms-1'>
          <img src={src} alt={src} />
          </div> )} 
      </div>
      </div>
      
      <div className='w-3/4 p-3'>
      <h2 className='text-2xl font-bold'>{myProduct?.title}</h2>
      <h3 className='my-5 font-bold'>{myProduct?.description}</h3>
      <div className='flex gap-2 items-center'>
        <span>Price:</span>
 <span className='text-[#16A34A] font-bold text-lg'>{myProduct?.priceAfterDiscount}</span>
  <span className='text-sm text-slate-600 line-through'>{myProduct?.price}</span>
  </div>
  <div className='rate flex items-center gap-2'><FaStar className='text-yellow-300' /> <FaStar className='text-yellow-300' /> 
      <FaStar className='text-yellow-300' /> <FaStar className='text-yellow-300' /> <FaStar />
      {myProduct?.ratingAverage}
      {`(${myProduct?.ratingsQuantity})`} reviews
  </div>
 <AddBtn id={id} word='Add to cart' classes='bg-green-500 text-white px-4 py-2 rounded'/>
      </div>
      </div>
      
    </>
    
  )
}

































