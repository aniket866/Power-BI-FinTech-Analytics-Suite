"use client";
import React from "react";
import { motion } from "framer-motion";
import { Vote, Plus, Search, Users } from "lucide-react";

export default function GovernanceNav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full py-4 px-6 flex justify-between items-center border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
           <Vote size={24} className="text-indigo-500" />
        </div>
        <div>
           <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
             Governance
           </h1>
           <p className="text-[10px] text-gray-500 font-mono tracking-widest">DAO DASHBOARD</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#1a1a1a] rounded-full px-4 py-2 border border-white/5 focus-within:border-indigo-500/50 transition-colors">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search proposals..."
            className="bg-transparent outline-none text-sm text-white w-48 placeholder-gray-600"
          />
        </div>

        {/* Delegate Button */}
        <button className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition px-3 py-2">
            <Users size={16} /> Delegate
        </button>

        {/* Create Button */}
        <button className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full font-bold transition text-sm">
          <Plus size={16} />
          <span className="hidden sm:inline">New Proposal</span>
        </button>
      </div>
    </motion.nav>
  );
}