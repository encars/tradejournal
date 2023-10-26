import getUser from "@/actions/get-user";
import { NextResponse } from "next/server";
import db from "@/prisma/db";

export async function PATCH (req: Request, { params }: { params: { tradeId: string } }) {
    try {
        const user = await getUser();

        const { note } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedTrade = await db.trade.update({
            where: {
                id: params.tradeId,
            },
            data: {
                notes: note,
            },
        });

        return NextResponse.json(updatedTrade, { status: 200 });
    } catch (error) {
        console.error("[TRADES_ID_NOTES]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}