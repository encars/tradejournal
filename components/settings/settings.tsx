import { User } from "@prisma/client"

interface SettingsProps {
    user: User;
};

export const Settings = ({ user }: SettingsProps) => {
    return (
        <div>
            Settings
        </div>
    )
}