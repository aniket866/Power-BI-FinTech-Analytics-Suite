"use client";
import React from "react";
import { motion } from "motion/react";

export default function ColourfulText({ children }: { children: React.ReactNode }) {
  const colors = [
    "rgb(131, 179, 32)",
    "rgb(47, 195, 106)",
    "rgb(42, 169, 210)",
    "rgb(4, 112, 202)",
    "rgb(107, 10, 255)",
    "rgb(183, 0, 218)",
    "rgb(218, 0, 171)",
    "rgb(230, 64, 92)",
    "rgb(232, 98, 63)",
    "rgb(249, 129, 47)",
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColors([...colors].sort(() => Math.random() - 0.5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (typeof children !== "string") return <>{children}</>; // Don't animate non-strings

  return (
    <>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{
            color: currentColors[i % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.01, 1],
            filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}
