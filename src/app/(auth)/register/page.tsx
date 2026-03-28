"use client"

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { email } from 'zod';
import { useEffect } from 'react';
import Image from 'next/image';
import sarahImg from '@/assets/images/sarah.png'
import { FaStar, FaTruck, FaShieldAlt } from "react-icons/fa";



//https://ecommerce.routemisr.com/api/v1/auth/signup  


function getPasswordStrength(password: string) : {
    label: string;
    color: string;
    width: string;
}
{
    if (!password) return {label: "",color: "", width: "0%"};
    if (password.length < 6) return {label: "Weak", color: "bg-red-500", width: "25%"};
    if (password.length < 8) return {label: "Fair", color: "bg-yellow-400", width: "50%"};
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/.test(password))
        return {label: "Strong", color: "bg-green-500", width: "100%"};
       return {label: "Good", color: "bg-blue-500", width: "75%"};
}

//validation Schema

const validationSchema = Yup.object({
    name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .required ("Name is required"),
    email: Yup.string()
    .email("Invalid email address")
     .required ("Email is required"),
    password: Yup.string()
    .min(8, "Must be at least 8 characters with numbers and symbols")
    .matches (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
        "Must be at least 8 characters with numbers and symbols"
    )
  .required("password is required"),
  rePassword: Yup.string()
  .oneOf([Yup.ref("password")], "Passwords must match")
  .required("Confirm password is required"),
  phone: Yup.string()
  .matches(/^(\+20|0)?1[0125]\d{8}$/, "Enter a valid Egyptian phone number")
  .required("Phone number is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the Terms of Service"),
});

