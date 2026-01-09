"use client";
import FlipLink from "../../src/components/ui/text-effect-flipper"
import ColourfulText from "../../src/components/ui/colourful-text"


import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "../../src/components/ui/sidebar"; // import your Sidebar

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

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const TestimonialItems: Testimonial[] = [
  {
    quote: "This product completely changed the way I work. Highly recommend!",
    name: "Alice Johnson",
    designation: "Product Manager",
    src: "/images/alice.jpg"
  },
  {
    quote: "Excellent service and support. I couldn't be happier.",
    name: "Bob Smith",
    designation: "Software Engineer",
    src: "/images/bob.jpg"
  },
  {
    quote: "A game-changer for our team. Efficiency has doubled!",
    name: "Catherine Lee",
    designation: "Team Lead",
    src: "/images/catherine.jpg"
  },
  {
    quote: "The quality and attention to detail are unmatched.",
    name: "David Kim",
    designation: "UX Designer",
    src: "/images/david.jpg"
  },
  {
    quote: "I was skeptical at first, but this exceeded all expectations.",
    name: "Emily Davis",
    designation: "Marketing Head",
    src: "/images/emily.jpg"
  }
];


export default function Homepage() {
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

  const partners = ["binance", "solana", "coinbase", "metamask"]; // ✅ define partner logos

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar using your component */}
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
      <div className="flex-1 ml-auto">
        {/* Navbar */}
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full py-4 px-8 flex justify-between items-center bg-black/60 backdrop-blur-lg fixed top-0 z-50 border-b border-white/10"
        >
          <div className="text-xl font-bold">NFT Collection</div>
          <div className="flex items-center space-x-4 mr-15">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Search size={18} className="text-white mr-2" />
              <input
                type="text"
                placeholder="Search Arts and NFT"
                className="bg-transparent outline-none text-sm text-white"
              />
            </div>
            <a className="hover:text-gray-300 cursor-pointer">Explore</a>
            <a className="hover:text-gray-300 cursor-pointer">About Us</a>
            <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
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
               <FlipLink href="https://x.com/guri_who">Discover, Collect</FlipLink>
              <ColourfulText>
        <FlipLink href="https://x.com/guri_who">
          And Sell Digital Creations
        </FlipLink>
      </ColourfulText>

               
              </h1>
              <p className="text-gray-400 mt-6 max-w-lg">
                Explore unique, verified digital assets with true ownership and
                scarcity. Connect with a global community of creators and
                collectors.
              </p>
              <div className="flex space-x-4 mt-8">
                <button className="bg-black text-white px-6 py-3 rounded-full font-semibold border border-white hover:bg-white hover:text-black transition">
                  Explore More →
                </button>
                <button className="bg-white text-black px-6 py-3 rounded-full font-semibold border border-black hover:bg-black hover:text-white transition">
                  Create
                </button>
              </div>

              

              

              <div className="flex mt-10 space-x-8">
                <div>
                  <p className="text-2xl font-bold"></p>
                  <p className="text-gray-400 text-sm">Exclusive Collections</p>
                </div>
                <div>
                  <p className="text-2xl font-bold"></p>
                  <p className="text-gray-400 text-sm">Renowned Creators</p>
                </div>
                <div>
                  <p className="text-2xl font-bold"></p>
                  <p className="text-gray-400 text-sm">Curated Artworks</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
                  <Image
        src="/Fox in coat.png"
        alt="NFT Art"
        className="rounded-2xl shadow-lg mt-[-10]"

        width={500}
        height={400} 
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
            
            <AnimatedTestimonials testimonials={TestimonialItems}/>



        </main>
      </div>
    </div>
  );
}
