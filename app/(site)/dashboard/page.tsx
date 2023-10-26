import getTrades from "@/actions/get-trades";
import getUser from "@/actions/get-user";
import { Capital } from "@/components/dashboard/capital";
import { UserDashboard } from "@/components/dashboard/user-dashboard";

const DashboardPage = async () => {
    const user = await getUser();
    const trades = await getTrades(user!.id) || [];

    return (
        <div className="flex flex-col p-6 items-center justify-between">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Capital user={user!} />
            </div>
            <UserDashboard user={user!} trades={trades} />
        </div>
    );
};

export default DashboardPage;