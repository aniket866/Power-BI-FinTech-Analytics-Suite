"use client";

import FlipLink from "./ui/text-effect-flipper";
import ColourfulText from "./ui/colourful-text";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";

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
    src: "/images/alice.jpg",
  },
  {
    quote: "Excellent service and support. I couldn't be happier.",
    name: "Bob Smith",
    designation: "Software Engineer",
    src: "/images/bob.jpg",
  },
  {
    quote: "A game-changer for our team. Efficiency has doubled!",
    name: "Catherine Lee",
    designation: "Team Lead",
    src: "/images/catherine.jpg",
  },
  {
    quote: "The quality and attention to detail are unmatched.",
    name: "David Kim",
    designation: "UX Designer",
    src: "/images/david.jpg",
  },
  {
    quote: "I was skeptical at first, but this exceeded all expectations.",
    name: "Emily Davis",
    designation: "Marketing Head",
    src: "/images/emily.jpg",
  },
];

export default function HomePage() {
  const partners = ["binance", "solana", "coinbase", "metamask"];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <div className="text-xl font-bold">NFT Collection</div>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
              <Search size={18} className="mr-2 text-white" />
              <input
                placeholder="Search Arts and NFT"
                className="bg-transparent text-sm text-white outline-none"
              />
            </div>
            <a className="cursor-pointer hover:text-gray-300">Explore</a>
            <a className="cursor-pointer hover:text-gray-300">About Us</a>
            <button className="rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:bg-gray-200">
              Connect Wallet
            </button>
          </div>
        </div>
      </motion.nav>

      <main className="mx-auto max-w-7xl px-8 pt-32">
        {/* Hero */}
        <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold leading-tight">
              <FlipLink href="#">Discover, Collect</FlipLink>
              <ColourfulText>
                <FlipLink href="#">And Sell Digital Creations</FlipLink>
              </ColourfulText>
            </h1>

            <p className="mt-6 max-w-lg text-gray-400">
              Explore unique, verified digital assets with true ownership and
              scarcity.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-full border border-white px-6 py-3 transition hover:bg-white hover:text-black">
                Explore More →
              </button>
              <button className="rounded-full bg-white px-6 py-3 text-black transition hover:bg-black hover:text-white">
                Create
              </button>
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
              width={500}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </motion.div>
        </section>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="my-16 flex justify-around rounded-xl border border-white/10 bg-black/30 py-10 backdrop-blur-lg"
        >
          {partners.map((p) => (
            <Image
              key={p}
              src={`/${p}.svg`}
              alt={p}
              width={40}
              height={40}
              className="h-10 grayscale transition hover:grayscale-0"
            />
          ))}
        </motion.div>

        <AnimatedTestimonials testimonials={TestimonialItems} />
      </main>
    </div>
  );
}