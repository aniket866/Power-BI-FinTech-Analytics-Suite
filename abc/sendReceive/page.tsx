"use client";

import { useState } from "react";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "../../src/components/ui/sidebar";
import SendNav from "./SendNav";
import { 
  Send, 
  ArrowDownToLine, 
  Copy, 
  CheckCircle2, 
  History, 
  User as UserIcon,
  QrCode,
  Share2,
  ScanLine
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  RefreshCw,
  ArrowUpFromLine,
  Gift,
  BarChart3,
  Building2,
  Globe,
  Home,
  Package,
  Settings,
  Lock,
} from "lucide-react";

// --- Components for this Page ---

const TabButton = ({ active, label, icon: Icon, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
      active 
        ? "bg-white text-black shadow-lg shadow-white/10" 
        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

const ContactItem = ({ name, address }: { name: string; address: string }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition group">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
        {name.substring(0, 2).toUpperCase()}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-gray-500 font-mono">{address.substring(0, 6)}...{address.substring(address.length - 4)}</p>
      </div>
    </div>
    <Send size={16} className="text-gray-500 group-hover:text-blue-400 transition" />
  </div>
);

export default function SendReceivePage() {
  const [activeTab, setActiveTab] = useState<"send" | "receive" | "history">("send");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [copied, setCopied] = useState(false);

  // --- Mock Data ---
  const myAddress = "0x71C...9A23";
  const contacts = [
    { name: "Alice design", address: "0x1234567890abcdef1234567890abcdef12" },
    { name: "Bob Engineer", address: "0xabcdef1234567890abcdef1234567890ab" },
    { name: "Marketing DAO", address: "0x7890abcdef1234567890abcdef12345678" },
  ];

  const handleSend = () => {
    if (!address || !amount) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setAddress("");
        setAmount("");
      }, 3000);
    }, 2000);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Sidebar Links (Preserved) ---
  const links = [
    { label: "Home", href: "/home", icon: <Home size={20} /> },
    { label: "Profile", href: "/profile", icon: <UserIcon size={20} /> },
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
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar h-full">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex-1 ml-auto flex flex-col">
        <SendNav />

        <main className="flex-1 flex flex-col items-center justify-start pt-10 px-4">
          
          {/* Tabs */}
          <div className="flex gap-4 mb-10 bg-white/5 p-2 rounded-full backdrop-blur-sm">
            <TabButton 
              active={activeTab === "send"} 
              label="Send" 
              icon={Send} 
              onClick={() => setActiveTab("send")} 
            />
            <TabButton 
              active={activeTab === "receive"} 
              label="Receive" 
              icon={QrCode} 
              onClick={() => setActiveTab("receive")} 
            />
            <TabButton 
              active={activeTab === "history"} 
              label="History" 
              icon={History} 
              onClick={() => setActiveTab("history")} 
            />
          </div>

          <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* --- Left Panel: Active Action --- */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden h-fit">
              <AnimatePresence mode="wait">
                
                {/* SEND VIEW */}
                {activeTab === "send" && (
                  <motion.div 
                    key="send"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6">Send Crypto</h2>
                    
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 ml-1">Recipient Address</label>
                      <div className="flex items-center bg-[#1a1a1a] rounded-xl border border-white/5 focus-within:border-blue-500/50 transition">
                        <input 
                          type="text" 
                          placeholder="0x..." 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-transparent p-4 outline-none text-white font-mono text-sm"
                        />
                        <button className="p-3 text-gray-400 hover:text-white"><ScanLine size={20}/></button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 ml-1">Amount (ETH)</label>
                      <div className="flex items-center bg-[#1a1a1a] rounded-xl border border-white/5 focus-within:border-blue-500/50 transition">
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-transparent p-4 outline-none text-white text-lg font-bold"
                        />
                        <span className="pr-4 text-gray-500 text-sm">~$0.00</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleSend}
                      disabled={status !== "idle" || !address || !amount}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                        status === "sent" 
                          ? "bg-green-500 text-black" 
                          : "bg-blue-600 hover:bg-blue-500 text-white"
                      }`}
                    >
                      {status === "sending" && <RefreshCw className="animate-spin" />}
                      {status === "sent" ? "Sent Successfully!" : status === "sending" ? "Processing..." : "Send Now"}
                    </button>
                  </motion.div>
                )}

                {/* RECEIVE VIEW */}
                {activeTab === "receive" && (
                  <motion.div 
                    key="receive"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col items-center text-center space-y-6"
                  >
                    <h2 className="text-2xl font-bold">Your Wallet Address</h2>
                    <div className="p-4 bg-white rounded-2xl">
                       {/* Placeholder for QR Code */}
                       <div className="w-48 h-48 bg-black/10 flex items-center justify-center">
                          <QrCode size={100} className="text-black"/>
                       </div>
                    </div>
                    <div className="w-full bg-[#1a1a1a] p-4 rounded-xl flex items-center justify-between border border-white/5">
                      <span className="font-mono text-sm text-gray-300 truncate mr-4">{myAddress}</span>
                      <button onClick={handleCopy} className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white">
                        {copied ? <CheckCircle2 size={18} className="text-green-500"/> : <Copy size={18} />}
                      </button>
                    </div>
                    <div className="flex gap-4 w-full">
                       <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition flex items-center justify-center gap-2">
                          <Share2 size={18}/> Share
                       </button>
                    </div>
                  </motion.div>
                )}

                {/* HISTORY VIEW */}
                {activeTab === "history" && (
                   <motion.div 
                   key="history"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                 >
                   <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                   <div className="space-y-4">
                      {[1,2,3].map((i) => (
                        <div key={i} className="flex justify-between items-center p-3 border-b border-white/5">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-500/10 rounded-full text-green-500"><ArrowDownToLine size={16}/></div>
                              <div>
                                <p className="text-sm font-bold">Received ETH</p>
                                <p className="text-xs text-gray-500">From: 0x8a...42b1</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-sm font-bold text-green-400">+1.5 ETH</p>
                              <p className="text-xs text-gray-500">2 mins ago</p>
                           </div>
                        </div>
                      ))}
                   </div>
                 </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* --- Right Panel: Contacts & Info --- */}
            <div className="space-y-6">
               <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <UserIcon size={18} className="text-blue-400"/> Quick Transfer
                  </h3>
                  <div className="space-y-2">
                    {contacts.map((contact, i) => (
                      <div key={i} onClick={() => { setActiveTab("send"); setAddress(contact.address); }}>
                        <ContactItem {...contact} />
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-6">
                  <h3 className="text-lg font-bold mb-2 text-blue-400">Did you know?</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Transactions on the simulated network are instant. In a real environment, gas fees fluctuate based on network demand.
                  </p>
               </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}