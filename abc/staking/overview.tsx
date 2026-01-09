"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  Lock, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  Coins
} from "lucide-react";

// --- Configuration ---
const POOLS = [
  { 
    id: "solana", 
    name: "Solana", 
    symbol: "SOL", 
    apy: 7.8, 
    minStake: 0.1, 
    tvl: "452.1M", 
    color: "from-purple-500 to-indigo-500",
    icon: "◎"
  },
  { 
    id: "ethereum", 
    name: "Ethereum", 
    symbol: "ETH", 
    apy: 4.2, 
    minStake: 0.01, 
    tvl: "2.1B", 
    color: "from-blue-500 to-cyan-500",
    icon: "Ξ"
  },
  { 
    id: "usdt", 
    name: "Tether", 
    symbol: "USDT", 
    apy: 12.5, 
    minStake: 50, 
    tvl: "890M", 
    color: "from-green-500 to-emerald-500",
    icon: "$"
  },
];

export default function OverviewPage() {
  const [selectedPool, setSelectedPool] = useState(POOLS[0]);
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [isStaked, setIsStaked] = useState(false);
  const [stakedBalance, setStakedBalance] = useState(0);
  const [rewards, setRewards] = useState(0.000000);
  const [loading, setLoading] = useState(false);

  // --- Real-time Reward Simulation ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStaked && stakedBalance > 0) {
      // Add tiny amount every 100ms to simulate live rewards
      interval = setInterval(() => {
        const rewardRatePerSecond = (selectedPool.apy / 100 / 365 / 24 / 60 / 60) * stakedBalance;
        setRewards(prev => prev + (rewardRatePerSecond / 10)); // divide by 10 for 100ms interval
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isStaked, stakedBalance, selectedPool.apy]);

  // --- Handlers ---
  const handleStake = () => {
    if (!stakeAmount || Number(stakeAmount) < selectedPool.minStake) return;
    setLoading(true);
    
    setTimeout(() => {
      setStakedBalance(prev => prev + Number(stakeAmount));
      setIsStaked(true);
      setStakeAmount("");
      setLoading(false);
    }, 1500); // Simulate network delay
  };

  const handleUnstake = () => {
    setLoading(true);
    setTimeout(() => {
      setStakedBalance(0);
      setIsStaked(false);
      setRewards(0);
      setLoading(false);
    }, 1500);
  };

  // --- Calculations ---
  const calculatedDaily = stakeAmount ? (Number(stakeAmount) * (selectedPool.apy / 100) / 365).toFixed(4) : "0.0000";
  const calculatedYearly = stakeAmount ? (Number(stakeAmount) * (selectedPool.apy / 100)).toFixed(2) : "0.00";

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"/>
          <div className="flex items-center gap-3 mb-2 text-gray-400">
            <Lock size={18} />
            <span className="text-sm font-medium">Total Value Locked</span>
          </div>
          <h3 className="text-3xl font-bold text-white">$14.2B</h3>
          <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +2.4% this week
          </p>
        </div>

        <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all"/>
          <div className="flex items-center gap-3 mb-2 text-gray-400">
            <Coins size={18} />
            <span className="text-sm font-medium">Your Total Earnings</span>
          </div>
          <h3 className="text-3xl font-bold text-white">${rewards > 0 ? (rewards * 145).toFixed(6) : "0.00"}</h3>
           <p className="text-gray-500 text-xs mt-2">Across all pools</p>
        </div>

        <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"/>
          <div className="flex items-center gap-3 mb-2 text-gray-400">
            <Clock size={18} />
            <span className="text-sm font-medium">Staking APY High</span>
          </div>
          <h3 className="text-3xl font-bold text-white">12.5%</h3>
           <p className="text-gray-500 text-xs mt-2">On USDT Pools</p>
        </div>
      </div>

      {/* Main Staking Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Pool Selection */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white">Choose a Pool</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {POOLS.map((pool) => (
              <motion.div
                key={pool.id}
                onClick={() => setSelectedPool(pool)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden ${
                  selectedPool.id === pool.id 
                    ? `bg-black border-${pool.color.split("-")[1]}-500/50 shadow-[0_0_20px_rgba(0,0,0,0.5)]` 
                    : "bg-[#0f0f0f] border-white/5 hover:border-white/20"
                }`}
              >
                 {selectedPool.id === pool.id && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${pool.color} opacity-10 pointer-events-none`} />
                 )}
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl">{pool.icon}</span>
                    <span className={`text-sm font-bold px-2 py-1 rounded-md bg-white/10 ${selectedPool.id === pool.id ? "text-white" : "text-gray-400"}`}>
                        {pool.apy}% APY
                    </span>
                 </div>
                 <h3 className="font-bold text-lg">{pool.name}</h3>
                 <p className="text-xs text-gray-500">TVL: {pool.tvl}</p>
              </motion.div>
            ))}
          </div>

          {/* Staking Calculator / Input */}
          <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Stake {selectedPool.symbol}</h3>
                <div className="text-right">
                    <p className="text-xs text-gray-400">Wallet Balance</p>
                    <p className="text-sm font-mono text-white">145.00 {selectedPool.symbol}</p>
                </div>
             </div>

             <div className="bg-black rounded-xl border border-white/10 p-4 flex justify-between items-center mb-2">
                <input 
                    type="number" 
                    placeholder="0.00"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="bg-transparent text-2xl font-bold text-white outline-none w-full placeholder-gray-700"
                />
                <button 
                    onClick={() => setStakeAmount("145.00")}
                    className="text-xs font-bold text-purple-400 hover:text-purple-300 uppercase ml-4"
                >
                    Max
                </button>
             </div>

             {/* Calculation Preview */}
             <div className="grid grid-cols-2 gap-4 my-6 p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                    <p className="text-xs text-gray-500">Daily Earnings</p>
                    <p className="text-lg font-mono text-white">+{calculatedDaily} {selectedPool.symbol}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Yearly Earnings</p>
                    <p className="text-lg font-mono text-green-400">+{calculatedYearly} {selectedPool.symbol}</p>
                </div>
             </div>

             <button 
                onClick={handleStake}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    loading 
                    ? "bg-gray-800 text-gray-500" 
                    : `bg-gradient-to-r ${selectedPool.color} text-white shadow-lg hover:shadow-${selectedPool.color.split("-")[1]}-500/25`
                }`}
             >
                {loading ? "Processing..." : "Stake Now"}
             </button>
          </div>
        </div>

        {/* Right: Your Position */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 h-fit sticky top-24">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Wallet size={20} className="text-gray-400"/> Your Position
            </h3>

            {isStaked ? (
                <div className="space-y-6">
                    <div className="text-center py-6 border-b border-white/5">
                        <p className="text-gray-400 text-sm mb-1">Staked Balance</p>
                        <h2 className="text-4xl font-bold text-white">{stakedBalance.toFixed(2)} <span className="text-base text-gray-500">{selectedPool.symbol}</span></h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Unclaimed Rewards</span>
                            <span className="text-green-400 font-mono animate-pulse">{rewards.toFixed(7)} {selectedPool.symbol}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Current APY</span>
                            <span className="text-white font-medium">{selectedPool.apy}%</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <button 
                            className="py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition"
                            onClick={() => {
                                setRewards(0);
                                alert(`Claimed ${rewards.toFixed(6)} ${selectedPool.symbol}!`);
                            }}
                        >
                            Claim
                        </button>
                        <button 
                            onClick={handleUnstake}
                            disabled={loading}
                            className="py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white/10 transition"
                        >
                           {loading ? "..." : "Unstake"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle size={32} className="text-gray-500" />
                    </div>
                    <p className="text-gray-400">You have no active stakes.</p>
                    <p className="text-xs text-gray-600 mt-2">Start staking to earn passive income.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}