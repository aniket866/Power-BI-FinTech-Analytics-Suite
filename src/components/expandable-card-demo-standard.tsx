"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideButton from "../components/ui/slide-button"; 

export type Crypto = {
  label: string;
  balance: number;
  network: string;
};

type TransactionPopoverProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "Send" | "Receive" | "Buy" | "Drop";
};

export default function TransactionPopover({ isOpen, onClose, type }: TransactionPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  const [selectedCrypto, setSelectedCrypto] = useState<Crypto>({
    label: "BTC",
    balance: 1.234,
    network: "BTC Mainnet",
  });
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [txSpeed, setTxSpeed] = useState("Medium");
  const [showDropdown, setShowDropdown] = useState(false);

  const cryptos: Crypto[] = [
    { label: "BTC", balance: 1.234, network: "BTC" },
    { label: "ETH", balance: 5.678, network: "ERC20" },
    { label: "SOL", balance: 20.12, network: "Solana" },
    { label: "USDT", balance: 1000, network: "ERC20" },
  ];

  const handlePercentClick = (percent: number) => {
    const value = ((selectedCrypto.balance * percent) / 100).toFixed(6);
    setAmount(value);
  };

  const handleConfirm = () => {
    alert(
      `${type} ${amount} ${selectedCrypto.label} ${
        type === "Send" || type === "Drop" ? `to ${receiver}` : ""
      }`
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={popoverRef}
            className="relative bg-black text-white rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.6)] max-w-xl w-full p-6 mx-4
                       border-4 border-transparent bg-clip-padding
                       before:absolute before:inset-0 before:rounded-3xl before:p-[3px]
                       before:bg-gradient-to-r before:from-purple-500 before:via-blue-500 before:to-pink-500
                       before:animate-[gradient_3s_linear_infinite] before:-z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">{type} Tokens</h2>

            {/* Cryptocurrency Selection */}
            <div className="mb-4 relative">
              <label className="block text-sm font-semibold mb-1">Select Cryptocurrency</label>
              <div
                className="w-full px-3 py-2 rounded-xl border border-gray-700 bg-gray-900 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {selectedCrypto.label} - {selectedCrypto.network}
              </div>
              <AnimatePresence>
                {showDropdown && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-lg"
                  >
                    {cryptos.map((c) => (
                      <li
                        key={c.label}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                        onClick={() => {
                          setSelectedCrypto(c);
                          setShowDropdown(false);
                        }}
                      >
                        {c.label} ({c.balance}) - {c.network}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {(type === "Send" || type === "Drop") && (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Receiver Address</label>
                <input
                  type="text"
                  placeholder="Wallet address"
                  className="w-full px-3 py-2 rounded-xl border border-gray-700 bg-gray-900"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Amount</label>
              <div className="flex gap-2 mb-1">
                <input
                  type="number"
                  placeholder="0.0"
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-700 bg-gray-900"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {[25, 50, 100].map((p) => (
                  <button
                    key={p}
                    className="px-3 py-1 bg-gray-800 rounded-xl hover:bg-gray-700 text-sm font-semibold"
                    onClick={() => handlePercentClick(p)}
                  >
                    {p}%
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400">
                Balance: {selectedCrypto.balance} {selectedCrypto.label}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Memo / Notes (Optional)</label>
              <input
                type="text"
                placeholder="Memo"
                className="w-full px-3 py-2 rounded-xl border border-gray-700 bg-gray-900"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>

            {/* Slide Button */}
            <div className="mt-6 flex justify-center">
              <SlideButton onClick={handleConfirm} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
