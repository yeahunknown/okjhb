"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

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
  burnable: z.boolean().default(false),
  mintable: z.boolean().default(false),
  taxFee: z.number().min(0).max(10),
})

export function TokenCreatorModal() {
  const [step, setStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [isCreated, setIsCreated] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
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
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsCreating(true)

    // Simulate token creation
    setTimeout(() => {
      setIsCreating(false)
      setIsCreated(true)
    }, 2000)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const resetForm = () => {
    form.reset()
    setStep(1)
    setIsCreated(false)
  }

  // Add this to ensure the form resets when dialog closes
  const handleDialogClose = () => {
    setTimeout(() => {
      resetForm()
    }, 300)
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) handleDialogClose()
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold group transition-all duration-300 transform hover:translate-y-[-2px]"
        >
          Create Token 🚀
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] bg-gray-900 border-purple-500/30">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Create Your Meme Coin
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="p-6">
          <p className="text-white">Token creator will appear here. Click the button below to test closing.</p>
          <div className="mt-8 flex justify-end">
            <DialogClose asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
