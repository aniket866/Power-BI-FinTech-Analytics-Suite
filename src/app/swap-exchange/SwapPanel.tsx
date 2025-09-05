"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";

type Token = {
  symbol: string;
  name: string;
  price: number;
  balance: number; // Added user balance
};

const tokens: Token[] = [
  { symbol: "BTC", name: "Bitcoin", price: 56789.45, balance: 0.5 },
  { symbol: "ETH", name: "Ethereum", price: 3456.78, balance: 5.2 },
  { symbol: "USDC", name: "USD Coin", price: 1.0, balance: 2000 },
  { symbol: "BNB", name: "BNB", price: 412.32, balance: 10 },
  { symbol: "SOL", name: "Solana", price: 195.32, balance: 50 },
  { symbol: "XRP", name: "XRP", price: 0.65, balance: 1000 },
  { symbol: "ADA", name: "Cardano", price: 0.38, balance: 3000 },
  { symbol: "DOGE", name: "Dogecoin", price: 0.08, balance: 5000 },
  { symbol: "MATIC", name: "Polygon", price: 0.74, balance: 1200 },
  { symbol: "AVAX", name: "Avalanche", price: 32.45, balance: 100 },
  { symbol: "TON", name: "Toncoin", price: 7.23, balance: 150 },
];

export default function SwapPanel() {
  const [fromToken, setFromToken] = useState<Token>(tokens[1]);
  const [toToken, setToToken] = useState<Token>(tokens[2]);
  const [amount, setAmount] = useState<number>(0);
  const [dropdown, setDropdown] = useState<"from" | "to" | null>(null);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const platformFeePercent = 0.1;
  const gasFee = 2;

  const outputAmount = useMemo(() => {
    if (!amount) return 0;
    const usdValue = amount * fromToken.price;
    return usdValue / toToken.price;
  }, [amount, fromToken, toToken]);

  const platformFee = useMemo(() => (outputAmount * platformFeePercent) / 100, [
    outputAmount,
  ]);

  const totalAfterFees = useMemo(
    () => outputAmount - platformFee - gasFee,
    [outputAmount, platformFee, gasFee]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !fromRef.current?.contains(event.target as Node) &&
        !toRef.current?.contains(event.target as Node)
      ) {
        setDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-100px)] bg-black text-white">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-lg w-full max-w-5xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Swap / Exchange</h2>

        {/* Swap UI */}
        <div className="flex justify-between items-center mb-6 relative">
          {/* From */}
          <div ref={fromRef} className="relative w-[45%]">
            <TokenCard
              title="From"
              token={fromToken}
              onClick={() => setDropdown(dropdown === "from" ? null : "from")}
              amount={amount}
              setAmount={setAmount}
              showMax
            />
            {dropdown === "from" && (
              <Dropdown
                onSelect={(t) => {
                  setFromToken(t);
                  setDropdown(null);
                }}
              />
            )}
          </div>

          <button
            onClick={() => {
              const temp = fromToken;
              setFromToken(toToken);
              setToToken(temp);
            }}
            className="bg-neutral-800 border border-neutral-600 text-white p-3 rounded-full mx-4"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          {/* To */}
          <div ref={toRef} className="relative w-[45%]">
            <TokenCard
              title="To"
              token={toToken}
              onClick={() => setDropdown(dropdown === "to" ? null : "to")}
            />
            {dropdown === "to" && (
              <Dropdown
                onSelect={(t) => {
                  setToToken(t);
                  setDropdown(null);
                }}
              />
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 space-y-[1.5] text-sm mt-4">
          <DetailRow label="Input Amount" value={`${amount || 0} ${fromToken.symbol}`} />
          <DetailRow label="Estimated Output" value={`${outputAmount.toFixed(4)} ${toToken.symbol}`} />
          <DetailRow label="Exchange Rate" value={`1 ${fromToken.symbol} ≈ ${(fromToken.price / toToken.price).toFixed(2)} ${toToken.symbol}`} />
          <DetailRow label="Platform Fee" value={`${platformFee.toFixed(2)} ${toToken.symbol}`} />
          <DetailRow label="Gas Fee" value={`${gasFee} ${toToken.symbol}`} />
          <DetailRow label="Final Amount" value={`${totalAfterFees.toFixed(4)} ${toToken.symbol}`} />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => {
              setAmount(0);
              setFromToken(tokens[1]);
              setToToken(tokens[2]);
            }}
            className="px-6 py-2 border border-neutral-600 rounded-lg hover:bg-neutral-700 transition"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
            Confirm Swap
          </button>
        </div>
      </div>
    </div>
  );
}

function TokenCard({
  title,
  token,
  amount,
  setAmount,
  onClick,
  showMax,
}: {
  title: string;
  token: Token;
  amount?: number;
  setAmount?: (val: number) => void;
  onClick: () => void;
  showMax?: boolean;
}) {
  return (
    <div className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm text-gray-400">{title}</h3>
        {showMax && setAmount && (
          <button
            onClick={() => setAmount(token.balance)}
            className="text-xs text-blue-400 hover:underline"
          >
            MAX
          </button>
        )}
      </div>
      <div
        onClick={onClick}
        className="w-full flex justify-between items-center bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 mb-3 cursor-pointer"
      >
        <span>{token.symbol}</span>
        <ChevronDown />
      </div>
      {setAmount && (
        <input
          type="number"
          placeholder="0.0"
          value={amount || ""}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white"
        />
      )}
      {showMax && (
        <p className="text-xs text-gray-400 mt-1">Balance: {token.balance} {token.symbol}</p>
      )}
    </div>
  );
}

function Dropdown({ onSelect }: { onSelect: (t: Token) => void }) {
  return (
    <div className="absolute top-full left-0 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg w-full max-h-80 overflow-auto z-50">
      {tokens.map((t) => (
        <div
          key={t.symbol}
          onClick={() => onSelect(t)}
          className="flex justify-between px-4 py-2 hover:bg-neutral-700 cursor-pointer"
        >
          <span>
            {t.name} ({t.symbol})
          </span>
          <span className="text-green-400">${t.price.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
