import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface InfoCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    isCurrency?: boolean;
    isPercentage?: boolean;
    isTime?: boolean;
    isCount?: boolean;
    secondaryValue: number;
};

export const InfoCard = ({ title, value, icon: Icon, isCurrency, isPercentage, isTime, isCount, secondaryValue }: InfoCardProps) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl truncate">
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
                {isTime && (
                    <span className="ml-2">{value === 1 ? 'Day' : 'Days'}</span>
                )}
                <p className="text-muted-foreground text-sm font-normal">
                    {secondaryValue >= 0 ? '+' : '-'}
                    {secondaryValue}
                    {!isCount && "%"} from last month
                </p>
            </CardContent>
        </Card>
    )
}