"use client";

import { motion,AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "../../src/components/ui/sidebar"; // import your Sidebar



import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import ColourfulText from "@/components/ui/colourful-text";

type Step = {
  title: string;
  content: string;
};

const steps: Step[] = [
  {
    title: "Step 1: Connect Your Wallet",
    content: "Connect MetaMask, WalletConnect, or other Web3 wallets to get started.",
  },
  {
    title: "Step 2: Configure Your Token",
    content: "Set your token name, symbol, total supply, decimals, and optional logo.",
  },
  {
    title: "Step 3: Customize Features",
    content: "Enable staking, burnable, mintable, or governance features for your token.",
  },
  {
    title: "Step 4: Deploy to Blockchain",
    content: "Choose a blockchain (Ethereum, Polygon, BSC, etc.) and securely deploy.",
  },
  {
    title: "Step 5: Share and Manage",
    content: "View token details, transfer ownership, add liquidity, or share with your community.",
  },
];

import {
  Send,
  Coins,
  RefreshCw,
  ArrowDownToLine,
  ArrowUpFromLine,
  Gift,
  BarChart3,
  Building2,
  Globe,
  Settings,
  Lock,
  Home,
  User,
  Package,
} from "lucide-react";

export default function Homepage() {
  const links = [
    { label: "Home", href: "/home", icon: <Home size={20} /> },
    { label: "Profile", href: "/profile", icon: <User size={20} /> },
    { label: "Assets", href: "/assets", icon: <Package size={20} /> },

    { label: "Dashboard", href: "/dashboard", icon: <BarChart3 size={20} /> },
    { label: "Send Tokens", href: "/send", icon: <Send size={20} /> },
    {
      label: "Receive Tokens",
      href: "/receive",
      icon: <ArrowDownToLine size={20} />,
    },
    { label: "Swap / Exchange", href: "/swap", icon: <RefreshCw size={20} /> },
    { label: "Airdrop", href: "/airdrop", icon: <Gift size={20} /> },
    { label: "Token Launchpad", href: "/launchpad", icon: <Coins size={20} /> },
    { label: "Staking", href: "/staking", icon: <ArrowUpFromLine size={20} /> },
    {
      label: "DAO Governance",
      href: "/governance",
      icon: <Building2 size={20} />,
    },
    { label: "Explorer", href: "/explorer", icon: <Globe size={20} /> },
    { label: "Settings", href: "/settings", icon: <Settings size={20} /> },
    { label: "Lock", href: "/staking", icon: <Lock size={20} /> },
  ];

  const partners = ["binance", "solana", "coinbase", "metamask"]; 


 
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar using your component */}
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar h-full">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 ml-auto">
        {/* Navbar */}
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full py-4 flex justify-between items-center bg-black/60 backdrop-blur-lg fixed top-0 z-50 border-b border-white/10"
        >
          <div className="text-xl font-bold">NFT Collection</div>
          <div className="flex items-center space-x-4 mr-15">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Search size={18} className="text-white mr-2" />
              <input
                type="text"
                placeholder="Search Arts and NFT"
                className="bg-transparent outline-none text-sm text-white"
              />
            </div>
            <a className="hover:text-gray-300 cursor-pointer">Explore</a>
            <a className="hover:text-gray-300 cursor-pointer">About Us</a>
            <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
              Connect Wallet
            </button>
          </div>
        </motion.nav>

        <main className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <main className="w-full">
            {/* Hero Section */}
            <section className="pt-20 pb-20 grid grid-cols-1 md:grid-cols-2 items-center">
              {/* Left Side Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="flex"
              >
                <div className="relative w-full h-[550px] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/foxImageLeft.png"
                    alt="NFT Art"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center -100px",
                    }}
                  />
                </div>
              </motion.div>
 <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="px-8 w-full max-w-2xl"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-white tracking-wide uppercase">
        How to Create Your Token
      </h2>
     

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-700 bg-black"
          >
            <button
              onClick={() => toggleStep(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left text-gray-100 font-semibold hover:bg-gray-900 transition-colors duration-300 rounded-xl"
            >
              {step.title}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-gray-300" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                    {step.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
            </section>
          </main>

          {/* Partners Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-10 px-8 flex justify-around items-center bg-black/30 backdrop-blur-lg rounded-xl border border-white/10"
          >
            {partners.map((p, idx) => (
              <Image
                key={idx}
                src={`/${p}.svg`}
                alt={p}
                width={40}
                height={40}
                className="h-10 grayscale hover:grayscale-0 transition"
              />
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
