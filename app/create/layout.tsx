import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { WalletConnect } from "@/components/wallet-connect"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-40 w-full border-b border-purple-900/20 bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="!!" width={40} height={40} className="rounded-lg" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                solala.win
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Input
              className="hidden md:flex w-[200px] lg:w-[300px] bg-gray-900 border-purple-900/30 placeholder:text-gray-500"
              placeholder="search 4 tokens or whatever"
            />
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/tools" className="text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors">
                Tools
              </Link>
              <Link
                href="/explore"
                className="text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors"
              >
                Explore
              </Link>
            </nav>
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-purple-900/20 py-6 md:py-0 bg-gray-950">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-500">© 2025 big @loficat ngmi if u copy.</p>
          <div className="flex items-center gap-4">
            <Link href="https://wvl-tos.vercel.app" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
              Terms
            </Link>
            <Link href="https://wvl-tos.vercel.app" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
              Privacy
            </Link>
            <Link href="https://t.me/wavelaunch" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
