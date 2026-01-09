import { motion } from "framer-motion";
import { useState } from "react";

export default function SwapNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { name: "Swap", href: "#" },
    { name: "Trending", href: "/trending" },
    { name: "Popular", href: "#" },
    { name: "Favorites", href: "#" },
    { name: "Price Chart", href: "/priceChart" },
    { name: "Gas Estimator", href: "#" },
  ];

  const AllTokens = [
    { name: "Bitcoin", symbol: "BTC", price: 56789.45 },
    { name: "Ethereum", symbol: "ETH", price: 3456.78 },
    { name: "Tether", symbol: "USDT", price: 1.0 },
    { name: "BNB", symbol: "BNB", price: 412.32 },
    { name: "Solana", symbol: "SOL", price: 195.32 },
    { name: "XRP", symbol: "XRP", price: 0.65 },
    { name: "Cardano", symbol: "ADA", price: 0.38 },
    { name: "Dogecoin", symbol: "DOGE", price: 0.082 },
    { name: "Polygon", symbol: "MATIC", price: 0.74 },
    { name: "Avalanche", symbol: "AVAX", price: 32.45 },
    { name: "Toncoin", symbol: "TON", price: 7.23 },
    { name: "Show All", symbol: "", price: null },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full py-4 px-6 flex items-center justify-evenly bg-black fixed top-0 z-50 border-b border-white/20"
    >
      {/* All Tokens Dropdown */}
      <div className="relative group">
        <span className="hover:text-gray-300 transition cursor-pointer text-white">
          All Tokens
        </span>
        <div className="absolute top-full left-0 mt-2 w-64 bg-black border border-white/20 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <ul className="flex flex-col">
            {AllTokens.map((token, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center px-4 py-2 hover:bg-white/10 cursor-pointer text-white"
              >
                <span>
                  {token.name}{" "}
                  {token.symbol && (
                    <span className="text-gray-400">({token.symbol})</span>
                  )}
                </span>
                {token.price !== null && (
                  <span className="text-green-400">${token.price.toFixed(2)}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nav Links */}
      {navItems.map((item, index) => (
        <a
          key={index}
          className="hover:text-gray-300 transition cursor-pointer text-white"
          href={item.href}
        >
          {item.name}
        </a>
      ))}

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Tokens"
        className="px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 w-48"
      />

      {/* Connect Wallet Button */}
      <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition whitespace-nowrap">
        Connect Wallet
      </button>
    </motion.nav>
  );
}
