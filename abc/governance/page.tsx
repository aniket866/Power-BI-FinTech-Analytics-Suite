"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar, SidebarBody, SidebarLink } from "../../src/components/ui/sidebar";
import GovernanceNav from "./GovernanceNav";
import {
  Send, Coins, RefreshCw, ArrowDownToLine, ArrowUpFromLine, Gift,
  BarChart3, Building2, Globe, Home, User, Package, Settings, Lock,
  CheckCircle2, XCircle, Clock, ChevronRight, X
} from "lucide-react";

// --- Mock Proposals Data ---
const PROPOSALS = [
  {
    id: 1,
    title: "GIP-12: Reduce Staking Fees by 50%",
    description: "This proposal aims to lower the staking unstake fee from 2% to 1% to encourage more long-term participation.",
    status: "Active",
    votesFor: 1250000,
    votesAgainst: 45000,
    votesAbstain: 10000,
    endsIn: "2 days",
    tags: ["Treasury", "Staking"],
    author: "0x71...9A23"
  },
  {
    id: 2,
    title: "GIP-11: Add AVAX to Lending Pool",
    description: "Integrate Avalanche (AVAX) as a collateral asset in the lending protocol with an LTV of 75%.",
    status: "Passed",
    votesFor: 3500000,
    votesAgainst: 120000,
    votesAbstain: 50000,
    endsIn: "Ended",
    tags: ["Integration"],
    author: "0x8a...42b1"
  },
  {
    id: 3,
    title: "GIP-10: Increase Developer Grant Fund",
    description: "Allocate an additional 500,000 tokens to the developer grant program for Q4 2024.",
    status: "Defeated",
    votesFor: 800000,
    votesAgainst: 1200000,
    votesAbstain: 20000,
    endsIn: "Ended",
    tags: ["Treasury"],
    author: "0xcc...11a2"
  },
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

export default function GovernancePage() {
  const [selectedProposal, setSelectedProposal] = useState<typeof PROPOSALS[0] | null>(null);
  const [voteType, setVoteType] = useState<"for" | "against" | "abstain" | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  const votingPower = 14500; // Mock user voting power

  const handleVote = () => {
    if (!voteType) return;
    setHasVoted(true);
    // In a real app, this would submit to the blockchain
  };

  const closeVoteModal = () => {
    setSelectedProposal(null);
    setHasVoted(false);
    setVoteType(null);
  };

  const calculatePercentage = (val: number, total: number) => {
    if (total === 0) return 0;
    return ((val / total) * 100).toFixed(1);
  };

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

      <div className="flex-1 ml-auto flex flex-col relative">
        <GovernanceNav />

        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          
          {/* Stats Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-3xl bg-[#0f0f0f] border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Treasury Balance</p>
              <h3 className="text-3xl font-bold">$4,250,000</h3>
            </div>
             <div className="p-6 rounded-3xl bg-[#0f0f0f] border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Your Voting Power</p>
              <h3 className="text-3xl font-bold text-indigo-400">{votingPower.toLocaleString()} VP</h3>
            </div>
             <div className="p-6 rounded-3xl bg-[#0f0f0f] border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Active Proposals</p>
              <h3 className="text-3xl font-bold">1</h3>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Recent Proposals</h2>

          <div className="space-y-4">
            {PROPOSALS.map((prop) => {
              const totalVotes = prop.votesFor + prop.votesAgainst + prop.votesAbstain;
              return (
                <motion.div
                  key={prop.id}
                  onClick={() => setSelectedProposal(prop)}
                  whileHover={{ scale: 1.01 }}
                  className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-indigo-500/50 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          prop.status === "Active" ? "bg-green-500/10 border-green-500/20 text-green-500" :
                          prop.status === "Passed" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-500" :
                          "bg-red-500/10 border-red-500/20 text-red-500"
                       }`}>
                          {prop.status}
                       </span>
                       <span className="text-gray-500 text-xs">#{prop.id}</span>
                    </div>
                    {prop.status === "Active" && (
                        <div className="flex items-center gap-1 text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md">
                           <Clock size={12}/> Ends in {prop.endsIn}
                        </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{prop.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">{prop.description}</p>

                  {/* Voting Bar */}
                  <div className="space-y-2">
                     <div className="flex justify-between text-xs text-gray-500">
                        <span>For: {calculatePercentage(prop.votesFor, totalVotes)}%</span>
                        <span>Against: {calculatePercentage(prop.votesAgainst, totalVotes)}%</span>
                     </div>
                     <div className="w-full h-2 bg-white/10 rounded-full flex overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: `${calculatePercentage(prop.votesFor, totalVotes)}%` }} />
                        <div className="bg-red-500 h-full" style={{ width: `${calculatePercentage(prop.votesAgainst, totalVotes)}%` }} />
                        <div className="bg-gray-500 h-full" style={{ width: `${calculatePercentage(prop.votesAbstain, totalVotes)}%` }} />
                     </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                     {prop.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400">{tag}</span>
                     ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </main>

        {/* Vote Modal */}
        <AnimatePresence>
           {selectedProposal && (
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                 onClick={closeVoteModal}
              >
                 <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-3xl p-8 relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                 >
                    <button onClick={closeVoteModal} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={24}/></button>
                    
                    {!hasVoted ? (
                       <>
                          <h2 className="text-2xl font-bold mb-2 pr-8">{selectedProposal.title}</h2>
                          <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
                             <span className="bg-white/10 px-2 py-1 rounded text-white">Proposed by {selectedProposal.author}</span>
                             {selectedProposal.status === "Active" && <span className="text-green-500 flex items-center gap-1"><Clock size={14}/> Active</span>}
                          </div>

                          <div className="p-4 bg-white/5 rounded-xl text-gray-300 text-sm mb-8 leading-relaxed">
                             {selectedProposal.description}
                          </div>

                          {selectedProposal.status === "Active" ? (
                             <div className="space-y-4">
                                <h3 className="font-bold text-lg">Cast your Vote</h3>
                                <div className="grid grid-cols-3 gap-4">
                                   <button 
                                      onClick={() => setVoteType("for")}
                                      className={`p-4 rounded-xl border-2 font-bold transition ${voteType === "for" ? "border-green-500 bg-green-500/10 text-green-500" : "border-white/5 bg-white/5 hover:bg-white/10"}`}
                                   >
                                      For
                                   </button>
                                   <button 
                                      onClick={() => setVoteType("against")}
                                      className={`p-4 rounded-xl border-2 font-bold transition ${voteType === "against" ? "border-red-500 bg-red-500/10 text-red-500" : "border-white/5 bg-white/5 hover:bg-white/10"}`}
                                   >
                                      Against
                                   </button>
                                   <button 
                                      onClick={() => setVoteType("abstain")}
                                      className={`p-4 rounded-xl border-2 font-bold transition ${voteType === "abstain" ? "border-gray-500 bg-gray-500/10 text-gray-500" : "border-white/5 bg-white/5 hover:bg-white/10"}`}
                                   >
                                      Abstain
                                   </button>
                                </div>
                                <div className="flex justify-between items-center bg-indigo-500/10 p-4 rounded-xl">
                                   <span className="text-indigo-300 text-sm">Your Voting Power</span>
                                   <span className="font-bold text-indigo-400">{votingPower.toLocaleString()} VP</span>
                                </div>
                                <button 
                                   onClick={handleVote}
                                   disabled={!voteType}
                                   className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 disabled:opacity-50 transition"
                                >
                                   Submit Vote
                                </button>
                             </div>
                          ) : (
                             <div className="p-6 bg-white/5 rounded-xl text-center">
                                <p className="text-gray-400">Voting for this proposal has ended.</p>
                             </div>
                          )}
                       </>
                    ) : (
                       <div className="text-center py-10">
                          <div className="w-20 h-20 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
                             <CheckCircle2 size={40} />
                          </div>
                          <h2 className="text-2xl font-bold mb-2">Vote Submitted</h2>
                          <p className="text-gray-400">
                             You voted <strong>{voteType?.toUpperCase()}</strong> with {votingPower.toLocaleString()} VP.
                          </p>
                       </div>
                    )}
                 </motion.div>
              </motion.div>
           )}
        </AnimatePresence>

      </div>
    </div>
  );
}