import getUser from "@/actions/get-user";
import { Settings } from "@/components/settings/Settings";

const SettingsPage = async () => {
    const user = await getUser();

    return (
        <div className="flex flex-col p-6 items-center justify-between">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Your Settings</h1>
            </div>
            <Settings user={user!} />
        </div>
    );
};

export default SettingsPage;