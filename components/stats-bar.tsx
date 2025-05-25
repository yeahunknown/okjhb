"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Coins, Users, BarChart3, Rocket } from "lucide-react"

export function StatsBar() {
  return (
    <div className="w-full py-6 bg-gray-900 border-y border-purple-900/20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat
            icon={<Coins className="h-5 w-5 text-purple-400" />}
            value="48,300"
            label="Total Tokens Created"
            delay={0}
          />
          <Stat icon={<Users className="h-5 w-5 text-cyan-400" />} value="12,750" label="Active Users" delay={0.1} />
          <Stat icon={<BarChart3 className="h-5 w-5 text-pink-400" />} value="$27.4M" label="Total Volume" delay={0.2} />
          <Stat
            icon={<Rocket className="h-5 w-5 text-orange-400" />}
            value="7,000"
            label="Tokens Mooning"
            delay={0.3}
          />
        </div>
      </div>
    </div>
  )
}

function Stat({ icon, value, label, delay }: { icon: React.ReactNode; value: string; label: string; delay: number }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <motion.span
          className="text-xl md:text-2xl font-bold text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          viewport={{ once: true }}
        >
          {value}
        </motion.span>
      </div>
      <span className="text-xs md:text-sm text-gray-400">{label}</span>
    </motion.div>
  )
}
