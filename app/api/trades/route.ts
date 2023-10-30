import getUser from "@/actions/get-user";
import { NextResponse } from "next/server";
import db from "@/prisma/db"

export async function POST (req: Request) {
    try {
        const user = await getUser();

        const { asset, entryPrice, exitPrice, quantity, symbol, tradeDate, closeDate, pnl, isOpen } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userToUpdate = await db.user.findUnique({
            where: {
                id: user.id
            },
        });

        const positionSize = entryPrice * quantity;

        if (userToUpdate!.capital < positionSize) {
            return new NextResponse("Insufficient Capital", { status: 400 });
        }

        const updatedUser = await db.user.update({
            where: {
                id: user.id
            },
            data: {
                capital: {
                    decrement: positionSize
                }
            }
        })

        const trade = await db.trade.create({
            data: {
                asset,
                entryPrice,
                exitPrice,
                quantity,
                symbol,
                tradeDate,
                closeDate,
                pnl,
                isOpen,
                notes: "",
                userId: user.id
            },
        });

        return NextResponse.json(trade, { status: 201 });
    } catch (error) {
        console.error("[TRADES]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}