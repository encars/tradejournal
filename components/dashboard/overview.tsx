import { User } from "@prisma/client";
import { CandlestickChart, DollarSign, PieChart, Timer, TrendingUp } from "lucide-react";

import getAnalytics from "@/actions/get-analytics";
import { InfoCard } from "./info-card";

interface OverviewProps {
    user: User;
};

export const Overview = async ({ user }: OverviewProps) => {
    const { depotValue, numberOfTrades, winPercentage, averagePnl, averageHoldTime } = await getAnalytics(user.id);

    return (
        <div className="w-full flex items-center justify-between space-x-4 overflow-x-auto">
            <InfoCard title="Depot Value" value={depotValue} icon={DollarSign} secondaryValue={12.2} isCurrency />
            <InfoCard title="Total Trades" value={numberOfTrades} icon={CandlestickChart} secondaryValue={3} isCount />
            <InfoCard title="Win Percentage" value={winPercentage} icon={PieChart} secondaryValue={-2.3} isPercentage />
            <InfoCard title="Average PnL" value={averagePnl} icon={TrendingUp} secondaryValue={234.21} isCurrency isCount />
            <InfoCard title="Average Hold Time" value={averageHoldTime} icon={Timer} secondaryValue={-3} isTime />
        </div>
    );
};