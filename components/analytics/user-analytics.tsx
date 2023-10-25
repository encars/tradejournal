import { Trade, User } from "@prisma/client"

interface UserAnalyticsProps {
    user: User;
    trades: Trade[];
};

export const UserAnalytics = ({ user, trades }: UserAnalyticsProps) => {
    return (
        <div>
            UserAnalytics
        </div>
    );
};