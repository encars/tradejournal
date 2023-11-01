import getUser from "@/actions/get-user";
import { UserAnalytics } from "@/components/analytics/user-analytics";

const AnalyticsPage = async () => {
    const user = await getUser();

    return (
        <div className="flex flex-col p-6 items-center justify-between">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Analytics</h1>
            </div>
            <UserAnalytics user={user!} />
        </div>
    );
};

export default AnalyticsPage;