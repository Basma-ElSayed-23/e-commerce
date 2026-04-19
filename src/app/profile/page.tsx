"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, User, Settings, Plus, SettingsIcon, X } from "lucide-react";

interface Address {
  id: string;
  name: string;
  city: string;
  phone: string;
}

const MOCK_ADDRESSES: Address[] = [];

export default function MyAddresses() {
 const [addresses, setAddresses] = useState<Address[]>([]);
const [showModal, setShowModal] = useState(false);
const [form, setForm] = useState({ name: "", address: "", phone: "", city: "" });

 const handleAddAddress = () => {
  if (!form.name || !form.address || !form.phone || !form.city) return;
  setAddresses([...addresses, { ...form, id: Date.now().toString() }]);
  setForm({ name: "", address: "", phone: "", city: "" });
  setShowModal(false);
};

  return (
    <div className="min-h-screen bg-gray-50">
      
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

          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-9">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
                <p className="text-gray-500 mt-1">Manage your saved delivery addresses</p>
              </div>

              <button
                onClick={() => setShowModal(true)}
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
                  onClick={() => setShowModal(true)}
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
      {showModal && (
  <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4" onClick={() => setShowModal(false)}>
    <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-xl" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">Add New Address</h3>
        <button onClick={() => setShowModal(false)}>
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Address Name</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Home, Office" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Full Address</label>
          <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Street, building, apartment..." className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 h-36 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
            <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="01xxxxxxxxx" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">City</label>
            <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="Cairo" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-6">
        <button onClick={() => setShowModal(false)} className="py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors">Cancel</button>
        <button onClick={handleAddAddress} className="py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-colors">Add Address</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}