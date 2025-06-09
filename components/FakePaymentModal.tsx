import * as React from "react"
import { Dialog, DialogContent, DialogPortal } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CuboidIcon as Cube, Check } from "lucide-react"

interface FakePaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount?: number
  onPaymentSuccess?: () => void
}

export function FakePaymentModal({ open, onOpenChange, amount = 0.1, onPaymentSuccess }: FakePaymentModalProps) {
  const [address, setAddress] = React.useState("")
  const [step, setStep] = React.useState<"input"|"sending"|"sent">("input")

  React.useEffect(() => {
    if (open) {
      setAddress("")
      setStep("input")
    }
  }, [open])

  const handleFakeSend = () => {
    setStep("sending")
    setTimeout(() => {
      setStep("sent")
      setTimeout(() => {
        if (onPaymentSuccess) onPaymentSuccess()
        onOpenChange(false)
      }, 1200)
    }, 1500)
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
              <h2 className="text-2xl font-bold text-white">Send Payment</h2>
              <div className="text-xl font-semibold text-white">Please input your solana address to send payment</div>
            </div>
            {step === "input" && (
              <div className="bg-[#252525] rounded-lg p-4 space-y-4">
                <label className="text-gray-400 text-sm">Your Solana Address</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-[#181818] text-white border border-[#333]"
                  placeholder="Enter your Solana address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
                <Button
                  className="w-full py-4 bg-[#00ff9d] hover:bg-[#00cc7d] text-black font-medium rounded-lg"
                  onClick={handleFakeSend}
                  disabled={!address.trim()}
                >
                  Send Payment
                </Button>
              </div>
            )}
            {step === "sending" && (
              <div className="flex flex-col items-center justify-center py-8">
                <svg className="animate-spin h-8 w-8 text-[#00ff9d] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                <span className="text-white">Sending payment...</span>
              </div>
            )}
            {step === "sent" && (
              <div className="flex flex-col items-center justify-center py-8">
                <Check className="h-8 w-8 text-green-400 mb-4" />
                <span className="text-green-400 font-bold">Payment sent!</span>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
} 