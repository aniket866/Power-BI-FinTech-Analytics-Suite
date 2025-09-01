"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import   CryptoPanel from "@/components/ui/CryptoPanel";
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

import CryptoCards from "@/components/ui/CryptoCards";

// import CryptoCards from "../components/ui/CryptoCards"
import { HoverEffect } from "../components/ui/card-hover-effect";
export default function Page() {
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

  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar>
  <SidebarBody>
-  
+    <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar h-full">
      {links.map((link, idx) => (
        <SidebarLink key={idx} link={link} />
      ))}
    </div>
  </SidebarBody>
</Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Bar */}
        {/* <div className="flex justify-between bg-black items-center px-6 py-4 sticky top-0 z-50">
          <div className="flex"></div>
          <div className="flex gap-4">
            <button className="px-5 py-2 rounded-full bg-white text-black font-semibold shadow-md hover:shadow-xl transition-transform hover:scale-105">
              Login
            </button>
            <button className="px-5 py-2 rounded-full bg-black text-white border border-white/20 font-semibold shadow-md hover:shadow-xl transition-transform hover:scale-105">
              Sign Up
            </button>
          </div>
        </div> */}

        {/* Page Content */}
        <div className="flex-1 p-0">
            {/* <CryptoCards></CryptoCards> */}
             {/* <HoverEffect items={cryptoItems} /> */}
        </div>

          <div>
               <CryptoPanel />

          </div>

      </div>
    </div>
  );
}
