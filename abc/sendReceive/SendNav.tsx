"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, Bell, Settings } from "lucide-react";

export default function SendNav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full py-4 px-6 flex justify-between items-center border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Transfers
        </h1>
        <div className="hidden md:flex text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
          Network: <span className="text-green-400 ml-1">Mainnet Beta</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#1a1a1a] rounded-full px-4 py-2 border border-white/5 focus-within:border-blue-500/50 transition-colors">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="bg-transparent outline-none text-sm text-white w-48 placeholder-gray-600"
          />
        </div>

        {/* Action Buttons */}
        <button className="relative p-2 hover:bg-white/10 rounded-full transition">
          <Bell size={20} className="text-gray-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition">
          <Settings size={20} className="text-gray-300" />
        </button>
      </div>
    </motion.nav>
  );
}