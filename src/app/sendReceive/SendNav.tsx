import { motion } from "framer-motion";
import { useState } from "react";

export default function SendNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { name: "Send & Receive", href: "#" },
    { name: "Transaction History", href: "#" },
    { name: "Wallet Management", href: "#" },
    { name: "Security", href: "#" },
    { name: "Support", href: "#" },
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
        </ul>
      </div>

      {/* RIGHT: Search and Button */}
      <div className="flex items-center space-x-18">
        
        <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition whitespace-nowrap mr-13">
          Connect Wallet
        </button>
      </div>
    </motion.nav>
  );
}
