"use client";
import React, { useState, useEffect } from "react";
import { ArrowDownUp, Settings, Info, Loader2, Wallet } from "lucide-react";
import { motion } from "framer-motion";

// Mock Token Data
const TOKENS = [
  { id: "ethereum", symbol: "ETH", name: "Ethereum", balance: 4.5, icon: "Ξ" },
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", balance: 0.12, icon: "₿" },
  { id: "solana", symbol: "SOL", name: "Solana", balance: 145.0, icon: "◎" },
  { id: "tether", symbol: "USDT", name: "Tether", balance: 2400.50, icon: "$" },
];

// Mock Exchange Rates relative to USD
const PRICES: Record<string, number> = {
  ETH: 3450,
  BTC: 64200,
  SOL: 145,
  USDT: 1,
};

export default function SwapPanel() {
  const [fromToken, setFromToken] = useState(TOKENS[0]); // ETH
  const [toToken, setToToken] = useState(TOKENS[3]);   // USDT
  
  const [amountIn, setAmountIn] = useState<string>("");
  const [amountOut, setAmountOut] = useState<string>("");
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "swapping" | "success">("idle");

  // Calculate Exchange Rate
  const exchangeRate = PRICES[fromToken.symbol] / PRICES[toToken.symbol];

  // Update Output when Input changes
  const handleInput = (val: string) => {
    setAmountIn(val);
    if (!val || isNaN(Number(val))) {
      setAmountOut("");
      return;
    }
    const calculated = (Number(val) * exchangeRate).toFixed(6);
    // Remove trailing zeros for cleaner look
    setAmountOut(parseFloat(calculated).toString());
  };

  // Switch Tokens
  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setAmountIn(amountOut);
    setAmountOut(amountIn);
  };

  // Simulate Swap
  const handleSwap = () => {
    if (!amountIn || Number(amountIn) <= 0) return;
    
    setLoading(true);
    setStatus("swapping");

    // Simulate Network Delay
    setTimeout(() => {
      setLoading(false);
      setStatus("success");
      
      // Reset after success message
      setTimeout(() => {
        setStatus("idle");
        setAmountIn("");
        setAmountOut("");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-3xl p-4 shadow-2xl relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-purple-500/10 blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-white text-lg font-semibold">Swap</h2>
          <button className="text-gray-400 hover:text-white transition">
            <Settings size={20} />
          </button>
        </div>

        {/* FROM Input */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-2 border border-transparent hover:border-white/5 transition-colors">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-xs font-medium">From</span>
            <span className="text-gray-400 text-xs">Balance: {fromToken.balance}</span>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="number"
              placeholder="0.0"
              value={amountIn}
              onChange={(e) => handleInput(e.target.value)}
              className="bg-transparent text-3xl text-white outline-none w-2/3 placeholder-gray-600"
            />
            <button className="flex items-center gap-2 bg-black px-3 py-2 rounded-full border border-white/10 hover:border-white/30 transition">
              <span className="text-xl">{fromToken.icon}</span>
              <span className="font-semibold text-white">{fromToken.symbol}</span>
            </button>
          </div>
        </div>

        {/* Switch Button */}
        <div className="flex justify-center -my-3 relative z-10">
          <button 
            onClick={switchTokens}
            className="bg-[#1a1a1a] border border-black p-2 rounded-xl text-purple-400 hover:text-white hover:scale-110 transition-all shadow-lg"
          >
            <ArrowDownUp size={18} />
          </button>
        </div>

        {/* TO Output */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4 mt-2 border border-transparent hover:border-white/5 transition-colors">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-xs font-medium">To (Estimated)</span>
            <span className="text-gray-400 text-xs">Balance: {toToken.balance}</span>
          </div>
          <div className="flex justify-between items-center">
             <input
              type="text"
              readOnly
              placeholder="0.0"
              value={amountOut}
              className="bg-transparent text-3xl text-white outline-none w-2/3 placeholder-gray-600 cursor-default"
            />
            <button className="flex items-center gap-2 bg-black px-3 py-2 rounded-full border border-white/10 hover:border-white/30 transition">
              <span className="text-xl">{toToken.icon}</span>
              <span className="font-semibold text-white">{toToken.symbol}</span>
            </button>
          </div>
        </div>

        {/* Price Info */}
        {amountIn && (
          <div className="flex justify-between items-center px-2 py-4 text-xs text-gray-400">
            <span>Price</span>
            <div className="flex items-center gap-1">
              1 {fromToken.symbol} ≈ {exchangeRate.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toToken.symbol}
              <Info size={12} />
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleSwap}
          disabled={loading || !amountIn}
          className={`w-full py-4 rounded-xl font-bold text-lg mt-2 transition-all duration-300 relative overflow-hidden ${
             status === "success" 
             ? "bg-green-500 text-black"
             : loading 
               ? "bg-gray-700 text-gray-400 cursor-not-allowed"
               : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              <span>Swapping...</span>
            </div>
          ) : status === "success" ? (
            "Swap Completed!"
          ) : !amountIn ? (
            "Enter an Amount"
          ) : (
            "Swap Now"
          )}
        </button>

        {/* Network Cost Mock */}
        <div className="mt-4 flex justify-between text-[10px] text-gray-500 px-2">
           <span className="flex items-center gap-1"><Wallet size={10}/> Network Cost</span>
           <span>~$4.23</span>
        </div>

      </div>
    </div>
  );
}