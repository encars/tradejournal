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
                <CardTitle className="flex items-center justify-between text-lg truncate">
                    {title}
                    <Icon className="w-6 h-6 ml-2" />
                </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
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
                    {secondaryValue >= 0 && '+'}
                    {secondaryValue}
                    {isCurrency && isCount && "€"}
                    {isTime && ` ${secondaryValue === 1 || secondaryValue === -1 ? 'day' : 'days'}`}
                    {!isCount && !isTime && "%"} from last month
                </p>
            </CardContent>
        </Card>
    )
}