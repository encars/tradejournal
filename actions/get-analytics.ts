import db from "@/prisma/db"

const getAnalytics = async (userId: string) => {
    const trades = await db.trade.findMany({
        where: {
            userId,
        },
    });

    const openTrades = trades.filter(trade => trade.isOpen);
    const closedTrades = trades.filter(trade => !trade.isOpen);

    const winningTrades = closedTrades.filter(trade => trade.pnl > 0);
    const losingTrades = closedTrades.filter(trade => trade.pnl < 0);

    const totalProfit = winningTrades.reduce((total, trade) => total + trade.pnl, 0);
    const totalLoss = Math.abs(losingTrades.reduce((total, trade) => total + trade.pnl, 0));

    const averageWinPercentage = Number((totalProfit / winningTrades.length * 100).toFixed(2));
    const averageLossPercentage = Number((totalLoss / losingTrades.length * 100).toFixed(2));

    const winPercentage = Number((winningTrades.length / closedTrades.length * 100).toFixed(2));
    const lossPercentage = Number((losingTrades.length / closedTrades.length * 100).toFixed(2));

    const depotValue = openTrades.reduce((total, trade) => total + trade.entryPrice * trade.quantity, 0);

    const numberOfTrades = trades.length;
    const numberOfClosedTrades = trades.filter(trade => !trade.isOpen).length;
    const profitFactor = totalProfit / totalLoss;
    const averagePnl = numberOfClosedTrades ? (totalProfit - totalLoss) / numberOfClosedTrades : 0;

    return {
        depotValue,
        numberOfTrades,
        averageWinPercentage,
        averageLossPercentage,
        winPercentage,
        profitFactor,
        averagePnl,
        averageHoldTime: 10,
    }
}

export default getAnalytics;