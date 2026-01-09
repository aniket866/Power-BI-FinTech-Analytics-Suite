"use client";

import { Sidebar, SidebarBody, SidebarLink } from "../../src/components/ui/sidebar";
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
import StakingNav from "../staking/StakingNav";
export default function StakingHowItWorks() {
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
      <div className="flex-1">
        <StakingNav />
        <main className="w-full px-8 py-22 max-w-full">
          <h1 className="text-4xl font-bold mb-8">How Staking Works</h1>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-gray-300 mb-4">
              Staking is a mechanism used in Proof-of-Stake (PoS) blockchains that allows users to lock their tokens
              to secure the network, validate transactions, and participate in consensus. In exchange, participants earn rewards.
            </p>
            <p className="text-gray-300">
              Learn more on <a href="https://ethereum.org/en/staking/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ethereum.org – Staking Overview</a>
              , <a href="https://www.coinbase.com/learn/crypto-basics/what-is-staking" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> Coinbase Learn</a>, and <a href="https://solana.com/staking" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Solana Staking Guide</a>.
            </p>
          </section>

          {/* Step-by-step */}
          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Step-by-Step Process</h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-3">
              <li>
                <strong>Choose a Blockchain:</strong> Select a PoS network like Ethereum 2.0, Solana, Cardano, or Polkadot.
              </li>
              <li>
                <strong>Acquire Tokens:</strong> Buy the blockchain&apos;s native token (e.g., ETH for Ethereum, SOL for Solana).
              </li>
              <li>
                <strong>Select a Staking Method:</strong>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li><strong>Solo Staking:</strong> Run your own validator node. Requires technical knowledge and minimum stake.</li>
                  <li><strong>Pooled Staking:</strong> Join a staking pool to combine tokens with others.</li>
                  <li><strong>Delegated Staking:</strong> Delegate tokens to a trusted validator.</li>
                </ul>
              </li>
              <li>
                <strong>Lock Tokens:</strong> Commit tokens for a specified lock-up period defined by the network.
              </li>
              <li>
                <strong>Earn Rewards:</strong> Receive staking rewards periodically based on your staked amount and network performance.
              </li>
            </ol>
          </section>

          {/* Real-world examples */}
          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Real-World Examples</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <strong>Ethereum 2.0:</strong> Minimum 32 ETH required to become a validator. Validators propose and validate blocks to earn ETH rewards. Misbehavior results in slashing&quot; penalties. 
                More info: <a href="https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ethereum PoS Docs</a>.
              </li>
              <li>
                <strong>Solana:</strong> Delegators stake SOL via validators. Rewards are distributed proportional to staked amounts. Validator performance affects rewards. 
                Guide: <a href="https://solana.com/staking" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Solana Staking</a>.
              </li>
              <li>
                <strong>Cardano:</strong> Stake ADA in stake pools. Rewards are distributed every epoch (~5 days). Delegation is flexible and non-custodial. 
                More: <a href="https://cardano.org/stake-pool" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Cardano Stake Pools</a>.
              </li>
              <li>
                <strong>Polkadot:</strong> Nominators delegate DOT to validators. Rewards depend on validator performance and staking era (~24 hours). 
                Details: <a href="https://polkadot.network/governance/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Polkadot Governance</a>.
              </li>
            </ul>
          </section>

          {/* Benefits & Risks */}
          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Benefits</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Earn passive income through staking rewards.</li>
              <li>Participate in network security and decentralization.</li>
              <li>Environmentally friendly compared to PoW mining.</li>
              <li>Compounding rewards by reinvesting.</li>
            </ul>

            <h2 className="text-3xl font-semibold mt-6 mb-4">Risks</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Tokens may be locked and inaccessible for a period.</li>
              <li>Slashing penalties can reduce staked tokens.</li>
              <li>Market volatility may reduce reward value.</li>
              <li>Validator downtime can affect rewards.</li>
            </ul>
          </section>

          {/* Advanced Topics */}
          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Advanced Topics</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Liquid Staking:</strong> Stake without locking tokens, often using derivative tokens. Example: <a href="https://lido.fi/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Lido</a>.</li>
              <li><strong>Delegated Proof of Stake (DPoS):</strong> Voting system where token holders choose validators. Example: <a href="https://tezos.com/staking/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Tezos</a>.</li>
              <li><strong>Reward Compounding:</strong> Reinvest staking rewards to maximize APY.</li>
              <li><strong>Slashing Mechanics:</strong> Understanding penalties for validator misbehavior.</li>
            </ul>
          </section>

          {/* References */}
          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Further Reading & Resources</h2>
            <ul className="list-disc list-inside text-blue-400 space-y-2">
              <li><a href="https://www.coinbase.com/learn/crypto-basics/what-is-staking" target="_blank" rel="noopener noreferrer" className="hover:underline">Coinbase – Staking Basics</a></li>
              <li><a href="https://academy.binance.com/en/articles/what-is-cryptocurrency-staking" target="_blank" rel="noopener noreferrer" className="hover:underline">Binance Academy – Crypto Staking</a></li>
              <li><a href="https://ethereum.org/en/developers/docs/" target="_blank" rel="noopener noreferrer" className="hover:underline">Ethereum Developers Docs</a></li>
              <li><a href="https://solana.com/developers" target="_blank" rel="noopener noreferrer" className="hover:underline">Solana Developers Docs</a></li>
              <li><a href="https://polkadot.network/governance/" target="_blank" rel="noopener noreferrer" className="hover:underline">Polkadot Governance & Staking</a></li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
