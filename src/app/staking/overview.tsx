"use client";

import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  BarChart3,
  BookOpen,
  Layers,
  Unlock,
  Calculator,
  HelpCircle,
  GraduationCap,
  Coins,
} from "lucide-react";
import StakingNav from "./StakingNav";

export default function StakingOverview() {
  const links = [
    { label: "Overview", href: "/staking/overview", icon: <BookOpen size={20} /> },
    { label: "How It Works", href: "/staking/how-it-works", icon: <Layers size={20} /> },
    { label: "Supported Tokens", href: "/staking/tokens", icon: <Coins size={20} /> },
    { label: "Rewards", href: "/staking/rewards", icon: <BarChart3 size={20} /> },
    { label: "Unstaking", href: "/staking/unstaking", icon: <Unlock size={20} /> },
    { label: "Calculator", href: "/staking/calculator", icon: <Calculator size={20} /> },
    { label: "FAQs", href: "/staking/faqs", icon: <HelpCircle size={20} /> },
    { label: "Guides", href: "/staking/guides", icon: <GraduationCap size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Main Content */}
      <div className="flex-1">
        <StakingNav />
        <main className="w-full px-8 py-12 max-w-full">
          <h1 className="text-4xl font-bold mb-8">Staking Overview</h1>

          <section className="mb-10">
            <p className="text-gray-300 mb-4">
              Staking is the process of locking your cryptocurrency in a Proof-of-Stake (PoS) blockchain
              to help secure the network, validate transactions, and participate in consensus mechanisms.
              In return, participants earn rewards in the form of additional tokens. Unlike Proof-of-Work mining, 
              staking is energy-efficient and allows anyone with tokens to participate.
            </p>
            <p className="text-gray-300 mb-4">
              Learn more on <a href="https://ethereum.org/en/staking/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ethereum.org – Staking Overview</a> and 
              <a href="https://www.coinbase.com/learn/crypto-basics/what-is-staking" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> Coinbase Learn</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Key Concepts</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Validators:</strong> Nodes responsible for verifying transactions and creating new blocks.</li>
              <li><strong>Delegators:</strong> Token holders who stake via validators without running a node themselves.</li>
              <li><strong>APY (Annual Percentage Yield):</strong> Rewards earned over a year by staking tokens.</li>
              <li><strong>Lock-up Periods:</strong> Time during which staked tokens cannot be withdrawn.</li>
              <li><strong>Slashing:</strong> Penalties imposed on validators for malicious behavior or downtime.</li>
            </ul>
            <p className="text-gray-300 mt-4">
              For more technical details, refer to <a href="https://academy.binance.com/en/articles/what-is-cryptocurrency-staking" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Binance Academy – Staking Guide</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Why Staking Matters</h2>
            <p className="text-gray-300 mb-4">
              Staking strengthens blockchain security, helps in decentralization, and allows token holders to earn passive income.
              It’s also more environmentally friendly compared to Proof-of-Work mining. Networks like Ethereum 2.0, Solana, Cardano, and Polkadot heavily rely on staking for network security.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Secures the network by incentivizing validator honesty.</li>
              <li>Provides token holders with regular rewards.</li>
              <li>Encourages eco-friendly blockchain participation.</li>
              <li>Promotes long-term holding and compounding rewards.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Benefits of Staking</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Earn passive income through staking rewards.</li>
              <li>Support blockchain decentralization and security.</li>
              <li>Participate in governance on networks like <a href="https://polkadot.network/governance/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Polkadot Governance</a>.</li>
              <li>Opportunity to compound rewards by reinvesting.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Risks of Staking</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Lock-up periods limit liquidity.</li>
              <li>Slashing can result in loss of staked tokens.</li>
              <li>Market volatility may reduce the value of rewards.</li>
              <li>Validator downtime or misbehavior affects rewards.</li>
            </ul>
            <p className="text-gray-300 mt-4">
              More on staking risks: <a href="https://academy.binance.com/en/articles/what-is-staking" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Binance Academy</a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">How Staking Works – Step by Step</h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Choose a PoS blockchain and acquire tokens.</li>
              <li>Select a validator or stake directly if the network allows self-validation.</li>
              <li>Lock your tokens for a staking period.</li>
              <li>Earn rewards periodically (daily, weekly, or monthly).</li>
              <li>Withdraw tokens and rewards after unstaking or lock-up period ends.</li>
            </ol>
            <p className="text-gray-300 mt-4">
              Example tutorials: <a href="https://solana.com/staking" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Solana Staking</a>, <a href="https://cardano.org/stake-pool" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Cardano Stake Pool</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">External References & Learning</h2>
            <ul className="list-disc list-inside text-blue-400 space-y-2">
              <li><a href="https://ethereum.org/en/staking/" target="_blank" rel="noopener noreferrer" className="hover:underline">Ethereum.org – Official Staking Guide</a></li>
              <li><a href="https://academy.binance.com/en/articles/what-is-cryptocurrency-staking" target="_blank" rel="noopener noreferrer" className="hover:underline">Binance Academy – Staking Basics</a></li>
              <li><a href="https://www.coinbase.com/learn/crypto-basics/what-is-staking" target="_blank" rel="noopener noreferrer" className="hover:underline">Coinbase Learn – Staking</a></li>
              <li><a href="https://solana.com/staking" target="_blank" rel="noopener noreferrer" className="hover:underline">Solana Staking</a></li>
              <li><a href="https://polkadot.network/governance/" target="_blank" rel="noopener noreferrer" className="hover:underline">Polkadot Governance & Staking</a></li>
              <li><a href="https://cardano.org/stake-pool" target="_blank" rel="noopener noreferrer" className="hover:underline">Cardano Stake Pools</a></li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Quick Example</h2>
            <p className="text-gray-300 mb-4">
              Staking 100 SOL at 7% APY for one year yields ~7 SOL in rewards, not including compounding or validator fees. For Ethereum 2.0, staking 32 ETH on a validator could earn ~4-6% APY depending on network conditions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Advanced Topics</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Liquid Staking:</strong> Enables staking without locking tokens via derivative tokens. <a href="https://lido.fi/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Learn More</a></li>
              <li><strong>Delegated Proof of Stake (DPoS):</strong> Token holders vote for trusted validators. <a href="https://tezos.com/staking/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Tezos Staking</a></li>
              <li><strong>Slashing Penalties:</strong> Understanding validator penalties and their impact.</li>
              <li><strong>Reward Compounding:</strong> Reinvesting staking rewards to maximize APY.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Conclusion</h2>
            <p className="text-gray-300 mb-4">
              Staking is a powerful tool for both network security and passive income generation. 
              By understanding the benefits, risks, and mechanics, users can make informed decisions and participate actively in the crypto ecosystem.
            </p>
            <p className="text-gray-300">
              For further reading, explore the above links or consult <a href="https://academy.binance.com/en" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Binance Academy</a>, 
              <a href="https://ethereum.org/en/developers/docs/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> Ethereum Developers Docs</a>, and <a href="https://solana.com/developers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Solana Developers Docs</a>.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
