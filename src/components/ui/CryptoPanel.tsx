"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, RefreshCw, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Fallback data in case API limit is reached
const MOCK_DATA = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", current_price: 64230, price_change_percentage_1h_in_currency: 0.5, price_change_percentage_24h_in_currency: 2.1, price_change_percentage_7d_in_currency: -1.2, market_cap: 1200000000000 },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", current_price: 3450, price_change_percentage_1h_in_currency: -0.2, price_change_percentage_24h_in_currency: 1.5, price_change_percentage_7d_in_currency: 4.8, market_cap: 400000000000 },
  { id: "solana", name: "Solana", symbol: "SOL", current_price: 145, price_change_percentage_1h_in_currency: 1.2, price_change_percentage_24h_in_currency: 5.4, price_change_percentage_7d_in_currency: 12.1, market_cap: 65000000000 },
  { id: "tether", name: "Tether", symbol: "USDT", current_price: 1.00, price_change_percentage_1h_in_currency: 0.0, price_change_percentage_24h_in_currency: 0.01, price_change_percentage_7d_in_currency: -0.01, market_cap: 110000000000 },
  { id: "ripple", name: "XRP", symbol: "XRP", current_price: 0.62, price_change_percentage_1h_in_currency: -0.5, price_change_percentage_24h_in_currency: -1.2, price_change_percentage_7d_in_currency: 2.3, market_cap: 34000000000 },
];

const logos: Record<string, string> = {
  BTC: "₿",
  ETH: "Ξ",
  USDT: "$",
  SOL: "◎",
  XRP: "✕",
  BNB: "❖",
  DOGE: "Ð",
  ADA: "₳",
};

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

export default function CryptoPanel() {
  const [selectedFilter, setSelectedFilter] = useState("Top");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h,24h,7d"
      );
      
      if (!res.ok) {
        throw new Error("Rate limit or API error");
      }

      const data = await res.json();
      const formattedData = data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        change1h: coin.price_change_percentage_1h_in_currency || 0,
        change24h: coin.price_change_percentage_24h_in_currency || 0,
        change7d: coin.price_change_percentage_7d_in_currency || 0,
        marketCap: coin.market_cap.toLocaleString(),
      }));

      setCoins(formattedData);
      setLastUpdated(new Date());
    } catch (err) {
      console.warn("API Failed, using mock data:", err);
      // Fallback to mock data if API fails
      const formattedMock = MOCK_DATA.map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        change1h: coin.price_change_percentage_1h_in_currency,
        change24h: coin.price_change_percentage_24h_in_currency,
        change7d: coin.price_change_percentage_7d_in_currency,
        marketCap: coin.market_cap.toLocaleString(),
      }));
      setCoins(formattedMock);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoins();
    // Auto refresh every 60 seconds
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, [fetchCoins]);

  const filters = [
    "Top",
    "Trending",
    "New",
    "Gainers",
    "Real-World Assets",
  ];

  // Neon colors for top tokens
  const neonColors: Record<string, string> = {
    BTC: "text-orange-400 drop-shadow-[0_0_6px_#ff9500]",
    ETH: "text-purple-400 drop-shadow-[0_0_6px_#a855f7]",
    USDT: "text-green-400 drop-shadow-[0_0_6px_#22c55e]",
    SOL: "text-cyan-400 drop-shadow-[0_0_6px_#06b6d4]",
  };

  return (
    <div className="w-full bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* ===== Header Navigation ===== */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 p-6 gap-4">
        <div className="flex space-x-2 overflow-x-auto no-scrollbar max-w-full">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedFilter === f
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-500 hidden md:inline">
             Updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button 
            onClick={fetchCoins}
            disabled={loading}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          <button className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 flex items-center transition">
            Filter <ChevronDown size={16} className="ml-2" />
          </button>
        </div>
      </div>

      {/* ===== Table Header ===== */}
      <div className="grid grid-cols-2 md:grid-cols-8 gap-4 text-gray-500 text-xs uppercase tracking-wider font-semibold py-4 px-6 border-b border-white/5">
        <span className="md:col-span-2">Asset</span>
        <span className="hidden md:block">Price</span>
        <span className="hidden md:block">1h %</span>
        <span className="hidden md:block">24h %</span>
        <span className="hidden md:block">7d %</span>
        <span className="hidden md:block">Market Cap</span>
        <span className="text-right">Action</span>
      </div>

      {/* ===== Table Rows ===== */}
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        {loading && coins.length === 0 ? (
           // Skeleton Loader
           [...Array(5)].map((_, i) => (
             <div key={i} className="h-16 border-b border-white/5 animate-pulse bg-white/5" />
           ))
        ) : (
          coins.map((coin, index) => (
            <div
              key={coin.id}
              className="grid grid-cols-2 md:grid-cols-8 gap-4 items-center py-4 px-6 border-b border-white/5 hover:bg-white/5 transition duration-300 group"
            >
              {/* Name & Rank */}
              <div className="md:col-span-2 flex items-center gap-4">
                <span className="text-gray-600 w-4 text-sm font-mono">{index + 1}</span>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-lg ${neonColors[coin.symbol]}`}>
                    {logos[coin.symbol] || coin.symbol[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-bold text-sm tracking-wide ${neonColors[coin.symbol] || "text-white"}`}>
                      {coin.name}
                    </span>
                    <span className="text-xs text-gray-500">{coin.symbol}</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="hidden md:block text-sm font-medium text-white">
                ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              {/* 1h Change */}
              <div className={`hidden md:flex items-center text-sm ${coin.change1h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.change1h >= 0 ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {Math.abs(coin.change1h).toFixed(2)}%
              </div>

              {/* 24h Change */}
              <div className={`hidden md:flex items-center text-sm ${coin.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.change24h >= 0 ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {Math.abs(coin.change24h).toFixed(2)}%
              </div>

              {/* 7d Change */}
              <div className={`hidden md:flex items-center text-sm ${coin.change7d >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.change7d >= 0 ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {Math.abs(coin.change7d).toFixed(2)}%
              </div>

              {/* Market Cap */}
              <div className="hidden md:block text-sm text-gray-400">
                ${coin.marketCap}
              </div>

              {/* Action */}
              <div className="text-right">
                <button className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  Trade
                </button>
              </div>
            </div>
          ))
        )}
        
        {error && (
            <div className="text-center py-4 text-xs text-yellow-500/80">
                Running in offline mode (API Limit Reached)
            </div>
        )}
      </div>
    </div>
  );
}