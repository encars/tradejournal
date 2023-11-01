import db from "@/prisma/db"
import getUser from "./get-user"

export const getLargestWin = async (userId: string) => {
    try {
        const user = await getUser();

        if (!user || user.id !== userId) return null;

        const largestWin = await db.trade.findFirst({
            where: {
                userId,
                isOpen: false,
                pnl: {
                    gt: 0
                },
            },
            orderBy: {
                pnl: "desc"
            },
        });

        if (!largestWin) return null;

        return largestWin;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getLargestLoss = async (userId: string) => {
    try {
        const user = await getUser();

        if (!user || user.id !== userId) return null;

        const largestLoss = await db.trade.findFirst({
            where: {
                userId,
                isOpen: false,
                pnl: {
                    lt: 0
                },
            },
            orderBy: {
                pnl: "asc"
            },
        });

        if (!largestLoss) return null;

        return largestLoss;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getLargestPositionSize = async (userId: string) => {
    try {
        const user = await getUser();

        if (!user || user.id !== userId) return null;

        const trades = await db.trade.findMany({
            where: {
                userId,
                isOpen: false,
            },
        });

        const largestPositionSize = trades.reduce((prev, current) => {
            const prevSize = prev.quantity * prev.entryPrice;
            const currentSize = current.quantity * current.entryPrice;
            return prevSize > currentSize ? prev : current;
        }, trades[0]);

        if (!largestPositionSize) return null;

        return largestPositionSize;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getLongestOpenTrade = async (userId: string) => {
    try {
        const user = await getUser();

        if (!user || user.id !== userId) return null;

        const trades = await db.trade.findMany({
            where: {
                userId,
                isOpen: false,
            },
        });

        const longestOpenTrade = trades.reduce((prev, current) => {
            const prevDuration = prev.closeDate ? prev.closeDate.getTime() - prev.tradeDate.getTime() : 0;
            const currentDuration = current.closeDate ? current.closeDate.getTime() - current.tradeDate.getTime() : 0;
            return prevDuration > currentDuration ? prev : current;
        }, trades[0]);

        if (!longestOpenTrade) return null;

        return longestOpenTrade;
    } catch (error) {
        console.error(error);
        return null;
    }
};