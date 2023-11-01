import getAnalytics from "@/actions/get-analytics";
import { User } from "@prisma/client"
import { InfoCard } from "../dashboard/info-card";
import { ArrowDownRight, ArrowUpRight, Award, Calculator, CandlestickChart, PieChart, Timer, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Summary } from "./summary";
import { TradeStats } from "./trade-stats";
import { getLargestLoss, getLargestPositionSize, getLargestWin, getLongestOpenTrade } from "@/actions/get-notable-trades";

interface UserAnalyticsProps {
    user: User;
};

export const UserAnalytics = async ({ user }: UserAnalyticsProps) => {
    const { 
        depotValue,
        numberOfTrades,
        totalProfit,
        totalLoss,
        averageWin,
        averageLoss,
        winPercentage,
        profitFactor,
        averagePnl,
        averageHoldTime,
    } = await getAnalytics(user.id);

    const largestWin = await getLargestWin(user.id);
    const largestLoss = await getLargestLoss(user.id);
    const largestPositionSize = await getLargestPositionSize(user.id);
    const longestTrade = await getLongestOpenTrade(user.id);

    return (
        <>
            <Summary />
            <div className="w-full grid grid-cols-5 gap-4 mb-4">
                <InfoCard title="Depot Value" value={depotValue} icon={Wallet} secondaryValue={12.2} isCurrency />
                <InfoCard title="Total Trades" value={numberOfTrades} icon={CandlestickChart} secondaryValue={3} isCount />
                <InfoCard title="Total Profit" value={totalProfit} icon={ArrowUpRight} secondaryValue={4356} isCurrency isCount />
                <InfoCard title="Total Loss" value={totalLoss} icon={ArrowDownRight} secondaryValue={249} isCurrency isCount />
                <InfoCard title="Win Percentage" value={winPercentage} icon={Award} secondaryValue={-2.3} isPercentage />
                <InfoCard title="Average PnL" value={averagePnl} icon={PieChart} secondaryValue={234.21} isCurrency isCount />
                <InfoCard title="Average Hold Time" value={averageHoldTime} icon={Timer} secondaryValue={-3} isTime />
                <InfoCard title="Average Win" value={averageWin} icon={TrendingUp} secondaryValue={4032.23} isCurrency isCount />
                <InfoCard title="Average Loss" value={averageLoss} icon={TrendingDown} secondaryValue={840.32} isCurrency isCount />
                <InfoCard title="Profit Factor" value={profitFactor} icon={Calculator} secondaryValue={0.11} isCount />
            </div>
            <TradeStats largestWin={largestWin} largestLoss={largestLoss} largestPositionSize={largestPositionSize} longestTrade={longestTrade} />
        </>
    );
};