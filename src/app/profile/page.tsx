// import React from 'react'

// export default function page() {
//   return (
//     <div>profile-page</div>
//   )
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, User, Settings, Plus, SettingsIcon } from "lucide-react";

interface Address {
  id: string;
  name: string;
  city: string;
  phone: string;
}

const MOCK_ADDRESSES: Address[] = [];

export default function MyAddresses() {
  const [addresses] = useState<Address[]>(MOCK_ADDRESSES);

  const handleAddAddress = () => {
    console.log("Add new address clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Green Header */}
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
          {/* Sidebar */}
          <div className="w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <p className="font-semibold text-gray-800">My Account</p>
              </div>

              <nav className="p-3">
                <Link
                  href="/profile/addresses"
                  className="flex items-center justify-between px-5 py-4 rounded-xl bg-emerald-50 text-emerald-700 font-medium mb-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span>My Addresses</span>
                  </div>
                  <span>›</span>
                </Link>

                <Link
                  href="/profile/settings"
                  className="flex items-center justify-between px-5 py-4 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                      <SettingsIcon className="w-5 h-5 text-gray-500" />
                    </div>
                    <span>Settings</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Addresses Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-9">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
                <p className="text-gray-500 mt-1">Manage your saved delivery addresses</p>
              </div>

              <button
                onClick={handleAddAddress}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Address
              </button>
            </div>

            {addresses.length === 0 && (
              <div className="bg-white rounded-3xl py-16 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-7">
                  <MapPin className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No Addresses Yet</h3>
                <p className="text-gray-500 max-w-xs leading-relaxed mb-8">
                  Add your first delivery address to make checkout faster and easier.
                </p>
                <button
                  onClick={handleAddAddress}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-2xl font-medium transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}