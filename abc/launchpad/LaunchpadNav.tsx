"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, PlusCircle, Search } from "lucide-react";

export default function LaunchpadNav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full py-4 px-6 flex justify-between items-center border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-pink-500/20 rounded-lg">
           <Rocket size={24} className="text-pink-500" />
        </div>
        <div>
           <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
             Launchpad
           </h1>
           <p className="text-[10px] text-gray-500 font-mono tracking-widest">EARLY ACCESS PROTOCOL</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#1a1a1a] rounded-full px-4 py-2 border border-white/5 focus-within:border-pink-500/50 transition-colors">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Find upcoming IDOs..."
            className="bg-transparent outline-none text-sm text-white w-48 placeholder-gray-600"
          />
        </div>

        {/* Create Button */}
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition text-sm font-medium">
          <PlusCircle size={16} />
          <span className="hidden sm:inline">List Project</span>
        </button>
      </div>
    </motion.nav>
  );
}