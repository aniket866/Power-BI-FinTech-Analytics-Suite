"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
// import { StickyBanner } from "@/components/ui/sticky-banner";
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
  Home,
  User,
  Package,
  Settings,
  Lock,
  X,
} from "lucide-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import AirdropNav from "./AirdropNav";

export default function Homepage() {
  // const [showBanner, setShowBanner] = useState(true);

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

// Simulated 30 Airdrop items
const airdrops = Array.from({ length: 30 }, (_, i) => ({
  title: `Airdrop ${i + 1}`,
  description: `Claim your rewards from Airdrop ${i + 1}. Exclusive opportunity!`,
  link: "#",
}));

// Base Crypto Data
const baseCryptos = [
  {
    title: "Bitcoin",
    description: "The king of cryptocurrencies, decentralized and scarce.",
    link: "/bitcoin",
  },
  {
    title: "Ethereum",
    description: "Smart contract platform powering DeFi & NFTs.",
    link: "/ethereum",
  },
  {
    title: "Binance Coin",
    description: "BNB powers Binance ecosystem & trading.",
    link: "/binance",
  },
];

// Simulated 30 Crypto items
const cryptoItems = Array.from({ length: 30 }, (_, i) => {
  const base = baseCryptos[i % baseCryptos.length]; // cycle through 3 cryptos
  return {
    title: `${base.title} ${i + 1}`,
    description: `${base.description} (Listing #${i + 1})`,
    link: `${base.link}-${i + 1}`,
  };
});

console.log(airdrops, cryptoItems);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
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
        <AirdropNav/>

        {/* Banner After Navbar */}
        {/* {showBanner && (
          <div className="mt-16">
            <StickyBanner className="bg-green-600 relative">
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200"
              >
                <X size={20} />
              </button>
              <p className="mx-0 max-w-[90%] text-white drop-shadow-md text-center">
                🚀 Announcing $10M seed funding from Project Mayhem Ventures.{" "}
                <a href="#" className="underline hover:text-green-200">
                  Read announcement
                </a>
              </p>
            </StickyBanner>
          </div>
        )} */}

        {/* Hero Section */}
        <main
          className={`max-w-7xl mx-auto px-4 transition-all duration-500 ${
            "mt-10" 
          }`}
        >
          <HoverEffect items={cryptoItems} />


          {/* Partners Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 py-10 px-8 flex justify-around items-center bg-black/30 backdrop-blur-lg rounded-xl border border-white/10"
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
