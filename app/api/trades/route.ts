import getUser from "@/actions/get-user";
import { NextResponse } from "next/server";
import db from "@/prisma/db"

export async function POST (req: Request) {
    try {
        const user = await getUser();

        const { asset, entryPrice, exitPrice, quantity, symbol, tradeDate, pnl } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const trade = await db.trade.create({
            data: {
                asset,
                entryPrice,
                exitPrice,
                quantity,
                symbol,
                tradeDate,
                pnl,
                userId: user.id
            },
        });

        return NextResponse.json(trade, { status: 201 });
    } catch (error) {
        console.error("[TRADES]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}