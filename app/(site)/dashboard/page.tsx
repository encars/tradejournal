import getUser from "@/actions/get-user";
import { NewTrade } from "@/components/new-trade";

const DashboardPage = async () => {
    const user = await getUser();

    return (
        <div className="flex py-8 items-center justify-between">
            <h1 className="text-2xl">Dashboard</h1>
            <p>Welcome {user?.username}</p>
            <NewTrade />
        </div>
    );
};

export default DashboardPage;