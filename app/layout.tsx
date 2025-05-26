import Head from "next/head"
import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "WaveLaunch",
  description:
    "The best site to create solana SPL tokens with no code whatsoever and cheap! this platform gets your token on the top dexscreener / photon. with a 1K USD Warranty.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
<Head>
        <meta name="trustpilot-one-time-domain-verification-id" content="8240dd3f-703a-4d69-bd42-b5d1b6e43c4a" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
