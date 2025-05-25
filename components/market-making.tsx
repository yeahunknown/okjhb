import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function MarketMaking() {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-purple-400">Market Making Degens</h2>
            <p className="text-gray-400">set up bots to pump ur chart and make it look bullish af</p>
          </div>

          <Tabs defaultValue="market-maker">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="market-maker">Market Maker</TabsTrigger>
              <TabsTrigger value="volume-bot">Volume Bot</TabsTrigger>
            </TabsList>
            <TabsContent value="market-maker" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="token-address-mm">Token Address</Label>
                  <Input id="token-address-mm" placeholder="Enter your token address" />
                </div>
                <div>
                  <Label htmlFor="pool-address">Pool Address</Label>
                  <Input id="pool-address" placeholder="Enter liquidity pool address" />
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Market Maker Settings</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Price Stability: 60%</Label>
                      <span className="text-sm text-muted-foreground">0% - 100%</span>
                    </div>
                    <Slider defaultValue={[60]} max={100} step={1} />
                    <p className="text-sm text-muted-foreground mt-1">
                      Higher values prioritize price stability over volume.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Buy Pressure: 55%</Label>
                      <span className="text-sm text-muted-foreground">0% - 100%</span>
                    </div>
                    <Slider defaultValue={[55]} max={100} step={1} />
                    <p className="text-sm text-muted-foreground mt-1">
                      Higher values increase buy pressure relative to sells.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="max-daily-volume">Max Daily Volume (SOL)</Label>
                      <Input id="max-daily-volume" placeholder="5" />
                    </div>
                    <div>
                      <Label htmlFor="max-price-impact">Max Price Impact (%)</Label>
                      <Input id="max-price-impact" placeholder="2" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-adjust Parameters</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically adjust parameters based on market conditions.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Cost</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Setup Fee</span>
                    <span>0.5 SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Fee</span>
                    <span>0.05 SOL</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                    <span>Initial Payment</span>
                    <span>0.5 SOL</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold">
                activate pump mode 📈
              </Button>
            </TabsContent>
            <TabsContent value="volume-bot" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="token-address-vb">Token Address</Label>
                  <Input id="token-address-vb" placeholder="Enter your token address" />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    Volume Strategy
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Different strategies optimize for different goals.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Volume Bot Settings</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="target-daily-volume">Target Daily Volume (SOL)</Label>
                      <Input id="target-daily-volume" placeholder="10" />
                    </div>
                    <div>
                      <Label htmlFor="trade-frequency">Trade Frequency (per hour)</Label>
                      <Select>
                        <SelectTrigger id="trade-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (1-5)</SelectItem>
                          <SelectItem value="medium">Medium (5-15)</SelectItem>
                          <SelectItem value="high">High (15-30)</SelectItem>
                          <SelectItem value="very-high">Very High (30+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Trade Size Variability: 40%</Label>
                      <span className="text-sm text-muted-foreground">0% - 100%</span>
                    </div>
                    <Slider defaultValue={[40]} max={100} step={1} />
                    <p className="text-sm text-muted-foreground mt-1">Higher values create more random trade sizes.</p>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Randomize Wallet Addresses</Label>
                      <p className="text-sm text-muted-foreground">
                        Use multiple wallets to make trading patterns look more natural.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Price Impact Protection</Label>
                      <p className="text-sm text-muted-foreground">
                        Prevent trades that would cause significant price impact.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Cost</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Setup Fee</span>
                    <span>0.8 SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Fee</span>
                    <span>0.08 SOL</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                    <span>Initial Payment</span>
                    <span>0.8 SOL</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold">
                start the money printer 🖨️
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
