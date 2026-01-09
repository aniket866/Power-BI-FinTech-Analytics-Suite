"use client";
import { useState } from "react";
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
  Copy,
  CheckCircle2,
  Wallet,
  CreditCard,
  History,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);

  const walletAddress = "0x71C...9A23";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock Data
  const assets = [
    { symbol: "ETH", name: "Ethereum", balance: 4.5, price: 3450, color: "bg-blue-500" },
    { symbol: "SOL", name: "Solana", balance: 145.0, price: 145, color: "bg-purple-500" },
    { symbol: "USDT", name: "Tether", balance: 2400.50, price: 1, color: "bg-green-500" },
  ];

  const totalBalance = assets.reduce((acc, asset) => acc + asset.balance * asset.price, 0);

  const history = [
    { type: "Send", asset: "ETH", amount: "-0.5", date: "2 mins ago", status: "Completed", icon: Send },
    { type: "Receive", asset: "SOL", amount: "+12.0", date: "1 hour ago", status: "Completed", icon: ArrowDownToLine },
    { type: "Swap", asset: "ETH to USDT", amount: "1.2 ETH", date: "Yesterday", status: "Completed", icon: RefreshCw },
    { type: "Stake", asset: "SOL", amount: "50.0", date: "2 days ago", status: "Staking", icon: Lock },
  ];

  // Sidebar Links
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
    <div className="flex min-h-screen bg-black text-white">
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
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Gradient Blob */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 via-black to-black pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full p-6 z-10">
          
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <User size={40} className="text-gray-400" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">John Doe</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 bg-white/10 rounded text-xs font-mono text-gray-300">{walletAddress}</span>
                  <button onClick={handleCopy} className="text-gray-400 hover:text-white transition">
                    {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-semibold border border-blue-500/30">Verified User</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full font-semibold border border-purple-500/30">Premium Member</span>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0 text-right">
              <p className="text-gray-400 text-sm mb-1">Total Net Worth</p>
              <h2 className="text-4xl font-bold">${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h2>
              <p className="text-green-400 text-sm flex items-center justify-end gap-1 mt-1">
                <TrendingUp size={14} /> +$1,240.50 (2.4%)
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 mb-8">
            {["overview", "assets", "history"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize transition-all border-b-2 ${
                  activeTab === tab
                    ? "border-purple-500 text-white"
                    : "border-transparent text-gray-500 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Asset Allocation */}
                <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-3xl">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Wallet size={18} className="text-gray-400" /> Asset Allocation
                  </h3>
                  <div className="space-y-4">
                    {assets.map((asset) => (
                      <div key={asset.symbol}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{asset.name}</span>
                          <span className="text-gray-400">{((asset.balance * asset.price / totalBalance) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${asset.color}`} 
                            style={{ width: `${(asset.balance * asset.price / totalBalance) * 100}%` }} 
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {asset.balance} {asset.symbol} ≈ ${(asset.balance * asset.price).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4 h-fit">
                  <button className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-3xl text-left hover:scale-[1.02] transition-transform">
                    <CreditCard className="mb-4 text-white/80" />
                    <p className="text-sm text-white/60">Balance</p>
                    <p className="text-xl font-bold">Top Up</p>
                  </button>
                  <button className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-3xl text-left hover:scale-[1.02] transition-transform">
                    <History className="mb-4 text-white/80" />
                    <p className="text-sm text-white/60">Reports</p>
                    <p className="text-xl font-bold">Export CSV</p>
                  </button>
                  <div className="col-span-2 bg-[#0f0f0f] border border-white/10 p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-white/20 transition">
                     <div>
                        <p className="font-bold">Security Settings</p>
                        <p className="text-xs text-gray-400">2FA is currently enabled</p>
                     </div>
                     <Settings className="text-gray-500 group-hover:rotate-90 transition-transform duration-500" />
                  </div>
                </div>

              </div>
            )}

            {activeTab === "assets" && (
              <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-gray-400 text-sm">
                    <tr>
                      <th className="p-6 font-medium">Asset</th>
                      <th className="p-6 font-medium">Price</th>
                      <th className="p-6 font-medium">Balance</th>
                      <th className="p-6 font-medium text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {assets.map((asset) => (
                      <tr key={asset.symbol} className="hover:bg-white/5 transition">
                        <td className="p-6 flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${asset.color} flex items-center justify-center text-xs font-bold`}>
                            {asset.symbol[0]}
                          </div>
                          <div>
                            <p className="font-bold">{asset.name}</p>
                            <p className="text-xs text-gray-500">{asset.symbol}</p>
                          </div>
                        </td>
                        <td className="p-6">${asset.price.toLocaleString()}</td>
                        <td className="p-6">{asset.balance} {asset.symbol}</td>
                        <td className="p-6 text-right font-mono">${(asset.balance * asset.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-4">
                {history.map((item, idx) => (
                  <div key={idx} className="bg-[#0f0f0f] border border-white/10 p-4 rounded-2xl flex items-center justify-between hover:border-white/20 transition">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-full text-gray-300">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{item.type}</p>
                        <p className="text-xs text-gray-500">{item.date} • {item.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-mono text-sm font-bold ${item.amount.startsWith("+") ? "text-green-400" : "text-white"}`}>
                        {item.amount}
                      </p>
                      <p className="text-xs text-gray-500">{item.asset}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 text-sm text-gray-500 hover:text-white transition">View All Activity</button>
              </div>
            )}
          </motion.div>

        </div>
      </main>
    </div>
  );
}
