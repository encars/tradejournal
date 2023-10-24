import getTrades from "@/actions/get-trades";
import getUser from "@/actions/get-user";
import { Overview } from "@/components/overview";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";

const DashboardPage = async () => {
    const user = await getUser();
    const trades = await getTrades(user!.id) || [];

    return (
        <div className="flex flex-col py-8 items-center justify-between">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>
            <Overview user={user!} />
            <DataTable columns={columns} data={trades} />
        </div>
    );
};

export default DashboardPage;