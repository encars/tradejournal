import getUser from "@/actions/get-user";
import { Navbar } from "@/components/navbar";
import { redirect } from "next/navigation";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}