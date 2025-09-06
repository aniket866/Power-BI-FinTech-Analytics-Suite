// components/SpotlightBackground.tsx
import { ReactNode } from "react";

interface SpotlightBackgroundProps {
  children: ReactNode;
}

export default function SpotlightBackground({ children }: SpotlightBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black flex items-center justify-center overflow-hidden">
      {/* Spotlight effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-[#2a2a2a]/40 blur-[150px]" />
      </div>

      {/* Page content */}
      <div className="relative z-10 text-center">
        {children}
      </div>
    </div>
  );
}
