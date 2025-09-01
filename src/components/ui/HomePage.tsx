"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Homepage() {
  const partners = [
    { name: "Binance", logo: "/binance.svg" },
    { name: "Solana", logo: "/solana.svg" },
    { name: "Coinbase", logo: "/coinbase.svg" },
    { name: "Metamask", logo: "/metamask.svg" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full py-4 px-8 flex justify-between items-center bg-black/60 backdrop-blur-lg fixed top-0 z-50 border-b border-white/10"
      >
        <div className="text-xl font-bold">
          <span className="text-purple-500">NFT</span> Collection
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
            <Search size={18} className="text-white mr-2" />
            <input
              type="text"
              placeholder="Search Arts and NFT"
              className="bg-transparent outline-none text-sm text-white"
            />
          </div>
          <a className="hover:text-purple-400 cursor-pointer">Explore</a>
          <a className="hover:text-purple-400 cursor-pointer">About Us</a>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full font-semibold">
            Connect Wallet
          </button>
        </div>
      </motion.nav>

      <main className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold leading-tight">
              Discover, Collect and Sell your
              <span className="text-purple-500"> Digital Arts</span> and
              <span className="text-purple-500"> NFT</span>
            </h1>
            <p className="text-gray-300 mt-6 max-w-lg">
              Explore unique and one-of-a-kind digital assets, verified by
              blockchain technology for true ownership and scarcity. Join our
              global community of creators and collectors.
            </p>
            <div className="flex space-x-4 mt-8">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full font-semibold shadow-lg shadow-purple-700/40">
                Explore More →
              </button>
              <button className="border border-white/40 px-6 py-3 rounded-full font-semibold hover:bg-white/10">
                Create NFT
              </button>
            </div>
            <div className="flex mt-10 space-x-8">
              <div>
                <p className="text-2xl font-bold">25K+</p>
                <p className="text-gray-400 text-sm">Auctions</p>
              </div>
              <div>
                <p className="text-2xl font-bold">15K+</p>
                <p className="text-gray-400 text-sm">Artists</p>
              </div>
              <div>
                <p className="text-2xl font-bold">10M+</p>
                <p className="text-gray-400 text-sm">Artworks</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <img
              src="/nft-hero.png"
              alt="NFT Art"
              className="rounded-2xl shadow-lg"
            />
          </motion.div>
        </section>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-10 px-8 flex justify-around items-center bg-black/30 backdrop-blur-lg rounded-xl border border-white/10"
        >
          {partners.map((p, idx) => (
            <img
              key={idx}
              src={p.logo}
              alt={p.name}
              className="h-10 grayscale hover:grayscale-0 transition"
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
}
