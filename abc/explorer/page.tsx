"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar, SidebarBody, SidebarLink } from "../../src/components/ui/sidebar";
import ExplorerNav from "./explorerNav";
import {
  Send, Coins, RefreshCw, ArrowDownToLine, ArrowUpFromLine, Gift,
  BarChart3, Building2, Globe, Home, User, Package, Settings, Lock,
  Box, FileText, ArrowRight, Clock, Hash
} from "lucide-react";

// Sidebar Links
const links = [
  { label: "Home", href: "/home", icon: <Home size={20} /> },
  { label: "Profile", href: "/profile", icon: <User size={20} /> },
  { label: "Assets", href: "/assets", icon: <Package size={20} /> },
  { label: "Dashboard", href: "/dashboard", icon: <BarChart3 size={20} /> },
  { label: "Send Tokens", href: "/send", icon: <Send size={20} /> },
  { label: "Receive Tokens", href: "/receive", icon: <ArrowDownToLine size={20} /> },
  { label: "Swap / Exchange", href: "/swap", icon: <RefreshCw size={20} /> },
  { label: "Airdrop", href: "/airdrop", icon: <Gift size={20} /> },
  { label: "Token Launchpad", href: "/launchpad", icon: <Coins size={20} /> },
  { label: "Staking", href: "/staking", icon: <ArrowUpFromLine size={20} /> },
  { label: "DAO Governance", href: "/governance", icon: <Building2 size={20} /> },
  { label: "Explorer", href: "/explorer", icon: <Globe size={20} /> },
  { label: "Settings", href: "/settings", icon: <Settings size={20} /> },
  { label: "Lock", href: "/staking", icon: <Lock size={20} /> },
];

