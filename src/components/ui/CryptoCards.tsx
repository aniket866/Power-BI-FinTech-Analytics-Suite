"use client";

import Image from "next/image";

const cards = [
  {
    title: "Bitcoin",
    description: "The king of cryptocurrencies, decentralized and scarce.",
    img: "/images/bitcoin.png",
  },
  {
    title: "Ethereum",
    description: "Smart contract platform powering DeFi & NFTs.",
    img: "/images/ethereum.png",
  },
  {
    title: "Binance Coin",
    description: "BNB powers Binance ecosystem & trading.",
    img: "/images/binance.png",
  },
  {
    title: "Solana",
    description: "High-speed blockchain for scalable apps.",
    img: "/images/solana.png",
  },
  {
    title: "Cardano",
    description: "Proof-of-stake blockchain for sustainability.and",
    img: "/images/cardano.png",
  },
  {
    title: "Cardano",
    description: "Proof-of-stake blockchain for sustainability.",
    img: "/images/cardano.png",
  },
];

export default function CryptoCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
          <div className="relative w-full h-32">
            <Image
              src={card.img}
              alt={card.title}
              layout="fill"
              className="object-contain p-4"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
            <p className="text-gray-400 text-sm">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
