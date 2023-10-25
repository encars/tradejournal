import { Trade, User } from "@prisma/client";
import { Overview } from "./overview";
import { DataTable } from "../table/data-table";
import { columns } from "../table/columns";


interface UserDashboardProps {
    user: User;
    trades: Trade[];
};

export const UserDashboard = ({ user, trades }: UserDashboardProps) => {
    return (
        <>
            <Overview user={user!} />
            <DataTable columns={columns} data={trades} />
        </>
    );
};