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

// export async function getProductsByCategory(id: string) {
//   try {
//     const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     return undefined;
//   }
// }
export async function getProductsByCategory(id: string, subcategoryId?: string) {
  try {
    let url = `https://ecommerce.routemisr.com/api/v1/products?category=${id}`;
    if (subcategoryId) url += `&subcategory=${subcategoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    return undefined;
  }
}

export async function getSubcategoriesByCategory(categoryId: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}