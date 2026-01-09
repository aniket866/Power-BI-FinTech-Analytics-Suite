"use client";

import { motion,AnimatePresence } from "framer-motion";
import Image from "next/image";

import React, { useState } from "react";
import { ChevronDown,ArrowLeft ,X} from "lucide-react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Link from "next/link"; // Added Link component

type Step = {
  title: string;
  content: string;
};

const steps: Step[] = [
  {
    title: "Step 1: Connect Your Wallet",
    content: "Connect MetaMask, WalletConnect, or other Web3 wallets to get started.",
  },
  {
    title: "Step 2: Configure Your Token",
    content: "Set your token name, symbol, total supply, decimals, and optional logo.",
  },
  {
    title: "Step 3: Customize Features",
    content: "Enable staking, burnable, mintable, or governance features for your token.",
  },
  {
    title: "Step 4: Deploy to Blockchain",
    content: "Choose a blockchain (Ethereum, Polygon, BSC, etc.) and securely deploy.",
  },
  {
    title: "Step 5: Share and Manage",
    content: "View token details, transfer ownership, add liquidity, or share with your community.",
  },
];

export default function HowToCreate() {
 

  const partners = ["binance", "solana", "coinbase", "metamask"]; 


 
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar using your component */}
    

      {/* Main Content */}
      <div className="flex-1 ml-auto">
        {/* Navbar */}
       <Navbar/>

        <main className="max-w-7xl mx-auto">
          <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/10"
          >
            <X size={16} />
            
          </Link>
        </div>
          {/* Hero Section */}
          <main className="w-full">
            {/* Hero Section */}
            <section className="pt-5 pb-20 grid grid-cols-1 md:grid-cols-2 items-center">
              {/* Left Side Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="flex"
              >
                <div className="relative w-full h-[550px] rounded-2xl shadow-lg pt-5">
                  <Image
                    src="/foxImageLeft.png"
                    alt="NFT Art"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center -100px",
                    }}
                  />
                </div>
              </motion.div>
 <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="px-8 w-full max-w-2xl"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-white tracking-wide uppercase">
        How to Create Your Token
      </h2>
     

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-700 bg-black"
          >
            <button
              onClick={() => toggleStep(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left text-gray-100 font-semibold hover:bg-gray-900 transition-colors duration-300 rounded-xl"
            >
              {step.title}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-gray-300" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                    {step.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
            </section>
          </main>

          {/* Partners Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-10 px-8 flex justify-around items-center bg-black/30 backdrop-blur-lg rounded-xl border border-white/10"
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
