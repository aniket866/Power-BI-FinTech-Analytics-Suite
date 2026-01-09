"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Upload, Rocket, CheckCircle2, AlertCircle, Info, X, Zap, Wallet, ExternalLink } from "lucide-react";
import GlobalSidebar from "@/components/GlobalSidebar";
import CreateTokenNav from "@/components/CreateTokenNav";
import { cn } from "@/lib/utils";
// [++code] Import real service functions
import { deployTokenContract, addTokenToWallet } from "@/lib/tokenService";

export default function CreateToken() {
  const partners = ["binance", "solana", "coinbase", "metamask"];
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "",
    decimals: "18",
    description: "",
  });

  // Features (For future use with a custom factory)
  const [features, setFeatures] = useState({
    burnable: true,
    mintable: false,
    pausable: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeploy = async () => {
    if (!formData.name || !formData.symbol || !formData.supply) {
      alert("Please fill in Name, Symbol and Supply.");
      return;
    }

    setIsLoading(true);
    try {
     
      const result = await deployTokenContract(formData);
      setSuccessData(result);
    } catch (error: any) {
      console.error("Deployment failed:", error);
      alert(error.message || "Deployment failed. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  // [++code] Handle adding to MetaMask
  const handleAddToWallet = async () => {
    if (successData?.address) {
        await addTokenToWallet(
            successData.address,
            formData.symbol,
            formData.decimals
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-white overflow-hidden">
      {/* 1. Sidebar Component */}
      <div className="h-full border-r border-white/10 bg-black">
        <GlobalSidebar />
      </div>

      {/* 2. Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">
        <CreateTokenNav />

        <main className="max-w-5xl mx-auto w-full px-6 py-12 pt-20">
          
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            >
              Launch Your Own  Cryptocurrency
            </motion.h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Deploy standard ERC-20 tokens on Ethereum, BSC, or Polygon in seconds. 
              No coding required. Verified contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- LEFT: Deployment Form --- */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group">
                 {/* Glow Effect */}
                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
                 
                 <div className="relative z-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Token Name</label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Bitcoin"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Token Symbol</label>
                        <input
                          name="symbol"
                          value={formData.symbol}
                          onChange={handleChange}
                          placeholder="e.g. BTC"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all uppercase"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Initial Supply</label>
                        <input
                          name="supply"
                          type="number"
                          value={formData.supply}
                          onChange={handleChange}
                          placeholder="e.g. 1000000"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Decimals</label>
                        <input
                          name="decimals"
                          type="number"
                          value={formData.decimals}
                          onChange={handleChange}
                          placeholder="18"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Description (Optional)</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe your project..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                      />
                    </div>
                 </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleDeploy}
                disabled={isLoading}
                className="w-full group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className={cn("flex items-center justify-center gap-2 relative z-10", isLoading && "opacity-0")}>
                  <Rocket className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  Deploy Token
                </span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 gap-2">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}
              </button>
            </motion.div>

            {/* --- RIGHT: Preview & Features --- */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Logo Upload */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.07] transition-colors cursor-pointer border-dashed">
                <div className="w-20 h-20 mx-auto bg-black/40 rounded-full flex items-center justify-center mb-4 border border-white/10">
                  <Upload className="text-gray-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Upload Logo</h3>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF (Max 5MB)</p>
              </div>

              {/* Features Toggles */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Zap size={16} className="text-yellow-400" /> Token Features
                </h3>
                
                {[
                  { key: "burnable", label: "Burnable", desc: "Tokens can be destroyed to reduce supply" },
                  { key: "mintable", label: "Mintable", desc: "Owner can create more tokens later" },
                  { key: "pausable", label: "Pausable", desc: "Owner can pause all token transfers" },
                ].map((feature) => (
                  <div 
                    key={feature.key} 
                    onClick={() => toggleFeature(feature.key as any)}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                      // @ts-ignore
                      features[feature.key] 
                        ? "bg-blue-500/10 border-blue-500/50" 
                        : "bg-black/20 border-white/5 hover:border-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center mt-0.5",
                      // @ts-ignore
                      features[feature.key] ? "border-blue-400 bg-blue-400" : "border-gray-600"
                    )}>
                      {/* @ts-ignore */}
                      {features[feature.key] && <CheckCircle2 size={12} className="text-black" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{feature.label}</div>
                      <div className="text-xs text-gray-400 leading-tight mt-1">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Partners Footer */}
          <div className="mt-20 border-t border-white/10 pt-10">
            <p className="text-center text-sm text-gray-500 mb-6 uppercase tracking-widest">Supported Networks</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {partners.map((p, idx) => (
                <Image
                  key={idx}
                  src={`/${p}.svg`} // Ensure these exist in public/
                  alt={p}
                  width={100}
                  height={40}
                  className="h-8 w-auto object-contain hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* --- Success Modal --- */}
      {successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#121212] border border-white/10 p-8 rounded-3xl max-w-md w-full text-center relative shadow-2xl shadow-green-500/20"
          >
            <button 
              onClick={() => setSuccessData(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
              <CheckCircle2 size={40} />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Token Deployed!</h2>
            <p className="text-gray-400 mb-6">
              Your token <span className="text-white font-bold">{formData.name}</span> has been successfully deployed to the network.
            </p>

            <div className="bg-black/40 rounded-xl p-4 mb-6 space-y-3 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Address</span>
                <span className="text-blue-400 font-mono">
                  {successData.address.slice(0, 6)}...{successData.address.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction</span>
                <a 
                  href={`https://etherscan.io/tx/${successData.txHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 font-mono flex items-center gap-1 hover:underline"
                >
                  {successData.txHash.slice(0, 6)}...{successData.txHash.slice(-4)} <ExternalLink size={10} />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* [++code] ADD TO WALLET BUTTON */}
              <button 
                onClick={handleAddToWallet}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                 <Wallet size={18} /> Add to Wallet (RPC)
              </button>

              <div className="flex gap-3">
                <button className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                  Explorer
                </button>
                <button 
                  onClick={() => setSuccessData(null)}
                  className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20 transition"
                >
                  Close
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </div>
  );
}