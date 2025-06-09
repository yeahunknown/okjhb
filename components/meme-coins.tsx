"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, FlameIcon as Fire, Skull } from "lucide-react"

export function MemeCoins() {
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {memeCoins.map((coin, index) => (
        <motion.div key={index} variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <Card className="overflow-hidden bg-gray-900 border-purple-500/20 hover:border-purple-500/40 transition-all">
            <CardContent className="p-0">
              <div className="p-4 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-purple-500/20">
                  <Image src={coin.image || "/placeholder.svg"} alt={coin.name} fill className="object-cover" />
                  {coin.hot && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                      <Fire className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white flex items-center gap-1">
                      {coin.name}
                      {coin.rugged && <Skull className="h-3.5 w-3.5 text-red-400" />}
                    </h3>
                    <Badge
                      variant={coin.change >= 0 ? "default" : "destructive"}
                      className={`flex items-center gap-1 ${coin.change >= 0 ? "bg-green-900 hover:bg-green-900 text-green-400" : "bg-red-900 hover:bg-red-900 text-red-400"}`}
                    >
                      {coin.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {Math.abs(coin.change)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>${coin.symbol}</span>
                    <span>${coin.price.toFixed(8)}</span>
                  </div>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-800">
                <motion.div
                  className={`h-full ${coin.change >= 0 ? "bg-green-500" : "bg-red-500"}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(Math.abs(coin.change) * 2, 100)}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </div>
              <div className="p-4 flex items-center justify-between text-sm text-gray-500">
                <span>Vol: ${coin.volume.toLocaleString()}</span>
                <span>MCap: ${coin.marketCap.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

const memeCoins = [
  {
    name: "Solana Doge",
    symbol: "SOLDOGE",
    image: "/placeholder.svg?height=48&width=48",
    price: 0.00000123,
    change: 24.5,
    volume: 1250000,
    marketCap: 12500000,
    hot: true,
    rugged: false,
  },
  {
    name: "Bonk",
    symbol: "BONK",
    image: "/placeholder.svg?height=48&width=48",
    price: 0.00000045,
    change: 12.3,
    volume: 3450000,
    marketCap: 45000000,
    hot: true,
    rugged: false,
  },
  {
    name: "Solana Cat",
    symbol: "SCAT",
    image: "/placeholder.svg?height=48&width=48",
    price: 0.00000078,
    change: -5.2,
    volume: 890000,
    marketCap: 7800000,
    hot: false,
    rugged: false,
  },
  {
    name: "Moon Rocket",
    symbol: "MOON",
    image: "/placeholder.svg?height=48&width=48",
    price: 0.00000234,
    change: 45.7,
    volume: 5670000,
    marketCap: 23400000,
    hot: true,
    rugged: false,
  },
  {
    name: "Pepe Sol",
    symbol: "PEPE",
    image: "/placeholder.svg?height=48&width=48",
    price: 0.00000056,
    change: -2.8,
    volume: 1230000,
    marketCap: 5600000,
    hot: false,
    rugged: false,
  },
  {
    name: "Rug Pull",
    symbol: "RUG",
    image: "/placeholder.svg?height=48&width=48",
    price: 0.00000001,
    change: -99.9,
    volume: 10000,
    marketCap: 100,
    hot: false,
    rugged: true,
  },
]
