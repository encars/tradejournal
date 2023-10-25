import getTrades from "@/actions/get-trades";
import getUser from "@/actions/get-user";
import { Dashboard } from "@/components/dashboard/dashboard";

const DashboardPage = async () => {
    const user = await getUser();
    const trades = await getTrades(user!.id) || [];

    return (
        <div className="flex flex-col p-6 items-center justify-between">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Your Dashboard</h1>
            </div>
            <Dashboard user={user!} trades={trades} />
        </div>
    );
};

export default DashboardPage;