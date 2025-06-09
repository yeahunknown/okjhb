"use client"

import { motion } from "framer-motion"
import type { UseFormReturn } from "react-hook-form"

export function TokenPreview({ form }: { form: UseFormReturn<any> }) {
  const values = form.watch()

  return (
    <div className="w-full max-w-[300px]">
      <h3 className="text-center text-gray-400 mb-4">Token Preview</h3>
      <motion.div
        className="border border-purple-500/20 rounded-xl p-6 bg-gray-800/50 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-purple-500/40 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-2xl">🚀</span>
          </motion.div>
          <div>
            <motion.h3
              className="font-bold text-white text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {values.name || "Your Token"}
            </motion.h3>
            <motion.div
              className="text-sm text-purple-400 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              ${values.symbol || "TOKEN"}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Supply:</span>
            <span className="text-white font-medium">{Number(values.supply || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Decimals:</span>
            <span className="text-white font-medium">{values.decimals}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Network:</span>
            <span className="text-white font-medium">Solana</span>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 pt-4 border-t border-purple-500/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <div className="flex justify-center">
            <div className="px-4 py-1 bg-purple-500/20 rounded-full text-purple-400 text-xs font-medium">
              Ready to launch 🚀
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
