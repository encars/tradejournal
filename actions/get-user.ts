import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Session, getServerSession } from "next-auth"
import db from "@/prisma/db"

type SessionWithId = Session & {
    user: {
        id: string
    }
};

const getUser = async () => {
    try {
        const session: SessionWithId = await getServerSession(authOptions) as SessionWithId;

        if (!session) return null;

        const id = session.user!.id;

        const user = await db.user.findUnique({
            where: {
                id
            },
        });

        if (!user) return null;

        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default getUser;