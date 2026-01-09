"use client";

import { useState } from "react";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "../../src/components/ui/sidebar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import TransactionPopover from "../../src/components/expandable-card-demo-standard";
import SwapNav from "./SwapNav";
import SwapPanel from "./SwapPanel"
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
} from "lucide-react";

type CardProps = {
  name: string;
  paragraph: string;
  buttonText: string;
  imageSrc: string;
  onClick: () => void;
};

function Card({ name, paragraph, buttonText, imageSrc, onClick }: CardProps) {
  return (
    <BackgroundGradient className="rounded-3xl p-6 bg-black flex flex-col items-center justify-between text-center">
      <img src={imageSrc} alt={`${name} Token`} width={120} height={120} className="mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{name} Tokens</h2>
      <p className="text-gray-300 text-sm mb-6">{paragraph}</p>
      <button
        className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </BackgroundGradient>
  );
}

export default function Homepage() {
  const [popoverType, setPopoverType] = useState<"Send" | "Receive" | "Buy" | "Drop" | null>(null);

  const links = [
    { label: "Home", href: "/home", icon: <Home size={20} /> },
    { label: "Profile", href: "/profile", icon: <User size={20} /> },
    { label: "Assets", href: "/assets", icon: <Package size={20} /> },
    { label: "Dashboard", href: "/dashboard", icon: <BarChart3 size={20} /> },
    { label: "Send Tokens", href: "/send", icon: <Send size={20} /> },
    { label: "Receive Tokens", href: "/receive", icon: <ArrowDownToLine size={20} /> },
    { label: "Swap / Exchange", href: "/swap", icon: <RefreshCw size={20} /> },
    { label: "Airdrop", href: "/airdrop", icon: <Gift size={20} /> },
    { label: "Token Launchpad", href: "/launchpad", icon: <Coins size={20} /> },
    { label: "Staking", href: "/staking", icon: <ArrowUpFromLine size={20} /> },
    { label: "DAO Governance", href: "/governance", icon: <Building2 size={20} /> },
    { label: "Explorer", href: "/explorer", icon: <Globe size={20} /> },
    { label: "Settings", href: "/settings", icon: <Settings size={20} /> },
    { label: "Lock", href: "/staking", icon: <Lock size={20} /> },
  ];

  const partners = ["binance", "solana", "coinbase", "metamask"];

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
        <SwapNav />
        <main className="max-w-7xl mx-auto px-4 transition-all duration-500 mt-20">
          {/* Cards */}
          <SwapPanel/>
          {/* Partners */}
          <div className="mt-12 py-10 px-8 flex justify-around items-center bg-black/30 backdrop-blur-lg rounded-xl border border-white/10">
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
          </div>
        </main>
      </div>

      {/* Transaction Popover */}
      {popoverType && (
        <TransactionPopover
          isOpen={!!popoverType}
          onClose={() => setPopoverType(null)}
          type={popoverType}
        />
      )}
    </div>
  );
}
