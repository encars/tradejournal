import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Auth } from "@/components/auth";

const HomePage = async () => {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/dashboard");
	}

	return (
		<div className="flex items-center justify-center h-screen overflow-y-hidden bg-primary">
			<Auth />
		</div>
	)
}

export default HomePage;