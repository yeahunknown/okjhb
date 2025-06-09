import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function LaunchPad() {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-purple-400">Launch Ur Token To The Moon</h2>
            <p className="text-gray-400">set up a fair launch or presale for ur token to attract degens and whales</p>
          </div>

          <Tabs defaultValue="fair">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fair">Fair Launch</TabsTrigger>
              <TabsTrigger value="presale">Presale</TabsTrigger>
            </TabsList>
            <TabsContent value="fair" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="token-address">Token Address</Label>
                  <Input id="token-address" placeholder="Enter your token address" />
                </div>
                <div>
                  <Label htmlFor="initial-price">Initial Price (SOL)</Label>
                  <Input id="initial-price" placeholder="0.0000001" />
                </div>
                <div>
                  <Label htmlFor="liquidity-percent">Liquidity Percentage</Label>
                  <Input id="liquidity-percent" placeholder="80" />
                </div>
                <div>
                  <Label htmlFor="listing-date">Listing Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Launch Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="max-buy">Max Buy (SOL)</Label>
                      <Input id="max-buy" placeholder="10" />
                    </div>
                    <div>
                      <Label htmlFor="min-buy">Min Buy (SOL)</Label>
                      <Input id="min-buy" placeholder="0.1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="soft-cap">Soft Cap (SOL)</Label>
                    <Input id="soft-cap" placeholder="50" />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold">send it! 🚀</Button>
            </TabsContent>
            <TabsContent value="presale" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="token-address-presale">Token Address</Label>
                  <Input id="token-address-presale" placeholder="Enter your token address" />
                </div>
                <div>
                  <Label htmlFor="presale-rate">Presale Rate (tokens per SOL)</Label>
                  <Input id="presale-rate" placeholder="1000000" />
                </div>
                <div>
                  <Label htmlFor="listing-rate">Listing Rate (tokens per SOL)</Label>
                  <Input id="listing-rate" placeholder="800000" />
                </div>
                <div>
                  <Label htmlFor="presale-start">Presale Start</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Presale Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="soft-cap-presale">Soft Cap (SOL)</Label>
                      <Input id="soft-cap-presale" placeholder="50" />
                    </div>
                    <div>
                      <Label htmlFor="hard-cap">Hard Cap (SOL)</Label>
                      <Input id="hard-cap" placeholder="100" />
                    </div>
                    <div>
                      <Label htmlFor="min-buy-presale">Min Buy (SOL)</Label>
                      <Input id="min-buy-presale" placeholder="0.1" />
                    </div>
                    <div>
                      <Label htmlFor="max-buy-presale">Max Buy (SOL)</Label>
                      <Input id="max-buy-presale" placeholder="5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="presale-end">Presale End</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Pick a date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold">
                launch presale 💰
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
