import {CategoryType, ProductType } from "../types/product.type";




export async function getAllProducts() : Promise<ProductType[] | undefined>{
    try{
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products` , {
      cache: "force-cache"
    });
    const data = await res.json();
    // console.log("data", data.data);
    return data.data;
    }
    catch (err){
    return undefined;
    }
  }

 export async function getSingleProduct(id:string) : Promise <ProductType | undefined> {
  try{
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  const data = await res.json()
  return data.data
  }
  catch(err){
 return undefined;
  }
}

export async function getAllCategories() : Promise<CategoryType[] | undefined>{
    try{
     const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
     const data = await res.json();
    //  console.log("data" , data.data)
    return data.data
    }
    catch(err){
    return undefined
    }
}


////////

export async function getSingleCategory(id: string): Promise<CategoryType | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

export async function getProductsByCategory(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    return undefined;
  }
}