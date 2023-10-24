import db from "@/prisma/db";
import getUser from "./get-user";

const getTrades = async (userId: string) => {
    try {
        const user = await getUser();

        if (!user || user.id !== userId) return null;

        const trades = await db.trade.findMany({
            where: {
                userId
            },
        });

        if (!trades) return null;

        return trades;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default getTrades;