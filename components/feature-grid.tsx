"use client"

import { motion } from "framer-motion"
import { Rocket, Coins, BarChart3, Zap, Flame, Sparkles, TrendingUp, Layers } from "lucide-react"

export function FeatureGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center space-y-2 rounded-lg border border-purple-500/20 bg-gray-900 p-4 transition-all hover:border-purple-500/40 hover:shadow-md hover:shadow-purple-900/10"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="rounded-full bg-purple-900/30 border border-purple-500/20 p-2">{feature.icon}</div>
          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
          <p className="text-sm text-gray-400 text-center">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

const features = [
  {
    title: "Token Creator",
    description: "Launch your own SPL token in under a minute. Custom supply, decimals, metadata — no coding needed.",
    icon: <Rocket className="h-6 w-6 text-purple-400" />,
  },
  {
    title: "Liquidity Adder",
    description: "Easily set up liquidity on Raydium or Meteora so people can buy your token instantly. No pool, no party.",
    icon: <Coins className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Live Chart Integration",
    description: "Instant charting on Dexscreener and Photon. Your token shows up where traders actually look.",
    icon: <BarChart3 className="h-6 w-6 text-pink-400" />,
  },
  {
    title: "Volume Bots",
    description: "Juice your token with smart volume tools to push early stats and catch those algo feeds.",
    icon: <Zap className="h-6 w-6 text-orange-400" />,
  },
  {
    title: "Trending Booster",
    description: "Designed to help your token climb into top 10–20 on Dexscreener, Photon, and even Jup's trending tabs.",
    icon: <TrendingUp className="h-6 w-6 text-green-400" />,
  },
  {
    title: "Hype Tools",
    description: "Add burn buttons, FOMO timers, and event triggers to keep attention and make your chart look spicy.",
    icon: <Flame className="h-6 w-6 text-red-400" />,
  },
  {
    title: "Airdrop Tool",
    description: "Drop tokens to holders, influencers, or full-on randoms. Get wallets watching and talking.",
    icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
  },
  {
    title: "Solana-Only, Zero BS",
    description: "Built specifically for Solana. No bridge spam, no chains you don’t care about. Just pure L1 degen speed.",
    icon: <Layers className="h-6 w-6 text-blue-400" />,
  },
]
