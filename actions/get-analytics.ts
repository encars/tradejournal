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

    const averageWin = Number((totalProfit / winningTrades.length).toFixed(2)) || 0;
    const averageLoss = Number((totalLoss / losingTrades.length).toFixed(2)) || 0;

    const winPercentage = Number((winningTrades.length / closedTrades.length * 100).toFixed(2)) || 0;
    const lossPercentage = Number((losingTrades.length / closedTrades.length * 100).toFixed(2)) || 0;

    const depotValue = openTrades.reduce((total, trade) => total + trade.entryPrice * trade.quantity, 0);

    const numberOfTrades = trades.length;
    const numberOfClosedTrades = trades.filter(trade => !trade.isOpen).length;

    const profitFactor = totalProfit / totalLoss || 0;
    const averagePnl = numberOfClosedTrades ? Number(((totalProfit - totalLoss) / numberOfClosedTrades).toFixed(2)) : 0;

    const totalHoldDuration = closedTrades.reduce((total, trade) => {
        const tradeDate = new Date(trade.tradeDate);
        const closeDate = new Date(trade.closeDate!);
        const duration = closeDate.getTime() - tradeDate.getTime();
        const days = duration / (1000 * 60 * 60 * 24);

        return total + days;
    }, 0);

    const averageHoldTime = closedTrades.length ? Number((totalHoldDuration / closedTrades.length).toFixed(2)) : 0;

    return {
        depotValue,
        numberOfTrades,
        averageWin,
        averageLoss,
        winPercentage,
        profitFactor,
        averagePnl,
        averageHoldTime,
    }
}

export default getAnalytics;