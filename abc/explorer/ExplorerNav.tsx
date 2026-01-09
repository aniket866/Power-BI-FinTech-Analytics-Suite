"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe, Search, Menu, Zap } from "lucide-react";

export default function ExplorerNav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full py-4 px-6 flex justify-between items-center border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
           <Globe size={24} className="text-cyan-500" />
        </div>
        <div>
           <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
             BlockScan
           </h1>
           <p className="text-[10px] text-gray-500 font-mono tracking-widest">NETWORK EXPLORER</p>
        </div>
      </div>

      {/* Center Search - Desktop */}
      <div className="hidden lg:flex flex-1 max-w-xl mx-8 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
           <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Search by Address / Txn Hash / Block / Token"
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-cyan-500/50 transition-colors outline-none placeholder-gray-600"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 px-2 py-1 rounded text-[10px] text-gray-400">
           /
        </div>
      </div>

      <div className="flex items-center space-x-4">
         <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 text-xs font-bold">
            <Zap size={14} />
            <span>Gas: 12 Gwei</span>
         </div>
         <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20 text-green-400 text-xs font-bold">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>TPS: 4,210</span>
         </div>
      </div>
    </motion.nav>
  );
}