"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import HomePage from "@/components/HomePage";
import CryptoMarket from "@/components/CryptoMarket"; // Import the new component
import {
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Wallet,
  TrendingUp, // Icon for Market
  GrapeIcon
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Page() {
  const [open, setOpen] = useState(false);
  // State to track the active view
  const [activeView, setActiveView] = useState<"dashboard" | "market" | "profile" | "settings">("dashboard");

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      action: () => setActiveView("dashboard"),
    },
    {
      label: "Market", // New Link
      href: "#",
      icon: (
        <TrendingUp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      action: () => setActiveView("market"),
    },
   
     {
      label: "How to Create",
      href: "/HowToCreate",
      icon: (
        <GrapeIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
     {
      label: "Create my own Token",
      href: "/CreateToken",
      icon: (
        <GrapeIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      action: () => setActiveView("profile"),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      action: () => setActiveView("settings"),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      action: () => console.log("Logout clicked"),
    },
    

  ];

  
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <HomePage />;
      case "market":
        return <CryptoMarket />;
      case "profile":
        return <div className="p-10 text-white">Profile Page Placeholder</div>;
      case "settings":
        return <div className="p-10 text-white">Settings Page Placeholder</div>;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={link.action} className="cursor-pointer">
                   <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <SidebarLink
              link={{
                label: "Aniket",
                href: "#",
                icon: (
                  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white font-bold">
                    A
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto h-full bg-[#09090b] transition-all duration-300">
        {renderContent()}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Project Web3
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};