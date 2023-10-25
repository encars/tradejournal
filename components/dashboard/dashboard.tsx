import { Trade, User } from "@prisma/client";
import { Overview } from "./overview";
import { DataTable } from "../table/data-table";
import { columns } from "../table/columns";


interface DashboardProps {
    user: User;
    trades: Trade[];
};

export const Dashboard = ({ user, trades }: DashboardProps) => {
    return (
        <>
            <Overview user={user!} />
            <DataTable columns={columns} data={trades} />
        </>
    )
}