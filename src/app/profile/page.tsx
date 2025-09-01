"use client";
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const navItems = ["Dashboard", "Profile", "Wallet", "Settings"];
  const transactions = [
    {
      id: 1,
      date: "2025-08-30",
      type: "Sent",
      amount: "-0.5 SOL",
      status: "Completed",
    },
    {
      id: 2,
      date: "2025-08-28",
      type: "Received",
      amount: "+1.2 SOL",
      status: "Completed",
    },
    {
      id: 3,
      date: "2025-08-25",
      type: "Minted NFT",
      amount: "-0.1 SOL",
      status: "Pending",
    },
  ];
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

  return (
    <div className="flex min-h-screen bg-black text-white">
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
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 bg-neutral-900 border-b border-neutral-800">
          <div className="flex gap-8">
            {navItems.map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1, y: -2 }}
                className="cursor-pointer font-semibold text-gray-300 hover:text-white transition-all"
              >
                {item}
              </motion.div>
            ))}
          </div>

          {/* Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center px-4 py-2 bg-white text-black rounded-lg">
              More <ChevronDownIcon className="w-5 h-5 ml-2" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg p-2 text-white">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`p-2 rounded-lg ${
                        active ? "bg-neutral-700" : ""
                      }`}
                    >
                      Account
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`p-2 rounded-lg ${
                        active ? "bg-neutral-700" : ""
                      }`}
                    >
                      Help
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </nav>

        {/* Profile Section */}
        <section className="flex flex-col items-center mt-8">
         
          <h1 className="text-3xl font-bold mt-4">John Doe</h1>
          <p className="text-gray-400">Wallet: 0x1234...abcd</p>
          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 bg-white text-black rounded-lg">
              Send
            </button>
            <button className="px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-lg">
              Receive
            </button>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex justify-center mt-8 space-x-6">
          {["overview", "nfts", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <>
              <h2 className="text-xl font-bold mb-4">Transaction History</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-neutral-800 rounded-lg">
                  <thead className="bg-neutral-900">
                    <tr>
                      <th className="p-3">Date</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-t border-neutral-800 hover:bg-neutral-800"
                      >
                        <td className="p-3">{tx.date}</td>
                        <td className="p-3">{tx.type}</td>
                        <td className="p-3">{tx.amount}</td>
                        <td className="p-3">{tx.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === "nfts" && <div>NFT Collection Coming Soon...</div>}
          {activeTab === "settings" && <div>Settings Panel Coming Soon...</div>}
        </div>
      </main>
    </div>
  );
}
