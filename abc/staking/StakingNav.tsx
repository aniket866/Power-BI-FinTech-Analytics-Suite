import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Layers,
  Unlock,
  Calculator,
  HelpCircle,
  GraduationCap,
  Coins,
} from "lucide-react";


export default function StakingNav() {

  const navItems = [
  { label: "Overview", href: "/staking", icon: <BookOpen size={20} /> },
  { label: "How It Works", href: "/howItWorks", icon: <Layers size={20} /> },
  { label: "Supported Tokens", href: "/staking/tokens", icon: <Coins size={20} /> },
  { label: "Rewards", href: "/staking/rewards", icon: <BarChart3 size={20} /> },
  { label: "Unstaking", href: "/staking/unstaking", icon: <Unlock size={20} /> },
  { label: "Calculator", href: "/staking/calculator", icon: <Calculator size={20} /> },
  { label: "FAQs", href: "/staking/faqs", icon: <HelpCircle size={20} /> },
  { label: "Guides", href: "/staking/guides", icon: <GraduationCap size={20} /> },
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
              {item.label}
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
