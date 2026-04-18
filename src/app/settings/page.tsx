"use client";

import Link from "next/link";
import { User, Settings as SettingsIcon, MapPin } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Green Header - نفس الـ Header */}
      <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 pt-6 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-sm text-white/80 flex items-center gap-2 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">My Account</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Account</h1>
              <p className="text-white/80 mt-1">Manage your addresses and account settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 pb-12">
        <div className="flex gap-8">
          {/* Sidebar - نفس الـ Sidebar */}
          <div className="w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <p className="font-semibold text-gray-800">My Account</p>
              </div>

              <nav className="p-3">
                <Link
                  href="/profile/addresses"
                  className="flex items-center justify-between px-5 py-4 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors mb-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-500" />
                    </div>
                    <span>My Addresses</span>
                  </div>
                  <span>›</span>
                </Link>

                <Link
                  href="/profile/settings"
                  className="flex items-center justify-between px-5 py-4 rounded-xl bg-emerald-50 text-emerald-700 font-medium"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <SettingsIcon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span>Settings</span>
                  </div>
                  <span>›</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="mb-9">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <p className="text-gray-500 mt-1">Manage your account settings</p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-center py-20 text-lg">
                Settings page content will be here...
                <br />
                (يمكنك إضافة نموذج تعديل البروفايل، تغيير كلمة السر، إلخ)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}