"use server";

import { LoginType} from "@/schemas/authSchemas.schemas";
export async function UserLogin(data:LoginType) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, 
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        },
    );
    const result = await res.json();
    console.log(result);
    return res.ok;
}