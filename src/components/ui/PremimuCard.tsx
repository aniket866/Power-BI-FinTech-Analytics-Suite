"use client";
import { motion } from "framer-motion";

type PremiumCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function PremiumCard({ title, description, image }: PremiumCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg shadow-lg hover:shadow-xl hover:shadow-white/20 transition-all duration-500 w-72 h-80 flex flex-col"
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-end p-5">
        <h3 className="text-xl font-semibold text-white drop-shadow-md">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-200/90">{description}</p>
      </div>

      {/* Glossy highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl pointer-events-none"></div>
    </motion.div>
  );
}
