"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenCreator } from "@/components/token-creator"
import { LaunchPad } from "@/components/launch-pad"
import { LiquidityAdder } from "@/components/liquidity-adder"
import { MarketMaking } from "@/components/market-making"
import { GridPattern } from "@/components/grid-pattern"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"


export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative">
      <GridPattern />

      <div className="container py-10 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Create Your Meme Coin
          </h1>
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <Tabs defaultValue="token" className="w-full relative z-10">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/80 backdrop-blur-sm border border-purple-500/20 mb-6">
              <TabsTrigger value="token" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Token Creator
              </TabsTrigger>
              <TabsTrigger value="launch" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Launch Pad
              </TabsTrigger>
              <TabsTrigger
                value="liquidity"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Liquidity
              </TabsTrigger>
              <TabsTrigger value="market" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Market Making
              </TabsTrigger>
            </TabsList>
            <TabsContent value="token">
              <TokenCreator />
            </TabsContent>
            <TabsContent value="launch">
              <LaunchPad />
            </TabsContent>
            <TabsContent value="liquidity">
              <LiquidityAdder />
            </TabsContent>
            <TabsContent value="market">
              <MarketMaking />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
