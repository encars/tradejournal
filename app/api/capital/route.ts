import getUser from "@/actions/get-user";
import { NextResponse } from "next/server";
import db from "@/prisma/db"

export async function PATCH (req: Request) {
    try {
        const user = await getUser();

        const { amount } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedUser = await db.user.update({
            where: {
                id: user.id
            },
            data: {
                capital: {
                    increment: amount
                },
            },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("[CAPITAL]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}