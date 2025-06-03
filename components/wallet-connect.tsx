"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, Skull } from "lucide-react"

export function WalletConnect() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [noWallet, setNoWallet] = useState(false)

  const connectWallet = (provider: string) => {
    // This would be replaced with actual wallet connection logic
    // setWalletAddress("8xH5f...3kNp")
    // setConnected(true)
    // setNoWallet(false)
    window.open("https://t.me/wavelaunch", "_blank")
  }

  const continueWithoutWallet = () => { 
    setNoWallet(true)
    setConnected(false)
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    setConnected(false)
    setNoWallet(false)
  }

  if (noWallet) {
    return (
      <Button
        variant="outline"
        className="flex items-center gap-2 border-purple-500/30"
        onClick={() => setNoWallet(false)}
      >
        <Skull className="h-4 w-4 text-purple-400" />
        <span className="text-purple-400">Degen Mode</span>
      </Button>
    )
  }

  return (
    <>
      {!connected ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold">Contact</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-gray-900 border-purple-500/30">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">Need support?</DialogTitle>
              <DialogDescription className="text-center">We got you covered</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button
                variant="outline"
                className="flex items-center justify-between border-purple-500/30 hover:bg-purple-900/30"
                onClick={() => connectWallet("Our channel")}
              >
                <span>Our channel</span>
                <div className="h-5 w-5 rounded-full bg-purple-900 flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-400">TG</span>
                </div>
              </Button>
             
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Button variant="outline" className="flex items-center gap-2 border-purple-500/30" onClick={disconnectWallet}>
          <Wallet className="h-4 w-4 text-purple-400" />
          <span className="hidden md:inline text-purple-400">{walletAddress}</span>
        </Button>
      )}
    </>
  )
}
