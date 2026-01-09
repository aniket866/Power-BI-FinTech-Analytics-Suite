import { motion } from "framer-motion";
import { connectToWallet, formatAddress } from "@/lib/Wallet";
import { useState } from "react";
import { Bell ,Wallet } from "lucide-react";


export default function CreateTokenNav() {

 const navItems = [
  { name: "Create Token", href: "#create-token" },
  { name: "Available Token Environments", href: "#token-environments" },
  { name: "How to Create", href: "/HowToCreate" },
  { name: "Security", href: "#security" },
  { name: "Gas Fees?", href: "#gas-fees" },
  { name: "FAQ", href: "#faq" },
];
const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        if (isConnecting) return;
        setIsConnecting(true);

        try {
            const address = await connectToWallet();
            if (address) {
                setWalletAddress(address);
            }
        } catch (err) {
            console.error("Connection error:", err);
        } finally {
            setIsConnecting(false);
        }
    };


  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full py-4 px-6 flex items-center justify-evenly bg-black fixed top-0 z-50 border-b border-white/20"
    >
      {/* All Tokens Dropdown */}
     
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

     
      {/* Connect Wallet Button */}
       <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
        </button>

        {/* Connect Wallet */}
        <button
          onClick={handleConnect}
          className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-purple-500/20 transition-all active:scale-95"
        >
          <Wallet size={16} />
          {walletAddress ? formatAddress(walletAddress) : "Connect Wallet"}
        </button>
    </motion.nav>
  );
}
