import bcrypt from "bcrypt";
import db from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await db.user.create({
            data: {
                username,
                hashedPassword
            }
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("[REGISTER]", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
};