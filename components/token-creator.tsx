"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, AlertCircle, Check, ChevronRight, ChevronLeft, Sparkles, Flame, Coins, Copy, Moon, Star } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TokenPreview } from "@/components/token-preview"
import { PaymentModal } from "@/components/payment-modal"
import { randomSolanaAddress } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  symbol: z.string().min(2, {
    message: "Symbol must be at least 2 characters.",
  }),
  supply: z.string().min(1, {
    message: "Supply is required.",
  }),
  decimals: z.number().min(0).max(9),
  description: z.string().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
  burnable: z.boolean(),
  mintable: z.boolean(),
  taxFee: z.number().min(0).max(10),
  noRevokeFreeze: z.boolean(),
  noRevokeMint: z.boolean(),
  noRevokeMetadata: z.boolean(),
})

type FormValues = {
  name: string
  symbol: string
  supply: string
  decimals: number
  description?: string
  website?: string
  twitter?: string
  telegram?: string
  burnable: boolean
  mintable: boolean
  taxFee: number
  noRevokeFreeze: boolean
  noRevokeMint: boolean
  noRevokeMetadata: boolean
}

export function TokenCreator() {
  const [step, setStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [tokenAddress, setTokenAddress] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [isBW, setIsBW] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      supply: "1000000000",
      decimals: 9,
      description: "",
      website: "",
      twitter: "",
      telegram: "",
      burnable: false,
      mintable: false,
      taxFee: 0,
      noRevokeFreeze: false,
      noRevokeMint: false,
      noRevokeMetadata: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('onSubmit called', values)
    setShowPaymentModal(true)
  }

  const handlePaymentComplete = () => {
    setShowPaymentModal(false)
    setIsCreating(true)

    // Simulate token creation
    setTimeout(() => {
      setIsCreating(false)
      setIsCreated(true)
      // Generate random address
      setTokenAddress(randomSolanaAddress())
    }, 2000)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  // Theme toggle handler
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
            {isCreated ? (
              <motion.div
                className="flex flex-col items-center justify-center py-10 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold text-green-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Token Created!
                </motion.h2>
                <motion.p
                  className="text-gray-400 text-center max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Your meme coin is now on solana! time to add liquidity and make it moon!
                </motion.p>
                <motion.div
                  className="bg-gray-800 p-6 rounded-lg w-full max-w-md border border-purple-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex justify-between mb-4 items-center">
                    <span className="text-gray-400">Token Address:</span>
                    <span className="font-mono text-purple-400 flex items-center gap-2">
                      {tokenAddress ? tokenAddress.slice(0, 4) + "..." + tokenAddress.slice(-4) : "-"}
                      <button
                        onClick={() => {
                          if (tokenAddress) {
                            navigator.clipboard.writeText(tokenAddress)
                            setCopied(true)
                            setTimeout(() => setCopied(false), 1200)
                          }
                        }}
                        className="ml-1 p-1 rounded hover:bg-purple-900/40"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4 text-purple-300" />
                      </button>
                      {copied && <span className="text-xs text-green-400 ml-1">Copied!</span>}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{form.getValues().name}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Symbol:</span>
                    <span className="text-white">{form.getValues().symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Supply:</span>
                    <span className="text-white">{Number(form.getValues().supply).toLocaleString()}</span>
                  </div>
                </motion.div>
                <div className="flex gap-4 mt-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button variant="outline" className="border-purple-500/20 text-purple-400 hover:bg-purple-900/30">
                      Add Liquidity
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button
                      onClick={() => {
                        setIsCreated(false)
                        setStep(1)
                        form.reset()
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Create Another Token
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {step === 1 ? "Basic Info" : step === 2 ? "Details" : "Advanced Settings"}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-purple-500" : "bg-gray-700"}`}></div>
                      <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-purple-500" : "bg-gray-700"}`}></div>
                      <div className={`w-3 h-3 rounded-full ${step >= 3 ? "bg-purple-500" : "bg-gray-700"}`}></div>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                      initial={{ width: `${(step - 1) * 33.33}%` }}
                      animate={{ width: `${step * 33.33}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Token Name (something catchy)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Solana COIN"
                                      {...field}
                                      className="bg-gray-800 border-purple-500/20 focus:border-purple-500 transition-colors"
                                    />
                                  </FormControl>
                                  <FormDescription>The name of your meme coin.</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="symbol"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Token Symbol (like $DEGEN)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="zzz"
                                      {...field}
                                      className="bg-gray-800 border-purple-500/20 focus:border-purple-500 transition-colors"
                                    />
                                  </FormControl>
                                  <FormDescription>The ticker symbol for your token.</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="supply"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Total Supply (big number = moon)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="1000000000"
                                      {...field}
                                      className="bg-gray-800 border-purple-500/20 focus:border-purple-500 transition-colors"
                                    />
                                  </FormControl>
                                  <FormDescription>The total number of tokens to create.</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="decimals"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Decimals: {field.value}</FormLabel>
                                  <FormControl>
                                    <Slider
                                      min={0}
                                      max={9}
                                      step={1}
                                      defaultValue={[field.value]}
                                      onValueChange={(value) => field.onChange(value[0])}
                                      className="py-4"
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Number of decimal places (9 is standard for Solana).
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex flex-col items-center justify-center">
                            <TokenPreview form={form} />
                          </div>

                          <div className="flex justify-between col-span-1 md:col-span-2">
                            <div></div> {/* Empty div to maintain flex spacing */}
                            <Button
                              type="button"
                              onClick={nextStep}
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              Next <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="grid grid-cols-1 gap-6">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Tell us about your meme coin..."
                                      className="resize-none bg-gray-800 border-purple-500/20 focus:border-purple-500 min-h-[120px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>A brief description of your token.</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">Website (Optional)</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="https://yourwebsite.com"
                                        {...field}
                                        className="bg-gray-800 border-purple-500/20 focus:border-purple-500"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="twitter"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">Twitter (Optional)</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="@yourtwitter"
                                        {...field}
                                        className="bg-gray-800 border-purple-500/20 focus:border-purple-500"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="telegram"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">Telegram (Optional)</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="t.me/yourgroup"
                                        {...field}
                                        className="bg-gray-800 border-purple-500/20 focus:border-purple-500"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="border border-purple-500/20 rounded-lg p-6 bg-gray-800/50">
                              <h3 className="font-medium mb-4 text-white flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-purple-400" /> Token Logo
                              </h3>
                              <div className="flex items-center justify-center border-2 border-dashed border-purple-500/20 rounded-lg p-6">
                                <div className="flex flex-col items-center gap-2">
                                  <Upload className="h-8 w-8 text-purple-400" />
                                  <p className="text-sm text-gray-400">Click to upload</p>
                                  <p className="text-xs text-gray-500">PNG, JPG or SVG (max. 2MB)</p>
                                  <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/svg+xml"
                                    className="hidden"
                                    id="logo-upload"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        // Handle file upload
                                        console.log('File selected:', file)
                                      }
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 border-purple-500/20 text-purple-400 hover:bg-purple-900/30"
                                    onClick={() => document.getElementById('logo-upload')?.click()}
                                  >
                                    Select File
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-8">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={prevStep}
                              className="border-purple-500/20 text-purple-400 hover:bg-purple-900/30"
                            >
                              <ChevronLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            <Button
                              type="button"
                              onClick={nextStep}
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              Next <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Alert className="bg-purple-900/20 border-purple-500/30 text-purple-200 mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Advanced Settings</AlertTitle>
                            <AlertDescription className="text-purple-300/80">
                              These settings are optional and can affect how your token functions.
                            </AlertDescription>
                          </Alert>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="burnable"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-purple-500/20 bg-gray-800/50 p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base text-white">Burnable</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Allow tokens to be burned (permanently removed from circulation).
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="mintable"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-purple-500/20 bg-gray-800/50 p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base text-white">Mintable</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Allow additional tokens to be minted in the future.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="taxFee"
                              render={({ field }) => (
                                <FormItem className="col-span-1 md:col-span-2 border border-purple-500/20 bg-gray-800/50 p-4 rounded-lg">
                                  <FormLabel className="text-white flex items-center gap-2">
                                    <Flame className="h-4 w-4 text-orange-400" /> Transaction Tax: {field.value}%
                                  </FormLabel>
                                  <FormControl>
                                    <Slider
                                      min={0}
                                      max={10}
                                      step={0.1}
                                      defaultValue={[field.value]}
                                      onValueChange={(value) => field.onChange(value[0])}
                                      className="py-4"
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Set a tax fee on each transaction (0-10%). This can be used for redistribution,
                                    liquidity, or marketing.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="noRevokeFreeze"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-purple-500/20 bg-gray-800/50 p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base text-white">No Revoke Freeze</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Keep freeze authority forever (+0.1 SOL)
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="noRevokeMint"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-purple-500/20 bg-gray-800/50 p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base text-white">No Revoke Mint</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Keep mint authority forever (+0.1 SOL)
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="noRevokeMetadata"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-purple-500/20 bg-gray-800/50 p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base text-white">No Revoke Metadata</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Keep metadata authority forever (+0.1 SOL)
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="border border-purple-500/20 rounded-lg p-6 mt-6 bg-gray-800/50">
                            <h3 className="font-medium mb-4 text-white flex items-center gap-2">
                              <Coins className="h-5 w-5 text-cyan-400" /> Cost Summary
                            </h3>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Token Creation</span>
                                <span className="text-white font-medium">0.1 SOL</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Network Fee</span>
                                <span className="text-white font-medium">~0.000005 SOL</span>
                              </div>
                              {form.watch("noRevokeFreeze") && (
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-400">No Revoke Freeze</span>
                                  <span className="text-white font-medium">+0.1 SOL</span>
                                </div>
                              )}
                              {form.watch("noRevokeMint") && (
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-400">No Revoke Mint</span>
                                  <span className="text-white font-medium">+0.1 SOL</span>
                                </div>
                              )}
                              {form.watch("noRevokeMetadata") && (
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-400">No Revoke Metadata</span>
                                  <span className="text-white font-medium">+0.1 SOL</span>
                                </div>
                              )}
                              <div className="border-t border-purple-500/10 pt-3 mt-3 flex justify-between items-center">
                                <span className="text-white font-medium">Total</span>
                                <span className="text-white font-bold">
                                  {(0.100005 + 
                                    (form.watch("noRevokeFreeze") ? 0.1 : 0) +
                                    (form.watch("noRevokeMint") ? 0.1 : 0) +
                                    (form.watch("noRevokeMetadata") ? 0.1 : 0)
                                  ).toFixed(6)} SOL
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between mt-8">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={prevStep}
                              className="border-purple-500/20 text-purple-400 hover:bg-purple-900/30"
                            >
                              <ChevronLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            <Button
                              type="submit"
                              disabled={isCreating}
                              className="bg-purple-600 hover:bg-purple-700 text-white font-bold group relative overflow-hidden"
                            >
                              <span className="relative z-10 flex items-center">
                                {isCreating ? (
                                  <>
                                    <svg
                                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                                    Loading Metadata...
                                  </>
                                ) : (
                                  <>Create Token</>
                                )}
                              </span>
                              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </Form>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <PaymentModal
        open={showPaymentModal}
        onOpenChange={(open) => {
          setShowPaymentModal(open)
        }}
        amount={0.100005 + 
          (form.watch("noRevokeFreeze") ? 0.1 : 0) +
          (form.watch("noRevokeMint") ? 0.1 : 0) +
          (form.watch("noRevokeMetadata") ? 0.1 : 0)
        }
        onPaymentSuccess={handlePaymentComplete}
      />
    </div>
  )
}
