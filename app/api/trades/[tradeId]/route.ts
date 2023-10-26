import getUser from "@/actions/get-user";
import db from "@/prisma/db";
import { NextResponse } from "next/server";

export async function DELETE (req: Request, { params }: { params: { tradeId: string } }) {
    try {
        const user = await getUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedTrade = await db.trade.delete({
            where: {
                id: params.tradeId,
            },
        });

        return NextResponse.json(deletedTrade, { status: 200 });
    } catch (error) {
        console.error("[TRADES_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH (req: Request, { params }: { params: { tradeId: string } }) {
    try {
        const user = await getUser();

        const { exitPrice, closeDate, pnl } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const closedTrade = await db.trade.update({
            where: {
                id: params.tradeId,
            },
            data: {
                exitPrice,
                closeDate,
                pnl,
                isOpen: false,
            },
        });

        return NextResponse.json(closedTrade, { status: 200 });
    } catch (error) {
        console.error("[TRADES_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}