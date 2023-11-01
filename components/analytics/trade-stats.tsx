import { Trade } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { germanCurrency } from "@/lib/utils";

interface TradeStatsProps {
    largestWin: Trade | null;
    largestLoss: Trade | null;
    largestPositionSize: Trade | null;
    longestTrade: Trade | null;
};

export const TradeStats = ({ largestWin, largestLoss, largestPositionSize, longestTrade }: TradeStatsProps) => {
    const largestPositionValue = largestPositionSize?.entryPrice! * largestPositionSize?.quantity!;
    const longestTradeDuration = longestTrade?.closeDate!.getTime()! - longestTrade?.tradeDate!.getTime()!;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">
                    Notable Trades
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">
                                Largest Win
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-xl truncate mb-4">
                                <p>
                                    {largestWin?.symbol}
                                </p>
                                <p>
                                    @ {largestWin?.entryPrice.toLocaleString('de-DE', germanCurrency)}
                                </p>
                                <p>
                                    x {largestWin?.quantity}
                                </p>
                            </div>
                            <p className="text-center text-green-500 font-bold text-3xl">
                                +{largestWin ? largestWin.pnl.toLocaleString('de-DE', germanCurrency) : 0}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">
                                Largest Loss
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-xl truncate mb-4">
                                <p>
                                    {largestLoss?.symbol}
                                </p>
                                <p>
                                    @ {largestLoss?.entryPrice.toLocaleString('de-DE', germanCurrency)}
                                </p>
                                <p>
                                    x {largestLoss?.quantity}
                                </p>
                            </div>
                            <p className="text-center text-red-500 font-bold text-3xl">
                                {largestLoss ? largestLoss.pnl.toLocaleString('de-DE', germanCurrency) : 0}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">
                                Largest Position Size
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-xl truncate mb-4">
                                <p>
                                    {largestPositionSize?.symbol}
                                </p>
                                <p>
                                    @ {largestPositionSize?.entryPrice.toLocaleString('de-DE', germanCurrency)}
                                </p>
                                <p>
                                    x {largestPositionSize?.quantity}
                                </p>
                            </div>
                            <p className="text-center font-bold text-3xl">
                                {largestPositionValue.toLocaleString('de-DE', germanCurrency)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">
                                Longest Open Trade
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-xl truncate mb-4">
                                <p>
                                    {longestTrade?.symbol}
                                </p>
                                <p>
                                    @ {longestTrade?.entryPrice.toLocaleString('de-DE', germanCurrency)}
                                </p>
                                <p>
                                    x {longestTrade?.quantity}
                                </p>
                            </div>
                            <p className="text-center font-bold text-3xl">
                                {(longestTradeDuration / 86400000).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} days
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}