"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "../../src/components/ui/sidebar";
import AirdropNav from "./AirdropNav"; // Ensure this file exists or use a generic Nav
import {
  Send,
  Coins,
  RefreshCw,
  ArrowDownToLine,
  ArrowUpFromLine,
  Gift,
  BarChart3,
  Building2,
  Globe,
  Home,
  User,
  Package,
  Settings,
  Lock,
  CheckCircle2,
  Clock,
  Twitter,
  MessageCircle,
  AlertCircle,
  Loader2
} from "lucide-react";

// --- Mock Data for Airdrops ---
const AIRDROPS = [
  {
    id: 1,
    name: "StarkNet Pro",
    symbol: "STRK",
    amount: "500",
    status: "Live",
    endsIn: 86400 * 2, // 2 days in seconds
    tasks: ["Connect Wallet", "Follow on X", "Bridge Assets"],
    logo: "/images/image1.jpg", // Replace with valid path
    color: "bg-orange-500"
  },
  {
    id: 2,
    name: "ZkSync Era",
    symbol: "ZKS",
    amount: "250",
    status: "Upcoming",
    endsIn: 86400 * 5,
    tasks: ["Join Discord", "Hold ETH"],
    logo: "/images/image2.jpg",
    color: "bg-blue-500"
  },
  {
    id: 3,
    name: "LayerZero",
    symbol: "ZRO",
    amount: "1000",
    status: "Expired",
    endsIn: 0,
    tasks: [],
    logo: "/images/image3.jpg",
    color: "bg-gray-500"
  },
];

export default function AirdropPage() {
  const [selectedAirdrop, setSelectedAirdrop] = useState<typeof AIRDROPS[0] | null>(null);
  const [checking, setChecking] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [claimed, setClaimed] = useState(false);
  
  // Timer Logic
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!selectedAirdrop) return;
    const timer = setInterval(() => {
      // Mock countdown
      const hours = Math.floor(Math.random() * 24); 
      const mins = Math.floor(Math.random() * 60);
      setTimeLeft(`${hours}h ${mins}m 42s`);
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedAirdrop]);

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

  const handleCheckEligibility = () => {
    setChecking(true);
    setEligible(false);
    setClaimed(false);
    
    setTimeout(() => {
      setChecking(false);
      setEligible(true); // Mock success
    }, 2000);
  };

  const handleClaim = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setClaimed(true);
    }, 2000);
  };

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

      <div className="flex-1 ml-auto flex flex-col">
        <AirdropNav />

        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
              Exclusive Airdrops
            </h1>
            <p className="text-gray-400">Complete tasks and claim your tokens before they expire.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Airdrop List */}
            <div className="lg:col-span-2 space-y-4">
              {AIRDROPS.map((drop) => (
                <motion.div
                  key={drop.id}
                  onClick={() => {
                    setSelectedAirdrop(drop);
                    setEligible(false);
                    setClaimed(false);
                  }}
                  whileHover={{ scale: 1.01 }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedAirdrop?.id === drop.id
                      ? "bg-white/10 border-purple-500"
                      : "bg-[#0f0f0f] border-white/5 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${drop.color} flex items-center justify-center font-bold text-lg`}>
                      {drop.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{drop.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className={`px-2 py-0.5 rounded-full ${
                          drop.status === "Live" ? "bg-green-500/20 text-green-400" :
                          drop.status === "Upcoming" ? "bg-blue-500/20 text-blue-400" :
                          "bg-red-500/20 text-red-400"
                        }`}>
                          {drop.status}
                        </span>
                        <span>• {drop.amount} {drop.symbol}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Details Panel */}
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                {selectedAirdrop ? (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 sticky top-24"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedAirdrop.name}</h2>
                        <p className="text-gray-400 text-sm">{selectedAirdrop.amount} {selectedAirdrop.symbol} Allocation</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full ${selectedAirdrop.color} blur-xl opacity-50 absolute top-6 right-6`} />
                    </div>

                    {/* Timer */}
                    {selectedAirdrop.status === "Live" && (
                      <div className="bg-white/5 rounded-xl p-4 mb-6 flex items-center justify-between">
                         <span className="text-gray-400 text-sm flex items-center gap-2">
                           <Clock size={16}/> Ends in:
                         </span>
                         <span className="font-mono text-xl text-yellow-400">{timeLeft}</span>
                      </div>
                    )}

                    {/* Eligibility / Claim Flow */}
                    {!eligible && !claimed && selectedAirdrop.status === "Live" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-300">
                          <AlertCircle size={16} className="inline mr-2 mb-0.5"/>
                          Check if your wallet is eligible for this drop.
                        </div>
                        <button 
                          onClick={handleCheckEligibility}
                          disabled={checking}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition flex items-center justify-center gap-2"
                        >
                          {checking && <Loader2 className="animate-spin" size={18}/>}
                          {checking ? "Verifying..." : "Check Eligibility"}
                        </button>
                      </div>
                    )}

                    {eligible && !claimed && (
                      <div className="space-y-4">
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                          <h3 className="text-green-400 font-bold text-lg">You are Eligible!</h3>
                          <p className="text-sm text-gray-400">Claimable: {selectedAirdrop.amount} {selectedAirdrop.symbol}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-xs text-gray-400 uppercase font-bold">Required Tasks</p>
                          {selectedAirdrop.tasks.map((task, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                              <CheckCircle2 size={16} className="text-green-500"/>
                              <span className="text-sm">{task}</span>
                            </div>
                          ))}
                        </div>

                        <button 
                          onClick={handleClaim}
                          disabled={checking}
                          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                        >
                           {checking && <Loader2 className="animate-spin" size={18}/>}
                           {checking ? "Claiming..." : "Claim Tokens"}
                        </button>
                      </div>
                    )}

                    {claimed && (
                       <div className="text-center py-10">
                          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                             <CheckCircle2 size={32}/>
                          </div>
                          <h3 className="text-2xl font-bold text-white">Claimed!</h3>
                          <p className="text-gray-400 mt-2">Tokens have been sent to your wallet.</p>
                       </div>
                    )}

                    {selectedAirdrop.status !== "Live" && !claimed && (
                       <div className="text-center py-10 text-gray-500">
                          <p>This airdrop is not currently active.</p>
                       </div>
                    )}

                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 border border-white/5 rounded-3xl p-10 bg-[#0f0f0f]">
                    <p>Select an airdrop to view details</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
