"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar, SidebarBody, SidebarLink } from "../../src/components/ui/sidebar";
import LaunchpadNav from "./LaunchpadNav";
import {
  Send, Coins, RefreshCw, ArrowDownToLine, ArrowUpFromLine, Gift,
  BarChart3, Building2, Globe, Home, User, Package, Settings, Lock,
  Timer, Users, CheckCircle2, AlertCircle, TrendingUp, X
} from "lucide-react";

// --- Mock Project Data ---
const PROJECTS = [
  {
    id: 1,
    name: "CyberNexus",
    ticker: "CNX",
    description: "AI-powered decentralized storage solution for the metaverse.",
    status: "Live",
    raised: 450000,
    target: 500000,
    participants: 1240,
    minBuy: 0.1,
    maxBuy: 5.0,
    rate: "1 ETH = 50,000 CNX",
    endsIn: 3600 * 24, // 24 hours
    logo: "bg-blue-600"
  },
  {
    id: 2,
    name: "SolarFi Protocol",
    ticker: "SUN",
    description: "Yield aggregator optimizing returns across multiple solar chains.",
    status: "Upcoming",
    raised: 0,
    target: 250000,
    participants: 0,
    minBuy: 0.1,
    maxBuy: 2.0,
    rate: "1 ETH = 2,500 SUN",
    endsIn: 3600 * 48,
    logo: "bg-orange-500"
  },
  {
    id: 3,
    name: "GameVerse",
    ticker: "GMV",
    description: "Play-to-earn ecosystem connecting web2 gamers to web3.",
    status: "Ended",
    raised: 800000,
    target: 800000,
    participants: 3500,
    minBuy: 0.1,
    maxBuy: 10.0,
    rate: "1 ETH = 100,000 GMV",
    endsIn: 0,
    logo: "bg-purple-600"
  },
];

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

export default function LaunchpadPage() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [investAmount, setInvestAmount] = useState("");
  const [isInvested, setIsInvested] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation for progress bars
  const calculateProgress = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  const handleInvest = () => {
    if (!investAmount) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsInvested(true);
    }, 2000);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsInvested(false);
    setInvestAmount("");
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

      <div className="flex-1 ml-auto flex flex-col relative">
        <LaunchpadNav />

        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          
          {/* Featured Hero */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-900/40 to-purple-900/40 border border-white/10 p-8 mb-12">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold mb-4">
                <TrendingUp size={14} /> FEATURED IDO
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Launch Your Journey into the <span className="text-pink-500">Metaverse</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Early access to high-potential projects. Vetted, secure, and ready for liftoff.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition">
                  Start Investing
                </button>
                <button className="bg-transparent border border-white/20 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition">
                  How it Works
                </button>
              </div>
            </div>
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-500/10 to-transparent pointer-events-none" />
          </div>

          {/* Filter / Tabs */}
          <div className="flex items-center gap-6 mb-8 overflow-x-auto pb-2">
            {["All Pools", "Live", "Upcoming", "Ended"].map((tab, i) => (
              <button 
                key={i} 
                className={`text-sm font-bold whitespace-nowrap ${i === 0 ? "text-white border-b-2 border-pink-500 pb-1" : "text-gray-500 hover:text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${project.logo} flex items-center justify-center text-2xl font-bold shadow-lg`}>
                    {project.ticker[0]}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    project.status === "Live" ? "bg-green-500/20 text-green-400" :
                    project.status === "Upcoming" ? "bg-blue-500/20 text-blue-400" :
                    "bg-gray-500/20 text-gray-400"
                  }`}>
                    ● {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                <p className="text-gray-500 text-sm mb-6 h-10 line-clamp-2">{project.description}</p>

                {/* Progress Bar */}
                <div className="mb-6">
                   <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-gray-400">Raised</span>
                      <span className="text-white">{calculateProgress(project.raised, project.target).toFixed(0)}%</span>
                   </div>
                   <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${calculateProgress(project.raised, project.target)}%` }}
                         className={`h-full rounded-full ${project.status === "Ended" ? "bg-gray-500" : "bg-gradient-to-r from-pink-500 to-orange-500"}`}
                      />
                   </div>
                   <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{project.raised.toLocaleString()} ETH</span>
                      <span>{project.target.toLocaleString()} ETH</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mb-6">
                   <div>
                      <p className="text-xs text-gray-500">Participants</p>
                      <p className="font-bold flex items-center gap-1"><Users size={12}/> {project.participants}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs text-gray-500">Max Allocation</p>
                      <p className="font-bold">{project.maxBuy} ETH</p>
                   </div>
                </div>

                <button 
                  onClick={() => setSelectedProject(project)}
                  disabled={project.status !== "Live"}
                  className={`w-full py-3 rounded-xl font-bold transition ${
                    project.status === "Live"
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {project.status === "Live" ? "View & Invest" : "View Details"}
                </button>
              </motion.div>
            ))}
          </div>

        </main>

        {/* Investment Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#111] border border-white/10 w-full max-w-lg rounded-3xl p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition"
                >
                   <X size={20} className="text-gray-400" />
                </button>

                {!isInvested ? (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl ${selectedProject.logo} flex items-center justify-center text-xl font-bold`}>
                        {selectedProject.ticker[0]}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
                        <p className="text-sm text-gray-400">{selectedProject.rate}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 mb-6">
                       <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-400">Amount to Invest (ETH)</span>
                          <span className="text-sm text-gray-400">Bal: 4.5 ETH</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <input 
                             type="number" 
                             value={investAmount}
                             onChange={(e) => setInvestAmount(e.target.value)}
                             placeholder={`Min ${selectedProject.minBuy}`}
                             className="bg-transparent text-2xl font-bold text-white w-full outline-none"
                          />
                          <button className="text-xs font-bold text-pink-500 uppercase">Max</button>
                       </div>
                    </div>

                    <div className="space-y-3 mb-8">
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Allocation Cost</span>
                          <span>{investAmount || "0"} ETH</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Token Receive</span>
                          <span className="text-pink-400 font-bold">
                             {investAmount ? (Number(investAmount) * 50000).toLocaleString() : "0"} {selectedProject.ticker}
                          </span>
                       </div>
                    </div>

                    <button 
                      onClick={handleInvest}
                      disabled={loading || !investAmount}
                      className="w-full py-4 bg-gradient-to-r from-pink-600 to-orange-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-pink-500/20 transition disabled:opacity-50"
                    >
                       {loading ? "Processing Transaction..." : "Confirm Investment"}
                    </button>
                  </>
                ) : (
                  <div className="text-center py-10">
                     <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                     </div>
                     <h2 className="text-3xl font-bold mb-2">Success!</h2>
                     <p className="text-gray-400 mb-8">
                        You have successfully invested <strong>{investAmount} ETH</strong> in {selectedProject.name}.
                     </p>
                     <button onClick={closeModal} className="px-8 py-3 bg-white text-black rounded-full font-bold">
                        Close
                     </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}