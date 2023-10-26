import getUser from "@/actions/get-user";
import { UserSettings } from "@/components/settings/user-settings";

const SettingsPage = async () => {
    const user = await getUser();

    return (
        <div className="flex flex-col p-6 items-center justify-between">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <UserSettings user={user!} />
        </div>
    );
};

export default SettingsPage;