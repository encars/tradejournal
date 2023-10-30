import { closeTradeSchema, tradeSchema } from "@/lib/schema";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

interface CloseDialogProps {
    tradeId: string;
    trade: z.infer<typeof tradeSchema>;
    onClose: () => void;
};

export const CloseDialog = ({ tradeId, trade, onClose }: CloseDialogProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof closeTradeSchema>>({
        resolver: zodResolver(closeTradeSchema),
        defaultValues: {
            exitPrice: 0,
        },
    });

    const onSubmit = async (values: z.infer<typeof closeTradeSchema>) => {
        try {
            setIsSubmitting(true);
            const res = await axios.patch(`/api/trades/${tradeId}`, {
                ...values,
                pnl: parseFloat((trade.quantity * (values.exitPrice - trade.entryPrice)).toFixed(2)),
            });

            if (res.status === 200) {
                form.reset();
                toast({
                    title: "Trade closed.",
                    description: (
                        <>
                            The trade has been closed successfully.
                            <br />
                            <span className="font-bold">{(values.exitPrice * trade.quantity).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span> has been added to your account.
                            <br />
                            You have made a {values.exitPrice > trade.entryPrice ? <span className="font-bold text-green-500">profit</span> : <span className="font-bold text-red-500">loss</span>} of <span className="font-bold">{(Math.abs(values.exitPrice - trade.entryPrice) * trade.quantity).toLocaleString("de-DE", { style: 'currency', currency: 'EUR' })}</span>.
                        </>
                    ),
                    variant: "default",
                });
                router.refresh();
                onClose();
            } else {
                toast({
                    title: "Error",
                    description: "An error occurred while closing the trade.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred while closing the trade.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col space-y-8">
            <DialogHeader>
                <DialogTitle>
                    Close Trade
                </DialogTitle>
                <DialogDescription>
                    Please enter the exit date and price to close the trade.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex items-center space-x-4">
                        <FormField
                            control={form.control}
                            name="exitPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Exit Price (€)
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Price trade was exited at.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="closeDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Close Date
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className={cn("w-[280px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value || undefined}
                                                onSelect={field.onChange}
                                                disabled={(date) => date > new Date() || date < new Date("1900-01-01") || date < trade.tradeDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Date of trade exit.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Closing Trade...
                            </>
                        ) : (
                            <>
                                Close Trade
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};