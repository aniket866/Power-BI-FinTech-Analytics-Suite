import React, { ReactNode } from "react"
import { motion } from "framer-motion"

const DURATION = 0.25
const STAGGER = 0.025

interface FlipLinkProps {
  children: ReactNode
  href: string
}

const FlipLink: React.FC<FlipLinkProps> = ({ children, href }) => {
  if (typeof children !== "string") {
    // If children is NOT a string, just render it normally (no split animation)
    return (
      <motion.a
        target="_blank"
        href={href}
        className="relative block whitespace-pre text-2xl font-semibold uppercase dark:text-white/90 sm:text-4xl md:text-4xl"
      >
        {children}
      </motion.a>
    )
  }

  const chars = children.split("").map((c) => (c === " " ? "\u00A0" : c))

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      target="_blank"
      href={href}
      className="relative block overflow-hidden whitespace-pre text-2xl font-semibold uppercase dark:text-white/90 sm:text-4xl md:text-4xl"
      style={{ lineHeight: 1.2 }}
    >
      <div>
        {chars.map((l, i) => (
          <motion.span
            key={`top-${i}`}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {chars.map((l, i) => (
          <motion.span
            key={`bottom-${i}`}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  )
}

export default FlipLink
