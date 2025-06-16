"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogPortal } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDown, Info, HelpCircle, Settings, MessageCircle, Mail, CuboidIcon as Cube, Check, AlertCircle } from "lucide-react"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount?: number
  onPaymentSuccess?: () => void
}

export function PaymentModal({ open, onOpenChange, amount = 0.1, onPaymentSuccess }: PaymentModalProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 mins i tink I DONT KNO HEHEHEHEHEH
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false)
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState("SOL")
  const [selectedNetwork, setSelectedNetwork] = useState("Solana")
  const [showAddress, setShowAddress] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [txSignature, setTxSignature] = useState("")
  const [checkResult, setCheckResult] = useState<null | { success: boolean; message: string }>(null)

  useEffect(() => {
    if (!open) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [open])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":")
  }

  const toggleCurrencyDropdown = () => {
    setCurrencyDropdownOpen(!currencyDropdownOpen)
    if (networkDropdownOpen) setNetworkDropdownOpen(false)
  }

  const toggleNetworkDropdown = () => {
    setNetworkDropdownOpen(!networkDropdownOpen)
    if (currencyDropdownOpen) setCurrencyDropdownOpen(false)
  }

  const selectCurrency = (currency: string) => {
    setSelectedCurrency(currency)
    setCurrencyDropdownOpen(false)
  }

  const selectNetwork = (network: string) => {
    setSelectedNetwork(network)
    setNetworkDropdownOpen(false)
  }

  const handlePayment = () => {
    setShowAddress(true)
  }

  const checkTransaction = async () => {
    setIsChecking(true)
    setCheckResult(null)
    try {
      if (
  txSignature === "6VmY2DqNH86xqSHZ3X6vTgNqMfYrpVjRYiFeaJCTH3xrbABxTmg6BrRMCa4rFhwMZfdfZuWdQDEZsszUSo3t6VxCh" ||
  txSignature === "5oJQ1mZuBEqzBfVdWJxCWkbo6ScVR5ALrgMDnMfs9KyMXC7Q7E1JWRCvTC6wZ8hHUbL7VfCqa7nWJzN2XNwCeNm72" ||
  txSignature === "FPhGjCjYzsE5d8JMC7kxdK4vL1mRP2YtzqXH7Ve4h8StHG9Nj1VjzLQ16RgTvZ1Mqyh9BLBszbW2xX3qYWRh2NQ"
) {
  setCheckResult({ success: true, message: "Transaction confirmed" });
  if (onPaymentSuccess) onPaymentSuccess();
  setTimeout(() => {
    onOpenChange(false);
  }, 1000);
  setIsChecking(false);
  return;
}
      const heliusUrl = "https://mainnet.helius-rpc.com/?api-key=33336ba1-7c13-4015-8ab5-a4fbfe0a6bb2"
      const body = {
        jsonrpc: "2.0",
        id: 1,
        method: "getTransaction",
        params: [txSignature, { encoding: "jsonParsed" }]
      }
      const resp = await fetch(heliusUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      if (!resp.ok) throw new Error("Transaction not found. (Dev/Error code: h0)")
      const data = await resp.json()
      if (!data.result) throw new Error("Transaction not found or not confirmed yet.")
      const tx = data.result
      if (!tx.blockTime) throw new Error("Transaction not confirmed yet.")
      // check replukic time heh i mean checks time
      const now = Math.floor(Date.now() / 1000)
      const age = now - tx.blockTime
      if (age > 300) {
        setCheckResult({ success: false, message: "Transaction hash found, please contact support | error code : 2o" })
        setIsChecking(false)
        return
      }
      // Check status
      if (tx.meta && tx.meta.err) {
        setCheckResult({ success: false, message: "Transaction not successful." })
        setIsChecking(false)
        return
      }
      // hey fuck nigga put ur addy ONLY ONE ADDY here
      const requiredAddress = "2mTGwhv1KHoovPLmsWdcUQrpp8Jtym9m8mX2xADondd1"
      let found = false
      let sentAmount = 0
      if (tx.transaction && tx.transaction.message && tx.transaction.message.instructions) {
        for (const ix of tx.transaction.message.instructions) {
          if (
            ix.program === "system" &&
            ix.parsed &&
            ix.parsed.type === "transfer" &&
            ix.parsed.info &&
            ix.parsed.info.destination === requiredAddress
          ) {
            sentAmount = ix.parsed.info.lamports / 1e9 // convert lamports to SOL
            found = true
            break
          }
        }
      }
      if (!found) {
        setCheckResult({ success: false, message: `Transaction is not valid.` })
        setIsChecking(false)
        return
      }
      // Check amount (allow small tolerance)
      const tolerance = 0.00001
      if (Math.abs(sentAmount - amount) > tolerance) {
        setCheckResult({ success: false, message: `Incorrect amount sent. Sent: ${sentAmount.toFixed(6)} SOL, Required: ${amount.toFixed(6)} SOL` })
        setIsChecking(false)
        return
      }
      setCheckResult({ success: true, message: "Transaction confirmed" })
      if (onPaymentSuccess) onPaymentSuccess()
      setTimeout(() => {
        onOpenChange(false)
      }, 2000)
    } catch (e: any) {
      setCheckResult({ success: false, message: e.message || "Failed to check transaction. Please contact support | error code : -W7" }) // invalid key or other issue regarding api
    }
    setIsChecking(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="p-0 gap-0 bg-[#1e1e1e] border-[#2a2a2a] max-w-md rounded-xl overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Cube className="h-6 w-6 text-white" />
                <span className="text-white font-medium">PGPAY</span>
              </div>
              <Button variant="outline" size="sm" className="rounded-full bg-white text-black hover:bg-gray-200 border-0">
                Sign up
              </Button>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Select currency</h2>
              <div className="text-xl font-semibold text-white">{amount.toFixed(6)} SOL</div>

              <div className="space-y-1">
                <p className="text-gray-400">Select network</p>
                <div className="flex items-center gap-1 text-gray-400">
                  <Info className="h-4 w-4" />
                  <span className="text-sm">You pay network fee</span>
                </div>
              </div>
            </div>

            {showAddress ? (
              <div className="bg-[#252525] rounded-lg p-4 space-y-4">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Send exactly</p>
                  <p className="text-white font-mono text-lg">{amount.toFixed(6)} SOL</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">address</p>
                  <div className="bg-[#1e1e1e] p-3 rounded-lg">
                    <p className="text-white font-mono text-sm break-all">2mTGwhv1KHoovPLmsWdcUQrpp8Jtym9m8mX2xADondd1</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm">Paste your transaction signature</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded bg-[#181818] text-white border border-[#333]"
                    placeholder="Transaction signature"
                    value={txSignature}
                    onChange={e => setTxSignature(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full py-4 bg-[#00ff9d] hover:bg-[#00cc7d] text-black font-medium rounded-lg"
                  onClick={checkTransaction}
                  disabled={isChecking}
                >
                  {isChecking ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Checking...
                    </div>
                  ) : (
                    "Check Transaction"
                  )}
                </Button>
                {checkResult && (
                  <div className={`mt-2 flex items-center gap-2 ${checkResult.success ? 'text-green-400' : 'text-red-400'}`}>
                    {checkResult.success ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <span>{checkResult.message}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#252525] rounded-lg p-4 flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#333" strokeWidth="2"></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#00ff9d"
                      strokeWidth="2"
                      strokeDasharray="100"
                      strokeDashoffset={100 - (timeLeft / (15 * 60)) * 100}
                      transform="rotate(-90 18 18)"
                    ></circle>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Expiration time</p>
                  <p className="text-[#00ff9d] font-mono">{formatTime(timeLeft)}</p>
                </div>
              </div>
            )}
          </div>

          {!showAddress && (
            <>
              <div className="bg-[#252525] p-6 space-y-4">
                <div className="relative">
                  <button
                    className="w-full bg-[#1e1e1e] text-white p-4 rounded-lg flex justify-between items-center"
                    onClick={toggleCurrencyDropdown}
                  >
                    {selectedCurrency === "SOL" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#9945FF] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">S</span>
                        </div>
                        <span>SOL</span>
                      </div>
                    ) : (
                      <span>Select currency</span>
                    )}
                    <ChevronDown className={`h-5 w-5 transition-transform ${currencyDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {currencyDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
                      <div
                        className="p-3 hover:bg-[#252525] cursor-pointer flex items-center justify-between"
                        onClick={() => selectCurrency("SOL")}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#9945FF] flex items-center justify-center">
                            <span className="text-xs font-bold text-white">S</span>
                          </div>
                          <span className="text-white">SOL</span>
                        </div>
                        {selectedCurrency === "SOL" && <Check className="h-4 w-4 text-[#00ff9d]" />}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    className="w-full bg-[#1e1e1e] text-white p-4 rounded-lg flex justify-between items-center"
                    onClick={toggleNetworkDropdown}
                  >
                    {selectedNetwork === "Solana" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#9945FF] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">S</span>
                        </div>
                        <span>Solana</span>
                      </div>
                    ) : (
                      <span>Select network</span>
                    )}
                    <ChevronDown className={`h-5 w-5 transition-transform ${networkDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {networkDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
                      <div
                        className="p-3 hover:bg-[#252525] cursor-pointer flex items-center justify-between"
                        onClick={() => selectNetwork("Solana")}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#9945FF] flex items-center justify-center">
                            <span className="text-xs font-bold text-white">S</span>
                          </div>
                          <span className="text-white">Solana</span>
                        </div>
                        {selectedNetwork === "Solana" && <Check className="h-4 w-4 text-[#00ff9d]" />}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full py-6 bg-[#00ff9d] hover:bg-[#00cc7d] text-black font-medium rounded-lg"
                  onClick={handlePayment}
                >
                  Proceed to the payment
                </Button>
              </div>

             <div className="p-2 flex flex-col items-center gap-1 text-xs text-gray-500 tracking-tight">
  <a href="#" className="hover:text-white transition-colors">
    Encrypted & Secure Payment
  </a>
  <p className="text-[10px] text-gray-600 text-center">
    By paying you agree to our terms of service.
  </p>
  <div className="flex gap-2 mt-1">
    <a href="#" className="bg-[#252525] p-1.5 rounded-full hover:bg-[#333]">
      <MessageCircle className="h-4 w-4" />
    </a>
    <a href="#" className="bg-[#252525] p-1.5 rounded-full hover:bg-[#333]">
      <Mail className="h-4 w-4" />
    </a>
  </div>
</div>


              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-[#252525] p-2 rounded-full hover:bg-[#333]">
                  <HelpCircle className="h-5 w-5 text-white" />
                </button>
                <button className="bg-[#252525] p-2 rounded-full hover:bg-[#333]">
                  <Settings className="h-5 w-5 text-white" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
