import React from 'react'
import { connectToWallet, formatAddress } from "@/lib/Wallet";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";


const Navbar = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        if (isConnecting) return;
        setIsConnecting(true);

        try {
            const address = await connectToWallet();
            if (address) {
                setWalletAddress(address);
            }
        } catch (err) {
            console.error("Connection error:", err);
        } finally {
            setIsConnecting(false);
        }
    };
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur-lg"
        >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-4">
                <div className="text-xl font-bold">NFT Collection</div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center rounded-full bg-white/10 px-4 py-2">
                        <Search size={18} className="mr-2 text-white" />
                        <input
                            placeholder="Search Arts and NFT"
                            className="bg-transparent text-sm text-white outline-none w-32 md:w-48"
                        />
                    </div>
                    <a className="cursor-pointer hover:text-gray-300 text-sm md:text-base">
                        Explore
                    </a>
                    <a className="cursor-pointer hover:text-gray-300 text-sm md:text-base">
                        About Us
                    </a>

                    <button
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isConnecting
                            ? "Connecting..."
                            : walletAddress
                                ? formatAddress(walletAddress)
                                : "Connect Wallet"}
                    </button>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar
