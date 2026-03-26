// import React from 'react'

// export default function Register() {
//   return (
//     <div>Register-page</div>
//   )
// }

//https://ecommerce.routemisr.com/api/v1/auth/signup

"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ── helpers ──────────────────────────────────────────────────────────────────
function getPasswordStrength(password: string): {
  label: string;
  color: string;
  width: string;
} {
  if (!password) return { label: "", color: "", width: "0%" };
  if (password.length < 6) return { label: "Weak", color: "bg-red-500", width: "25%" };
  if (password.length < 8) return { label: "Fair", color: "bg-yellow-400", width: "50%" };
  if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/.test(password))
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  return { label: "Good", color: "bg-blue-500", width: "75%" };
}

// ── validation schema ─────────────────────────────────────────────────────────
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters with numbers and symbols")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
      "Must be at least 8 characters with numbers and symbols"
    )
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string()
    .matches(/^(\+20|0)?1[0125]\d{8}$/, "Enter a valid Egyptian phone number")
    .required("Phone number is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the Terms of Service"),
});

// ── component ─────────────────────────────────────────────────────────────────
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
    onSubmit: async (values) => {
      setLoading(true);
      setApiError(null);
      try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

  const strength = getPasswordStrength(formik.values.password);

  // ── field helper ────────────────────────────────────────────────────────────
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
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          <span className="text-green-600 ml-0.5">*</span>
        </label>
        <div className="relative">
          <input
            id={id}
            {...formik.getFieldProps(id)}
            type={type}
            placeholder={placeholder}
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none
              ${touched && error
                ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white"
              }`}
          />
          {extra}
        </div>
        {touched && error && (
          <p className="text-xs text-red-500 mt-1">{error as string}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── main content ───────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row">

              {/* ── LEFT PANEL ──────────────────────────────────────────────── */}
              <div className="lg:w-5/12 bg-gradient-to-br from-green-50 to-emerald-50 p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    Welcome to{" "}
                    <span className="text-green-600">FreshCart</span>
                  </h1>
                  <p className="text-gray-500 text-base leading-relaxed">
                    Join thousands of happy customers who enjoy fresh groceries
                    delivered right to their doorstep.
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-5 mb-10">
                  {[
                    {
                      icon: "⭐",
                      bg: "bg-green-100",
                      title: "Premium Quality",
                      desc: "Premium quality products sourced from trusted suppliers.",
                    },
                    {
                      icon: "🚚",
                      bg: "bg-blue-100",
                      title: "Fast Delivery",
                      desc: "Same-day delivery available in most areas.",
                    },
                    {
                      icon: "🛡️",
                      bg: "bg-purple-100",
                      title: "Secure Shopping",
                      desc: "Your data and payments are completely secure.",
                    },
                  ].map((f) => (
                    <li key={f.title} className="flex items-start gap-4">
                      <span
                        className={`${f.bg} w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0`}
                      >
                        {f.icon}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Testimonial */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      SJ
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Sarah Johnson</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed italic">
                    "FreshCart has transformed my shopping experience. The quality of the
                    products is outstanding, and the delivery is always on time. Highly
                    recommend!"
                  </p>
                </div>
              </div>

              {/* ── RIGHT PANEL — FORM ───────────────────────────────────────── */}
              <div className="lg:w-7/12 p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
                    Create Your Account
                  </h2>
                  <p className="text-gray-500 text-sm text-center mb-8">
                    Start your fresh journey with us today
                  </p>

                  {/* Social buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-3 bg-white text-gray-400">or</span>
                    </div>
                  </div>

                  {/* API Error */}
                  {apiError && (
                    <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                      <span className="text-red-500 text-sm">⚠️</span>
                      <p className="text-red-600 text-sm">{apiError}</p>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
                    {/* Name */}
                    <Field id="name" label="Name" placeholder="Ali" />

                    {/* Email */}
                    <Field id="email" label="Email" type="email" placeholder="ali@example.com" />

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password<span className="text-green-600 ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          {...formik.getFieldProps("password")}
                          type={showPassword ? "text" : "password"}
                          placeholder="create a strong password"
                          className={`w-full px-4 py-3 pr-10 rounded-lg border text-sm transition-all outline-none
                            ${formik.touched.password && formik.errors.password
                              ? "border-red-400 bg-red-50"
                              : "border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white"
                            }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
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
                      {/* Strength bar */}
                      {formik.values.password && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="w-full bg-gray-200 rounded-full h-1 mr-2">
                              <div
                                className={`h-1 rounded-full transition-all duration-300 ${strength.color}`}
                                style={{ width: strength.width }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 flex-shrink-0">{strength.label}</span>
                          </div>
                        </div>
                      )}
                      {formik.touched.password && formik.errors.password && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
                      )}
                      {!formik.errors.password && (
                        <p className="text-xs text-gray-400 mt-1">
                          Must be at least 8 characters with numbers and symbols
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password<span className="text-green-600 ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="rePassword"
                          {...formik.getFieldProps("rePassword")}
                          type={showConfirm ? "text" : "password"}
                          placeholder="confirm your password"
                          className={`w-full px-4 py-3 pr-10 rounded-lg border text-sm transition-all outline-none
                            ${formik.touched.rePassword && formik.errors.rePassword
                              ? "border-red-400 bg-red-50"
                              : "border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white"
                            }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
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
                        <p className="text-xs text-red-500 mt-1">{formik.errors.rePassword}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <Field id="phone" label="Phone Number" type="tel" placeholder="+1 234 567 8900" />

                    {/* Terms */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          id="terms"
                          type="checkbox"
                          {...formik.getFieldProps("terms")}
                          checked={formik.values.terms}
                          className="mt-0.5 w-4 h-4 accent-green-600 cursor-pointer flex-shrink-0"
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the{" "}
                          <Link href="/terms" className="text-green-600 hover:underline font-medium">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-green-600 hover:underline font-medium">
                            Privacy Policy
                          </Link>{" "}
                          <span className="text-green-600">*</span>
                        </span>
                      </label>
                      {formik.touched.terms && formik.errors.terms && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.terms}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Create My Account
                        </>
                      )}
                    </button>

                    {/* Sign in link */}
                    <p className="text-center text-sm text-gray-500 pt-1">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="text-green-600 hover:text-green-700 font-semibold hover:underline"
                      >
                        Sign In
                      </Link>
                    </p>
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