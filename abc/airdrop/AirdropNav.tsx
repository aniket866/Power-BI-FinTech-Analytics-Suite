import { motion } from "framer-motion";
import { useState } from "react";

export default function AirdropNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "#" },
    { name: "Fresh Airdrops", href: "#" },
    { name: "Trending Drops", href: "#" },
  ];

  const dropdownItems = [
    "Hyperliquid Airdrops",
    "Monad Airdrops",
    "Soneium Airdrops",
    "Solana Airdrops",
    "Base Airdrops",
    "Aptos Airdrops",
    "TON Airdrops",
    "zkSync Airdrops",
    "Scroll Airdrops",
    "Blast Airdrops",
    "Telegram Airdrops",
    "Show All",
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full py-4 px-8 flex items-center justify-between bg-black fixed top-0 z-50 border-b border-white/20"
    >
      {/* LEFT: Navigation */}
      <div className="flex-1">
        <ul className="flex space-x-10 text-lg font-medium">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="hover:text-gray-300 transition cursor-pointer"
            >
              {item.name}
            </li>
          ))}

          {/* Dropdown */}
          <li
            className="relative group"
          >
            <span className="hover:text-gray-300 transition cursor-pointer">
              Featured Drops
            </span>
            <div className="absolute top-full left-0 mt-2 w-56 bg-black border border-white/20 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <ul className="flex flex-col">
                {dropdownItems.map((drop, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-white/10 cursor-pointer text-white"
                  >
                    {drop}
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="hover:text-gray-300 transition cursor-pointer">
            Help Center
          </li>
          <li className="hover:text-gray-300 transition cursor-pointer">
            Support
          </li>
        </ul>
      </div>

      {/* RIGHT: Search and Button */}
      <div className="flex items-center space-x-18">
        <input
          type="text"
          placeholder="Search Airdrops"
          className="px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 w-46"
        />
        <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition whitespace-nowrap mr-13">
          Connect Wallet
        </button>
      </div>
    </motion.nav>
  );
}
