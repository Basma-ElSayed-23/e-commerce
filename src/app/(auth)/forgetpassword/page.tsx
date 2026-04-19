"use client";
import React, { useState } from "react";
import Image from "next/image";
import loginImg from '@/assets/images/login.png';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { FaLock, FaShieldAlt } from "react-icons/fa";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendCode() {
    if (!email) { toast.error("Please enter your email"); return; }
    setLoading(true);          
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.statusMsg === "success") {
        toast.success("Reset code sent to your email");
        setStep(2);
      } else {
        toast.error(data.message || "Failed to send code");
      }
    } catch { toast.error("Something went wrong"); }
    setLoading(false);
  }

  async function handleVerifyCode() {
    if (!code) { toast.error("Please enter the code"); return; }
    setLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode: code }),
      });
      const data = await res.json();
      if (data.status === "Success") {
        toast.success("Code verified!");
        setStep(3);
      } else {
        toast.error(data.message || "Invalid code");
      }
    } catch { toast.error("Something went wrong"); }
    setLoading(false);
  }

  async function handleResetPassword() {
    if (!newPassword) { toast.error("Please enter new password"); return; }
    setLoading(true);
    try {                     
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (data.token) {
        toast.success("Password reset successfully!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch { toast.error("Something went wrong"); }
    setLoading(false);
  }

  return (
    <div className="bg-[#f5f7f9] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:flex flex-col items-center text-center">
  
  <div className="w-87.5 h-70 bg-green-50 rounded-2xl flex items-center justify-center mb-6 relative">
    <div className="flex items-end gap-4">
  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center self-end mb-4">
    <MdEmail className="text-3xl text-green-500" />
  </div>
  <div className="w-20 h-20 bg-green-500 rounded-2xl shadow-lg flex items-center justify-center">
    <FaLock className="text-4xl text-white" />
  </div>
  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center self-end mb-4">
    <FaShieldAlt className="text-3xl text-green-500" />
  </div>
</div>
    <div className="absolute bottom-6 flex gap-2">
      <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
      <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
      <span className="w-3 h-3 rounded-full bg-green-600 inline-block"></span>
    </div>
  </div>

  <h2 className="text-[20px] font-semibold mb-2">Reset Your Password</h2>
  <p className="text-gray-500 text-sm mb-6 max-w-100">
    Don't worry, it happens to the best of us. We'll help you get back into your account in no time.
  </p>
  <div className="flex gap-6 text-sm text-gray-600">
  <span className="flex items-center gap-1"><MdEmail className="text-green-500" /> Email Verification</span>
  <span className="flex items-center gap-1"><FaShieldAlt className="text-green-500" /> Secure Reset</span>
  <span className="flex items-center gap-1"><FaLock className="text-green-500" /> Encrypted</span>
</div>
</div>

        
        <div className="mx-auto w-full max-w-154 bg-white rounded-[16px] p-8 custom-shadow">

          <h2 className="text-[22px] font-bold text-green-600 text-center">FreshCart</h2>
          <h3 className="text-[16px] font-semibold text-center mb-2">Forgot Password?</h3>
          <p className="text-center text-gray-400 text-sm mb-6">No worries, we'll send you a reset code</p>
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                  ${step >= s ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                  {s === 1 ? "✉️" : s === 2 ? "🔑" : "🔒"}
                </div>
                {s < 3 && <div className={`h-1 w-12 rounded ${step > s ? "bg-green-600" : "bg-gray-200"}`} />}
              </React.Fragment>
            ))}
          </div>

          
          {step === 1 && (
            <>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"/>
              <button
                onClick={handleSendCode}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </>)}

          
          {step === 2 && (
            <>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Reset Code</label>
              <input
                type="text"
                placeholder="Enter the code from your email"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"/>
              <button
                onClick={handleVerifyCode}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </>
 )}
          {step === 3 && (
            <>
              <label className="text-sm font-medium text-gray-700 mb-1 block">New Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"/>
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}
          <Link href="/login" className="block text-center text-sm text-green-600 mt-4">
            ← Back to Sign In
          </Link>
          <p className="text-center text-sm mt-2 text-gray-500">
            Remember your password?{" "}
            <Link href="/login" className="text-green-600 font-medium">Sign In</Link>
          </p>
        </div>
      </div>
      <style>{`
        .custom-shadow {
          box-shadow: 0px 8px 10px rgba(0,0,0,0.10), 0px 20px 25px rgba(0,0,0,0.10);
        }
      `}</style>
    </div>
  );
}