export default function ExplorerPage() {
  const [blocks, setBlocks] = useState([
    { number: 18452021, miner: "0x82...91a2", txns: 142, time: "2s ago", reward: "0.045 ETH" },
    { number: 18452020, miner: "0x3b...72c1", txns: 98, time: "14s ago", reward: "0.032 ETH" },
    { number: 18452019, miner: "0xaa...8821", txns: 215, time: "26s ago", reward: "0.081 ETH" },
    { number: 18452018, miner: "0x71...9A23", txns: 156, time: "38s ago", reward: "0.052 ETH" },
    { number: 18452017, miner: "0xcc...11a2", txns: 89, time: "50s ago", reward: "0.029 ETH" },
  ]);

  const [txns, setTxns] = useState([
    { hash: "0xabc...123", from: "0xUserA", to: "0xUserB", amount: "1.2 ETH", time: "1s ago" },
    { hash: "0xdef...456", from: "0xUserC", to: "Uniswap", amount: "0.0 ETH", time: "4s ago" },
    { hash: "0xghi...789", from: "0xUserD", to: "0xUserE", amount: "500 USDT", time: "8s ago" },
    { hash: "0xjkl...012", from: "Binance", to: "0xUserF", amount: "12.5 SOL", time: "12s ago" },
    { hash: "0xmno...345", from: "0xUserG", to: "Compound", amount: "450 DAI", time: "15s ago" },
  ]);

  // Simulate Live Updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add new Block
      const newBlock = {
        number: blocks[0].number + 1,
        miner: `0x${Math.random().toString(16).substr(2, 2)}...${Math.random().toString(16).substr(2, 2)}`,
        txns: Math.floor(Math.random() * 200) + 50,
        time: "Just now",
        reward: `${(Math.random() * 0.1).toFixed(3)} ETH`
      };
      setBlocks(prev => [newBlock, ...prev.slice(0, 4)]);

      // Add new Transaction
      const newTxn = {
        hash: `0x${Math.random().toString(16).substr(2, 8)}...`,
        from: `0x${Math.random().toString(16).substr(2, 4)}`,
        to: Math.random() > 0.5 ? "Uniswap" : `0x${Math.random().toString(16).substr(2, 4)}`,
        amount: `${(Math.random() * 2).toFixed(2)} ETH`,
        time: "Just now"
      };
      setTxns(prev => [newTxn, ...prev.slice(0, 4)]);

    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [blocks]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar h-full">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex-1 ml-auto flex flex-col relative">
        <ExplorerNav />

        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
             <div className="p-6 bg-[#0f0f0f] border border-white/10 rounded-2xl">
                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Ether Price</p>
                <h3 className="text-2xl font-bold">$3,450.21</h3>
                <p className="text-xs text-gray-500 mt-2">@ 0.052 BTC</p>
             </div>
             <div className="p-6 bg-[#0f0f0f] border border-white/10 rounded-2xl">
                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Market Cap</p>
                <h3 className="text-2xl font-bold">$402.5B</h3>
                <p className="text-xs text-green-500 mt-2">+2.4% (24h)</p>
             </div>
             <div className="p-6 bg-[#0f0f0f] border border-white/10 rounded-2xl">
                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Total Transactions</p>
                <h3 className="text-2xl font-bold">2,415.2M</h3>
                <p className="text-xs text-gray-500 mt-2">+12.5 TPS</p>
             </div>
             <div className="p-6 bg-[#0f0f0f] border border-white/10 rounded-2xl">
                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Last Finalized Block</p>
                <h3 className="text-2xl font-bold">{blocks[0].number - 32}</h3>
                <p className="text-xs text-gray-500 mt-2">Safe</p>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Latest Blocks */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden">
               <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h3 className="font-bold flex items-center gap-2">
                     <Box size={20} className="text-cyan-500"/> Latest Blocks
                  </h3>
                  <button className="text-xs px-3 py-1 border border-white/10 rounded-lg hover:bg-white/10 transition">
                     View All
                  </button>
               </div>
               <div className="divide-y divide-white/5">
                  <AnimatePresence initial={false}>
                     {blocks.map((block) => (
                        <motion.div 
                           key={block.number}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           className="p-4 flex items-center justify-between hover:bg-white/5 transition"
                        >
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-gray-800 rounded-xl text-gray-400 font-bold text-xs">
                                 Bk
                              </div>
                              <div>
                                 <p className="text-cyan-400 text-sm font-bold">{block.number}</p>
                                 <p className="text-xs text-gray-500">{block.time}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-xs text-gray-400">
                                 Miner <span className="text-cyan-400">{block.miner}</span>
                              </p>
                              <div className="flex justify-end gap-2 text-xs font-bold mt-1">
                                 <span className="text-white">{block.txns} txns</span>
                                 <span className="text-gray-500">{block.reward}</span>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden">
               <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h3 className="font-bold flex items-center gap-2">
                     <FileText size={20} className="text-cyan-500"/> Recent Transactions
                  </h3>
                  <button className="text-xs px-3 py-1 border border-white/10 rounded-lg hover:bg-white/10 transition">
                     View All
                  </button>
               </div>
               <div className="divide-y divide-white/5">
                  <AnimatePresence initial={false}>
                     {txns.map((txn, i) => (
                        <motion.div 
                           key={i}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           className="p-4 flex items-center justify-between hover:bg-white/5 transition"
                        >
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-gray-800 rounded-xl text-gray-400 font-bold text-xs">
                                 Tx
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-cyan-400 text-sm font-bold truncate w-24">{txn.hash}</span>
                                 <span className="text-xs text-gray-500">{txn.time}</span>
                              </div>
                           </div>
                           <div className="flex-1 px-4 hidden sm:block">
                              <div className="flex items-center justify-between text-xs text-gray-400 bg-black/20 p-2 rounded-lg">
                                 <span>{txn.from}</span>
                                 <ArrowRight size={12} className="text-green-500" />
                                 <span>{txn.to}</span>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-xs font-bold bg-white/10 px-2 py-1 rounded-lg text-white">
                                 {txn.amount}
                              </p>
                           </div>
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}