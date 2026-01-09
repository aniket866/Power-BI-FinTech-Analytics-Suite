"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCcw,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { connectToWallet, formatAddress } from "@/lib/Wallet";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_1y_in_currency: number;
}

export default function CryptoMarket() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CoinData;
    direction: "asc" | "desc";
  } | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "gainers" | "losers">("all");

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h,7d,30d,1y"
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setCoins(data);
        applyFilters(data, search, filterType);
      }
    } catch (error) {
      console.error("Failed to fetch market data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  const applyFilters = (
    data: CoinData[],
    searchText: string,
    type: "all" | "gainers" | "losers"
  ) => {
    let filtered = data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchText.toLowerCase())
    );

    if (type === "gainers") {
      filtered = filtered.filter(
        (c) => c.price_change_percentage_24h_in_currency > 0
      );
      filtered.sort(
        (a, b) =>
          b.price_change_percentage_24h_in_currency -
          a.price_change_percentage_24h_in_currency
      );
    } else if (type === "losers") {
      filtered = filtered.filter(
        (c) => c.price_change_percentage_24h_in_currency < 0
      );
      filtered.sort(
        (a, b) =>
          a.price_change_percentage_24h_in_currency -
          b.price_change_percentage_24h_in_currency
      );
    }

    setFilteredCoins(filtered);
  };

  useEffect(() => {
    applyFilters(coins, search, filterType);
  }, [search, filterType, coins]);

  const handleSort = (key: keyof CoinData) => {
    let direction: "asc" | "desc" = "desc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredCoins].sort((a, b) => {
      // @ts-ignore
      const aValue = a[key] || 0;
      // @ts-ignore
      const bValue = b[key] || 0;
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredCoins(sorted);
  };

  const handleConnect = async () => {
    try {
      const address = await connectToWallet();
      if (address) setWalletAddress(address);
    } catch (err) {
      console.error("Connect failed", err);
    }
  };

  const handleTrade = async (action: "buy" | "sell", coin: CoinData) => {
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      handleConnect();
      return;
    }
    try {
      // @ts-ignore
      if (window.ethereum) {
        // @ts-ignore
        await window.ethereum.request({
          method: "personal_sign",
          params: [
            `Request to ${action.toUpperCase()} ${coin.name} at $${coin.current_price}`,
            walletAddress,
          ],
        });
        alert(`Successfully initiated ${action.toUpperCase()} order for ${coin.name}`);
      }
    } catch (error) {
      console.error("Trade cancelled", error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value < 1 ? 4 : 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    if (!value) return "0.00%";
    return `${value.toFixed(2)}%`;
  };

  const PriceCell = ({ value }: { value: number }) => {
    const isPositive = value >= 0;
    return (
      <div className={cn("flex items-center gap-1", isPositive ? "text-green-400" : "text-red-400")}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span className="font-medium">{formatPercentage(value)}</span>
      </div>
    );
  };

  return (
    // "min-h-screen" allows the page to grow naturally. No fixed height constraint.
    <div className="min-h-screen w-full bg-[#09090b] text-white font-sans flex flex-col">
      
      {/* --- MARKET NAVBAR --- */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-2 bg-blue-600 rounded-lg shrink-0">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">ProDex Market</h1>
            <div className="flex items-center gap-2 text-xs text-gray-400">
               <span>Showing {filteredCoins.length} Assets</span>
            </div>
          </div>
        </div>

        {/* Search, Filter, Refresh, Connect */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          
          {/* Search Box */}
          <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10 flex-1 md:flex-none">
            <Search size={16} className="text-gray-400 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search Coin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm text-white w-full md:w-32 lg:w-48 placeholder:text-gray-500"
            />
          </div>

          {/* Filter Dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="bg-white/5 text-sm text-gray-300 focus:outline-none cursor-pointer rounded-full px-4 py-2 border border-white/10"
          >
            <option value="all" className="bg-black">All</option>
            <option value="gainers" className="bg-black">Gainers</option>
            <option value="losers" className="bg-black">Losers</option>
          </select>

          {/* Refresh Button */}
          <button 
            onClick={fetchMarketData} 
            title="Refresh Data"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <RefreshCcw size={18} className={cn("text-gray-300", loading && "animate-spin")} />
          </button>

          {/* Wallet Button */}
          <button
            onClick={handleConnect}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm whitespace-nowrap"
          >
            <Wallet size={16} />
            {walletAddress ? formatAddress(walletAddress) : "Connect"}
          </button>
        </div>
      </motion.nav>

      {/* --- FULL PAGE TABLE --- */}
      {/* Removed inner overflow containers. Table is now part of the main document flow */}
      <div className="w-full p-0 md:p-6 flex-1">
        <div className="w-full rounded-none md:rounded-2xl border-none md:border border-white/10 bg-transparent md:bg-black/40 md:shadow-2xl overflow-hidden">
          
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#121214] border-b border-white/10 sticky top-[73px] z-40 shadow-sm">
              <tr className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
                <th className="p-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("market_cap")}>Asset</th>
                <th className="p-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("current_price")}>Price</th>
                <th className="p-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("price_change_percentage_24h_in_currency")}>24h %</th>
                <th className="p-4 text-right hidden md:table-cell cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("market_cap")}>Mkt Cap</th>
                <th className="p-4 text-right hidden lg:table-cell cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("total_volume")}>Volume</th>
                <th className="p-4 text-center">Trade</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/5">
              {loading
                ? Array.from({ length: 15 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="p-4"><div className="h-10 w-32 bg-white/5 rounded-lg"></div></td>
                      <td className="p-4"><div className="h-6 w-20 bg-white/5 rounded ml-auto"></div></td>
                      <td className="p-4"><div className="h-6 w-16 bg-white/5 rounded ml-auto"></div></td>
                      <td className="p-4 hidden md:table-cell"><div className="h-6 w-24 bg-white/5 rounded ml-auto"></div></td>
                      <td className="p-4 hidden lg:table-cell"><div className="h-6 w-24 bg-white/5 rounded ml-auto"></div></td>
                      <td className="p-4"><div className="h-8 w-24 bg-white/5 rounded mx-auto"></div></td>
                    </tr>
                  ))
                : filteredCoins.map((coin, idx) => (
                    <motion.tr
                      key={coin.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      {/* Asset */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600 w-4 text-sm font-mono hidden sm:block">{idx + 1}</span>
                          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                              {coin.name}
                            </div>
                            <div className="text-xs text-gray-500 uppercase">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4 text-right">
                        <div className="font-mono font-medium text-white text-sm md:text-base">
                          {formatCurrency(coin.current_price)}
                        </div>
                      </td>

                      {/* 24h Change */}
                      <td className="p-4 text-right">
                        <div className="flex justify-end">
                          <PriceCell value={coin.price_change_percentage_24h_in_currency} />
                        </div>
                      </td>

                      {/* Market Cap */}
                      <td className="p-4 text-right text-gray-400 hidden md:table-cell font-mono text-sm">
                        {formatCurrency(coin.market_cap)}
                      </td>

                      {/* Volume */}
                      <td className="p-4 text-right text-gray-400 hidden lg:table-cell font-mono text-sm">
                        {formatCurrency(coin.total_volume)}
                      </td>

                      {/* Trade Actions */}
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleTrade("buy", coin)}
                            className="bg-green-500/10 text-green-400 border border-green-500/50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-500 hover:text-black transition-all"
                          >
                            BUY
                          </button>
                          <button
                            onClick={() => handleTrade("sell", coin)}
                            className="bg-red-500/10 text-red-400 border border-red-500/50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-black transition-all"
                          >
                            SELL
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
            </tbody>
          </table>
          
          {!loading && filteredCoins.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Filter size={48} className="mb-4 opacity-20" />
                  <p>No assets found matching "{search}"</p>
              </div>
          )}
        </div>
      </div>
      
      {/* Hide Scrollbar Style Injection */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}