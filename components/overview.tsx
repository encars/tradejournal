import { Trade, User } from "@prisma/client";
import { InfoCard } from "./info-card";
import { DollarSign } from "lucide-react";
import getAnalytics from "@/actions/get-analytics";

interface OverviewProps {
    user: User;
};

export const Overview = async ({ user }: OverviewProps) => {
    const { depotValue, numberOfTrades, winPercentage, profitFactor, averagePnl, averageHoldTime } = await getAnalytics(user.id);

    return (
        <div className="w-full flex items-center justify-between space-x-4 overflow-x-auto">
            <InfoCard title="Depot Value" value={depotValue} icon={DollarSign} isCurrency />
            <InfoCard title="Total Trades" value={numberOfTrades} icon={DollarSign} />
            <InfoCard title="Win Percentage" value={winPercentage} icon={DollarSign} isPercentage />
            <InfoCard title="Average PnL" value={averagePnl} icon={DollarSign} isCurrency />
        </div>
    );
};