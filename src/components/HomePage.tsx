"use client";

import FlipLink from "./ui/text-effect-flipper";
import ColourfulText from "./ui/colourful-text";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "./Navbar";

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
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
  },
  {
    quote: "Excellent service and support. I couldn't be happier.",
    name: "Bob Smith",
    designation: "Software Engineer",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote: "A game-changer for our team. Efficiency has doubled!",
    name: "Catherine Lee",
    designation: "Team Lead",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote: "The quality and attention to detail are unmatched.",
    name: "David Kim",
    designation: "UX Designer",
    src: "https://images.unsplash.com/photo-1636041293178-808a676cda48?q=80&w=2946&auto=format&fit=crop",
  },
  {
    quote: "I was skeptical at first, but this exceeded all expectations.",
    name: "Emily Davis",
    designation: "Marketing Head",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop",
  },
];

export default function HomePage() {
  const partners = ["binance", "solana", "coinbase", "metamask"];


  return (
    <div className="w-full h-full bg-[#080802] text-white">
      {/* Navbar - Sticky */}
     <Navbar/>

      <main className="mx-auto w-full max-w-7xl px-8 py-10">
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

            <div className="mt-12 flex gap-4">
              <button className="rounded-full border border-white px-6 py-3 transition hover:bg-white hover:text-black">
                Explore More →
              </button>
              <button className="rounded-full bg-white px-6 py-3 text-black transition hover:bg-black hover:text-white">
                Create
              </button>
            </div>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center md:-mt-10"
          >
            <Image
              src="/Fox in coat2.png"
              alt="NFT Art"
              width={550}
              height={300}
              className="rounded-2xl shadow-lg object-cover"
            />
          </motion.div>
        </section>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="my-16 flex flex-wrap justify-around gap-6 rounded-xl border border-white/10 bg-black/30 py-10 backdrop-blur-lg"
        >
          {partners.map((p) => (
            <div key={p} className="text-white font-bold uppercase text-xl">
              {p}
            </div>
          ))}
        </motion.div>

        <AnimatedTestimonials testimonials={TestimonialItems} />
      </main>
    </div>
  );
}