export default function Register() {
const router = useRouter();
const [apiError, setApiError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);


const formik = useFormik({
    initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
        terms: false,
    },

    validationSchema,
    onSubmit: async (values, {resetForm}) => {
        setLoading(true);
        setApiError(null);
        try {
       const res = await fetch (`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            rePassword: values.rePassword,
            phone: values.phone,
        }),
       });
       const data = await res.json();
       if (data.message === "success") {
        resetForm();
        router.push("/login");
       } else {
        setApiError(data.message || "Something went wrong. Please try again.");
       }
        } catch (err) {
            setApiError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    },
});

useEffect(() => {
    formik.resetForm();
}, []);


// useEffect(() => {
//   formik.resetForm();
// }, []);

const strength = getPasswordStrength(formik.values.password);

//field

const Field = ({
    id,
    label,
    type = "text",
    placeholder,
    extra,
}: {
    id: keyof typeof formik.values;
    label: string;
    type?: string;
    placeholder: string;
    extra?: React.ReactNode;
}) => {
    const touched = formik.touched[id];
    const error = formik.errors[id];
    return (
        <div>
            <label htmlFor={id} className='text-sm font-medium block text-[#364153] mb-1'>
                {label}
                <span className='text-gray-500 ml-0.5'>*</span>
            </label>
            <div className='relative'>
                <input
                id={id}
                {...formik.getFieldProps(id)}
                type={type}
                placeholder={placeholder}
                className={`w-full py-3 px-4 rounded-lg border text-sm transition-all outline-none
                    ${touched && error
                        ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white"
                    }`}
                />
             {extra}
            </div>
            {touched && error && (
                <p className='mt-1 text-xs text-red-500'>{error as string}</p>
            )}
        </div>
    );
};


return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
        {/**main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 lg:py-12">
    <div className="max-w-7xl mx-auto w-full">
        <div className="border border-gray-100 overflow-hidden bg-white rounded-3xl shadow-sm">
            {/* Responsive Container */}
            <div className="flex flex-col lg:flex-row min-h-[640px]">
                        {/**left content */}
                        <div className='lg:w-5/12 bg-gradient-to-br from-green-50 to-emerald-50 p-8 lg:p-12 flex flex-col'>
                        <div className='mb-8'>
                            <h1 className='text-4xl md:text-4xl lg:text-5xl font-bold text-[#364153] leading-tight mb-3'>
                                Welcome to <span className='text-[#16A34A]'>FreshCart</span>
                            </h1>
                            <p className='text-[#364153] font-medium text-lg md:text-xl leading-relaxed'>
                            Join thousands of happy customers who enjoy fresh groceries
                            delivered right to their doorstep.
                            </p>
                            </div>
                            {/**features*/}
                            <ul className='mb-10 space-y-5'>
                                {[
                                    {
                                        icon: <FaStar className='w-5 h-5 text-[#16A34A] '/>,
                                        bg: "bg-[#BBF7D0]",
                                        title: "Premium Quality",
                                        desc: "Premium quality products sourced from trusted suppliers."
                                    },
                                    {
                                        icon: <FaTruck className='w-5 h-5 text-[#16A34A]'/>,
                                        bg: "bg-[#BBF7D0]",
                                        title: "Fast Delivery",
                                        desc: "Same-day delivery available in most areas."
                                    },
                                    {
                                        icon: <FaShieldAlt className='w-5 h-5 text-[#16A34A]'/>,
                                        bg: "bg-[#BBF7D0]",
                                        title: "Secure Shopping",
                                        desc: "Your data and payments are completely secure"
                                    },
                                ].map((f) => (
                                    <li key={f.title}className='flex items-start gap-4'>
                                        <span className={`${f.bg} w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0`}>
                                            {f.icon}
                                        </span>
                                        <div>
                                            <p className='font-semibold text-gray-800 text-sm'>{f.title}</p>
                                            <p className='text-gray-500 text-xs mt-0.5'>{f.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {/**testimonial */}
                            <div className='bg-white rounded-xl p-5 shadow-sm border border-gray-100'>
                                <div className='flex items-center gap-3 mb-3'>
                                    <div className='w-12 h-12 rounded-full  overflow-hidden border border-white  shadow-sm shrink-0'
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '9999px',
                                        opacity: 1,
                                    }}
                                    >
                                        <Image src={sarahImg} alt="Sarah Johnson" width={48} height={48} className='w-full h-full object-cover'/>
                                        {/* <img src="src/assets/images/sarah.png" alt="Sarah Johnson" className='w-full h-full object-cover' /> */}
                                    </div>
                                    <div>
                                        <p className='font-semibold text-[#364153] text-sm'>Sarah Johnson</p>
                                        <div className='flex gap-0.5 mt-0.5'>
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className='text-[#FFDF20]' width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path d="M9.26802 0.409375C9.1399 0.159375 8.88052 0 8.59927 0C8.31802 0 8.05865 0.159375 7.93052 0.409375L5.63052 4.91563L0.633649 5.70937C0.355524 5.75312 0.124274 5.95 0.0367741 6.21875C-0.0507259 6.4875 0.0211491 6.78125 0.218024 6.98125L3.79302 10.5594L3.00552 15.5562C2.96177 15.8344 3.0774 16.1156 3.30552 16.2812C3.53365 16.4469 3.83365 16.4719 4.08677 16.3438L8.59927 14.05L13.1086 16.3438C13.3586 16.4719 13.6618 16.4469 13.8899 16.2812C14.118 16.1156 14.2336 15.8375 14.1899 15.5562L13.3993 10.5594L16.9743 6.98125C17.1743 6.78125 17.243 6.4875 17.1555 6.21875C17.068 5.95 16.8399 5.75312 16.5586 5.70937L11.5649 4.91563L9.26802 0.409375Z" fill="#FFDF20"/>
                                               </svg>
//                                                <svg key={i} className="w-3 h-3 text-[#FFDF20] fill-current" viewBox="0 0 20 20">
// //                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //                           </svg>

                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className='text-[#4A5565] italic leading-relaxed text-xs'>"FreshCart has transformed my shopping experience. The
                               quality of the products is outstanding, and the delivery is
                               always on time. Highly recommend!"</p>
                            </div>
                            </div>
                            {/** right content*/}
                            <div className='lg:w-7/12 p-6 md:p-10 lg:p-12 flex items-center'>
                            <div className='max-w-md mx-auto w-full'>
                                <h2 className='text-2xl md:text-[30px] font-semibold text-[#364153] text-center tracking-normal leading-9 mb-2'>
                                    Create Your Account 
                                </h2>
                                <p className='text-[#364153] font-medium text-base leading-6 tracking-normal text-center mb-8'>Start your fresh journey with us today</p>
                                {/** social btns*/}
                                <div className='grid grid-cols-2 gap-3 mb-6'>
                                    <button type='button' 
                                    className='flex items-center justify-center gap-2 px-4 py-3 border text-[#101828] border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all'>
                                        <svg className='text-[#E7000B]' width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.625 8.18125C17.625 12.6031 14.5969 15.75 10.125 15.75C5.8375 15.75 2.375 12.2875 2.375 8C2.375 3.7125 5.8375 0.25 10.125 0.25C12.2125 0.25 13.9688 1.01562 15.3219 2.27813L13.2125 4.30625C10.4531 1.64375 5.32188 3.64375 5.32188 8C5.32188 10.7031 7.48125 12.8938 10.125 12.8938C13.1938 12.8938 14.3438 10.6938 14.525 9.55313H10.125V6.8875H17.5031C17.575 7.28437 17.625 7.66562 17.625 8.18125Z" fill="#E7000B"/>
                                     </svg>
                                     {/* <svg className="w-4 h-4" viewBox="0 0 24 24">
                         <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                         <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                       </svg> */}
                                     Google 
                                    </button>
                                    <button type='button'
                                    className='flex items-center justify-center gap-2 px-4 py-3 border text-[#101828] border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all'>
                                       <svg className='text-[#155DFC]' width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 8C18 3.58125 14.4187 0 10 0C5.58125 0 2 3.58125 2 8C2 11.75 4.58437 14.9 8.06875 15.7656V10.4438H6.41875V8H8.06875V6.94688C8.06875 4.225 9.3 2.9625 11.975 2.9625C12.4813 2.9625 13.3562 3.0625 13.7156 3.1625V5.375C13.5281 5.35625 13.2 5.34375 12.7906 5.34375C11.4781 5.34375 10.9719 5.84062 10.9719 7.13125V8H13.5844L13.1344 10.4438H10.9688V15.9406C14.9312 15.4625 18 12.0906 18 8Z" fill="#155DFC"/>
                                     </svg>
                                       {/* <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg> */}
                                            Facebook
                                    </button>
                                </div>
                                 {/** Divider*/}
                                 <div className='relative my-8'> 
                                    <div className='absolute inset-0 flex items-center'>
                                        <div className='w-[552px] h-[2px] border-t border-[#D1D5DC4D]'></div>
                                        </div>
                                        <div className='relative flex justify-center text-xs'>
                                            <span className=' font-main px-3 font-medium leading-6 text-base tracking-normal text-[#364153] bg-white'>or</span>
                                    </div>
                                    </div>
                                   
                                     {/** Apis Error*/}
                                     {apiError && (
                                        <div className='mb-5 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2'>
                                            <span className='text-red-500 text-sm'>⚠️</span>
                                            <p className='text-red-600 text-sm'>{apiError}</p>
                                        </div>
                                        
                                     )} 
                                     <form onSubmit={formik.handleSubmit} className='space-y-4' noValidate autoComplete='off'>
                                        <div>
                                            <label htmlFor="name" className='block text-sm font-medium text-[#364153] mb-2'>
                                                Name <span>*</span>
                                            </label>
                                            <input type="name"
                                            {...formik.getFieldProps("name")} placeholder='"Ali' autoComplete='off' 
                                            className={`w-full px-4 py-3 rounded-lg border text-sm
                                            ${formik.touched.name && formik.errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-gray-500"}`}
                                             />
                                             {formik.touched.name && formik.errors.name && (
                                                <p className='text-red-500 text-xs mt-1'>{formik.errors.name}</p>
                                             )}
                                        </div>
                                        {/* <Field id='name' label='Name' placeholder='Ali' autoComplete='off'/> */}
                                        <div>
                                            <label htmlFor="email" className='block text-sm font-medium text-[#364153] mb-2'>
                                                Email <span>*</span>
                                            </label>
                                            <input id='email' type="email"
                                            {...formik.getFieldProps("email")} placeholder='ali@example.com' autoComplete='off' 
                                            className={`w-full px-4 py-3 rounded-lg border text-sm transition-all 
                                            ${formik.touched.email && formik.errors.email 
                                                ? "border-red-400 bg-red-50" 
                                                : "border-gray-200 bg-gray-50 focus:border-[#16A34A] focus:ring-green-100 focus:bg-white"}`}
                                             />
                                             {formik.touched.email && formik.errors.email && (
                                                <p className='text-red-500 text-xs mt-1'>{formik.errors.email}</p>
                                             )}
                                        </div>
                                         {/* <Field id='email' label='Email' type='email' placeholder='ali@example.com'/> */}

                                         {/** password*/}
                                         <div>
                                            <label htmlFor="password" className='block text-sm font-medium text-[#364153] mb-1'>
                                                Password <span className='ml-0.5'>*</span>
                                            </label>
                                            <div className='relative'>
                                                <input id="password"
                                                {...formik.getFieldProps("password")}
                                                type={showPassword ? "text" : "password"} placeholder='create a strong password' 
                                                autoComplete='off'
                                                className={`w-full px-4 py-3 pr-10 rounded-lg border text-sm transition-all outline-none
                                                    ${formik.touched.password && formik.errors.password
                                                ? "border-red-400 bg-red-50"
                                                : "border-gray-200 bg-gray-50 focus:border-gray-500 focus:ring-2 focus:ring-green-100 focus:bg-white"}`}
                                                />
                                                <button type='button'
                                                onClick={() => setShowPassword(!showPassword)}
                                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                                                    {showPassword ? (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                             </svg>
                           ) : (
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                           </svg>
                                                    )}
                                                </button>
                                            </div>
                                             {/* strong word*/}
                                             {formik.values.password && (
                                                <div className='mt-2 space-y-2'>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='flex-1 bg-gray-200 rounded-full h-1 overflow-hidden'>
                                                            <div className={`h-1 rounded-full transition-all duration-300 ${strength.color}`}
                                                            style={{width: strength.width}}>
                                                            </div>
                                                            </div>
                                                            <span className='text-xs font-medium text-gray-500 shrink-0'>{strength.label}</span>
                                                        </div>
                                                    
                                             {formik.touched.password && formik.errors.password ? (
                                                <p className='text-xs text-red-500 mt-1 leading-4 font-medium'>
                                                    {formik.errors.password}</p>
                                             ) : (
                                                 <p className='leading-4 font-medium text-[#6A7282] mt-1 '>
                                                    Must be at least 8 characters with numbers and symbols
                                                </p>
                                             )}
                                            </div>
                                             )}
                                              
                                         {/*confirm password */}
                                         <div>
                                            <label htmlFor="rePassword" className='block text-sm font-medium text-[#364153] mb-1 mt-5'>
                                                Confirm Password*
                                            </label>
                                            <div className='relative'>
                                                <input id="rePassword" 
                                                {...formik.getFieldProps("rePassword")}
                                                type = {showConfirm ? "text" : "password"}
                                                placeholder='confirm your password'
                                                className={`w-full px-4 py-3 pr-10 rounded-lg border text-sm transition-all outline-none
                                                    ${formik.touched.rePassword && formik.errors.rePassword
                                                        ? "border-red-400 bg-red-50"
                                                        : "border-gray-200 bg-gray-50 focus::ring-2 focus:ring-green-100 focus:bg-white"
                                                    }`}
                                                />
                                                <button type='button'
                                                onClick={() => setShowConfirm(!showConfirm)}
                                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                                                    {showConfirm ? (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                     </svg>
                                                    ) : (
                                                    
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                             </svg>
                                                    )}
                                                </button>
                                            </div>
                                            {formik.touched.rePassword && formik.errors.rePassword && (
                                                <p className='text-red-500 mt-1 text-xs'>{formik.errors.rePassword}</p>
                                            )}
                                         </div>
                                         <div className='mt-3 mb-3'>
                                            {/* <Field id='phone' label='Phone Number' type='tel' placeholder='+1 234 567 8900'/> */}
                                            <div>
                                            <label htmlFor="phone" className='block text-sm font-medium text-[#364153] mb-2'>
                                                Phone Number <span>*</span>
                                            </label>
                                            <input id='phone' type="tel"
                                            {...formik.getFieldProps("phone")} autoComplete='off' 
                                            className={`w-full px-4 py-3 rounded-lg border text-sm transition-all 
                                            ${formik.touched.phone && formik.errors.phone 
                                                ? "border-red-400 bg-red-50" 
                                                : "border-gray-200 bg-gray-50 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100 focus:bg-white"}`}
                                             />
                                             {formik.touched.phone && formik.errors.phone && (
                                                <p className='text-red-500 text-xs mt-1'>{formik.errors.phone}</p>
                                             )}
                                        </div>

                                         </div>
                                         
                                         <div>
                                            <label className='flex items-start cursor-pointer gap-3 group'>
                                                <input id='terms' type="checkbox" 
                                                {...formik.getFieldProps("terms")}
                                                checked={formik.values.terms}
                                                className='cursor-pointer shrink-0 accent-green-600 w-4 h-4 mt-1'/>
                                                <span className='font-medium text-[#364153]'>I agree to the{" "}
                                                <Link href="/terms" className='text-[#16A34A]  font-medium tracking-normal align-middle leading-normal text-base'>
                                                Privacy Policy</Link> {" "}
                                                <span>*</span>
                                                </span>
                                            </label>
                                            {formik.touched.terms && formik.errors.terms && (
                                                <p className='text-xs text-red-500 mt-1'>{formik.errors.terms}</p>
                                            )}
                                         </div> 
                                         {/* btn submit */}
                                         <button disabled= {loading} type="submit" 
                                         className='w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#16A34A] disabled:bg-green-400 text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md disabled:cursor-not-allowed'
                                         > {loading ? (
                                            <>
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                      </svg>
                                      Creating Account...
                                            </>
                                         ):(
                                            <>
                                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.25 4C4.25 3.00544 4.64509 2.05161 5.34835 1.34835C6.05161 0.645088 7.00544 0.25 8 0.25C8.99456 0.25 9.94839 0.645088 10.6517 1.34835C11.3549 2.05161 11.75 3.00544 11.75 4C11.75 4.99456 11.3549 5.94839 10.6517 6.65165C9.94839 7.35491 8.99456 7.75 8 7.75C7.00544 7.75 6.05161 7.35491 5.34835 6.65165C4.64509 5.94839 4.25 4.99456 4.25 4ZM1.5 15.0719C1.5 11.9937 3.99375 9.5 7.07188 9.5H8.92813C12.0063 9.5 14.5 11.9937 14.5 15.0719C14.5 15.5844 14.0844 16 13.5719 16H2.42812C1.91562 16 1.5 15.5844 1.5 15.0719ZM17 3C17.4156 3 17.75 3.33437 17.75 3.75V5.25H19.25C19.6656 5.25 20 5.58437 20 6C20 6.41563 19.6656 6.75 19.25 6.75H17.75V8.25C17.75 8.66562 17.4156 9 17 9C16.5844 9 16.25 8.66562 16.25 8.25V6.75H14.75C14.3344 6.75 14 6.41563 14 6C14 5.58437 14.3344 5.25 14.75 5.25H16.25V3.75C16.25 3.33437 16.5844 3 17 3Z" fill="white"/>
</svg>

                                            {/* <svg className="w-4 h-4" fill="none" stroke="cur
                                            rentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                          </svg> */}
                                          
                                          Create My Account
                                            </>
                                         )}
                                         </button>
                                         {/**signin */}
                                         <p className='text-center text-sm text-[#364153] pt-1 mt-4'>
                                            Already have an account? {" "}
                                            <Link href="/login" className='text-[#16A34A] hover:text-green-700 font-semibold hover:underline'>
                                            Sign In
                                         </Link>
                                         </p>
                                         </div>
                                     </form>
                                 
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </main>
    </div> 
);
}
                                                                                                 

