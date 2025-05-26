"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WalletConnect } from "@/components/wallet-connect"
import { MemeCoins } from "@/components/meme-coins"
import { FeatureGrid } from "@/components/feature-grid"
import { StatsBar } from "@/components/stats-bar"
import { HeroAnimation } from "@/components/hero-animation"
import { GridPattern } from "@/components/grid-pattern"
import { Sparkles, Skull, Moon, Star } from "lucide-react"
import { useState } from "react"
import Big1337 from "@/hooks/toast-dev";


export default function Home() {
  const [isBW, setIsBW] = useState(false)
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
    <>
      <Big1337 /> {/* ✅ Kill switch added here */}
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100 relative">
      <GridPattern />

      <header className="sticky top-0 z-40 w-full border-b border-purple-900/20 bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="!!" width={40} height={40} className="rounded-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              wavelaunch
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Input
              className="hidden md:flex w-[200px] lg:w-[300px] bg-gray-900 border-purple-900/30 placeholder:text-gray-500"
              placeholder="Search page"
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
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-colors"
              title={isBW ? "Switch to normal theme" : "Switch to black & white"}
              aria-label="Toggle black & white theme"
            >
              {isBW ? <Star className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-b border-purple-900/20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-purple-900/30 px-3 py-1 text-sm border border-purple-500/20 animate-fade-in">
                  🔥 Most powerful coin launching platform
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-br from-white to-purple-200 bg-clip-text text-transparent animate-fade-in animation-delay-300">
                  Welcome to the future of token creation
                </h1>
                <p className="max-w-[600px] text-gray-400 md:text-xl animate-fade-in animation-delay-600">
                Take your token beyond Earth.
                Create, launch, and scale it with our powerful suite of tools.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in animation-delay-900">
                  <Link href="/create">
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold group transition-all duration-300 transform hover:translate-y-[-2px]"
                    >
                      Create Token 🚀
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-900/30 transition-all duration-300 transform hover:translate-y-[-2px]"
                  >
                    see tools
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 animate-fade-in animation-delay-1200">
                  <Skull className="h-4 w-4" />
                  <span>Support channel: t.me/voxelaunch</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <HeroAnimation />
              </div>
            </div>
          </div>
        </section>

        <StatsBar />

        <section className="py-12 md:py-24 lg:py-32 bg-gray-950 relative">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-1000"></div>
            <div className="absolute bottom-40 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-900/30 border border-purple-500/20 px-3 py-1 text-sm animate-fade-in">
                  [Premium tools at your disposal]
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent animate-fade-in animation-delay-300">
                  Everything you need to launch your token
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in animation-delay-600">
                  from token creation to liquidity management and marketing tools, we got you covered
                </p>
              </div>
            </div>

            <FeatureGrid />
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-t border-purple-900/20 relative">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 right-40 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent animate-fade-in">
                  Sucessful Coins made by our happy customers
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in animation-delay-300">
                  check out these coins made with our premium tools
                </p>
              </div>
            </div>
            <MemeCoins />
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gray-950 border-t border-purple-900/20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Get Started</h3>
                <ul className="space-y-2">
                  <li>
                    <button className="text-gray-400 hover:text-purple-400 transition-colors">Create Token</button>
                  </li>
                  <li>
                    <Link href="/tools" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/explore" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Explore
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Docs
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blog" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/tutorials" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-gray-400 hover:text-purple-400 transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Community</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Discord
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/wavelaunch" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="https://wvl-tos.vercel.app" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="https://wvl-tos.vercel.app" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="https://wvl-tos.vercel.app" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Cookies
                    </Link>
                  </li>
                  <li>
                    <Link href="https://wvl-tos.vercel.app" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-purple-900/20 py-6 md:py-0 bg-gray-950">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-500">© 2025 loficat. ngmi if u copy.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}
