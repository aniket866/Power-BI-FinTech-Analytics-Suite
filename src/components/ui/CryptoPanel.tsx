"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const logos: Record<string, string> = {
  BTC: "🟠",
  ETH: "🟣",
  USDT: "🟢",
};

export default function CryptoPanel() {
  const [selectedFilter, setSelectedFilter] = useState("Top");
  type Coin = {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change1h: number;
    change24h: number;
    change7d: number;
    marketCap: string;
  };

  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    // Example fetch, replace with your API endpoint
   fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1")
      .then((res) => res.json())
      .then((data) => {
        setCoins(
          data.map((coin: {
            id: string;
            name: string;
            symbol: string;
            current_price: number;
            price_change_percentage_1h_in_currency: number;
            price_change_percentage_24h_in_currency: number;
            price_change_percentage_7d_in_currency: number;
            market_cap: number;
          }) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            change1h: coin.price_change_percentage_1h_in_currency,
            change24h: coin.price_change_percentage_24h_in_currency,
            change7d: coin.price_change_percentage_7d_in_currency,
            marketCap: coin.market_cap.toLocaleString(),
          }))
        );
      });
  }, []);

  const filters = [
    "Top",
    "Trending",
    "Most Visited",
    "New",
    "Gainers",
    "Real-World Assets",
  ];

  // Neon colors for names
  const neonColors: Record<string, string> = {
    BTC: "text-orange-400 drop-shadow-[0_0_6px_#ff9500]",
    ETH: "text-purple-400 drop-shadow-[0_0_6px_#a855f7]",
    USDT: "text-green-400 drop-shadow-[0_0_6px_#22c55e]",
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ===== Header Navigation ===== */}
<div className="flex justify-between items-center border-b border-gray-500 bg- px-6 py-4 text-black">
      
        <div className="flex space-x-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1 text-sm font-medium transition ${
                selectedFilter === f
                  ? "text-black border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex space-x-3">
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-black">
            Market Cap
          </button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-black">
            Volume (24h)
          </button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm flex items-center text-black">
            Filters <ChevronDown size={16} className="ml-1" />
          </button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm flex items-center text-black">
            Columns <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* ===== Table Header ===== */}
      <div className="grid grid-cols-8 gap-3 text-gray-400 text-sm mt-8 border-b border-gray-700 pb-2 px-6">
        <span>#</span>
        <span>Name</span>
        <span>Price</span>
        <span>1h %</span>
        <span>24h %</span>
        <span>7d %</span>
        <span>Market Cap</span>
        <span className="text-right pr-4">Action</span>
      </div>

      {/* ===== Table Rows ===== */}
      {coins.map((coin, index) => (
        <div
          key={coin.id}
          className="grid grid-cols-8 gap-3 items-center py-3 border-b border-gray-800 hover:bg-gray-900 transition px-6"
        >
          <span className="text-gray-400">{index + 1}</span>
          <span
            className={`font-semibold flex items-center gap-2 ${
              neonColors[coin.symbol] || "text-white"
            }`}
          >
            <span className="text-xl">{logos[coin.symbol] || "💠"}</span>
            {coin.name}{" "}
            <span className="text-gray-400 text-sm font-normal">
              {coin.symbol}
            </span>
          </span>
          <span className="text-green-400">
            ${coin.price.toLocaleString()}
          </span>
          <span
            className={`${
              coin.change1h >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {coin.change1h?.toFixed(2)}%
          </span>
          <span
            className={`${
              coin.change24h >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {coin.change24h?.toFixed(2)}%
          </span>
          <span
            className={`${
              coin.change7d >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {coin.change7d?.toFixed(2)}%
          </span>
          <span>${coin.marketCap}</span>
          <button className="justify-self-end px-4 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-sm mr-2">
            Trade
          </button>
        </div>
      ))}
    </div>
  );
}
