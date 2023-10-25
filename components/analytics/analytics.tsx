import { Trade, User } from "@prisma/client"

interface AnalyticsProps {
    user: User;
    trades: Trade[];
}

export const Analytics = ({ user, trades }: AnalyticsProps) => {
    return (
        <div>
            Analytics
        </div>
    )
}