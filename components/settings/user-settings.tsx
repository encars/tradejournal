import { User } from "@prisma/client"

interface UserSettingsProps {
    user: User;
};

export const UserSettings = ({ user }: UserSettingsProps) => {
    return (
        <div>
            UserSettings
        </div>
    );
};