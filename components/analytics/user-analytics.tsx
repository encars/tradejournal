import getAnalytics from "@/actions/get-analytics";
import { User } from "@prisma/client"
import { InfoCard } from "../dashboard/info-card";
import { CandlestickChart, DollarSign, PieChart, Timer, TrendingUp } from "lucide-react";
import { Summary } from "./summary";

interface UserAnalyticsProps {
    user: User;
};

export const UserAnalytics = async ({ user }: UserAnalyticsProps) => {
    const { 
        depotValue,
        numberOfTrades,
        averageWin,
        averageLoss,
        winPercentage,
        profitFactor,
        averagePnl,
        averageHoldTime,
    } = await getAnalytics(user.id);

    return (
        <>
            <Summary />
            <div className="grid grid-cols-5 gap-4">
                <InfoCard title="Depot Value" value={depotValue} icon={DollarSign} secondaryValue={12.2} isCurrency />
                <InfoCard title="Total Trades" value={numberOfTrades} icon={CandlestickChart} secondaryValue={3} isCount />
                <InfoCard title="Win Percentage" value={winPercentage} icon={PieChart} secondaryValue={-2.3} isPercentage />
                <InfoCard title="Average PnL" value={averagePnl} icon={TrendingUp} secondaryValue={234.21} isCurrency isCount />
                <InfoCard title="Average Hold Time" value={averageHoldTime} icon={Timer} secondaryValue={-3} isTime />
                <InfoCard title="Average Win" value={averageWin} icon={TrendingUp} secondaryValue={4032.23} isCurrency isCount />
                <InfoCard title="Average Loss" value={averageLoss} icon={TrendingUp} secondaryValue={840.32} isCurrency isCount />
                <InfoCard title="Profit Factor" value={profitFactor} icon={TrendingUp} secondaryValue={0.11} isCount />
            </div>
        </>
    );
};