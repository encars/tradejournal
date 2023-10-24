import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface InfoCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    isCurrency?: boolean;
    isPercentage?: boolean;
    description?: string;
};

export const InfoCard = ({ title, value, icon: Icon, isCurrency, isPercentage, description }: InfoCardProps) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                    {title}
                    <Icon className="w-4 h-4 ml-2" />
                </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                {value.toLocaleString('de-DE')}
                {isCurrency && (
                    <span className="ml-2">€</span>
                )}
                {isPercentage && (
                    <span className="ml-2">%</span>
                )}
            </CardContent>
        </Card>
    )
}