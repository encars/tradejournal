"use client";

import { CalendarIcon, Loader2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const tradeSchema = z.object({
    asset: z.string().min(1, "Asset name is required").max(255),
    symbol: z.string().min(1, "Symbol is required").max(255),
    entryPrice: z.coerce.number().positive("Entry price must be positive").min(1, "Entry price is required"),
    exitPrice: z.coerce.number().optional(),
    quantity: z.coerce.number().min(1, "Quantity is required"),
    tradeDate: z.date(),
    pnl: z.coerce.number().optional(),
})

export const NewTrade = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof tradeSchema>>({
        resolver: zodResolver(tradeSchema),
        defaultValues: {
            asset: "",
            symbol: "",
            entryPrice: 0,
            exitPrice: 0,
            quantity: 0,
            pnl: 0,
        },
    });

    const calculatePnl = () => {
        const entryPrice = form.watch("entryPrice");
        const exitPrice = form.watch("exitPrice");
        const quantity = form.watch("quantity");

        if (!entryPrice || !exitPrice || !quantity) {
            return;
        }

        return (exitPrice - entryPrice) * quantity;
    }

    const onSubmit = async (values: z.infer<typeof tradeSchema>) => {
        try {
            setIsSubmitting(true);
            const res = await axios.post("/api/trades", {
                ...values,
                pnl: calculatePnl(),
            });
    
            if (res.status === 201) {
                form.reset();
                toast({
                    title: "Trade added!",
                    description: `Your ${values.asset} trade has been added successfully!`,
                    variant: "success"
                });
                router.refresh();
            } else {
                toast({
                    title: "Error",
                    description: "Something went wrong. Please try again later.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    <Plus className="w-6 h-6 mr-2" />
                    <p className="text-lg">
                        Add Trade
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-3xl">
                        New Trade
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex items-center space-x-4">
                            <FormField
                                control={form.control}
                                name="asset"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Asset Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tesla" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Name of the traded asset.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="symbol"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Symbol
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="TSLA" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Symbol of the traded asset.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Quantity
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Number of shares traded.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <FormField
                                control={form.control}
                                name="entryPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Entry Price (€)
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Price trade was entered at.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="exitPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Exit Price (€) <span className="ml-4 text-sm text-muted-foreground">(optional)</span>
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
                        </div>
                        <div className="flex items-center space-x-4">
                            <FormField
                                control={form.control}
                                name="tradeDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Trade Date
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
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Date of trade entry.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pnl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            PnL (€)
                                        </FormLabel>
                                        <FormControl>
                                            {calculatePnl() ? (
                                                <Input type="number" {...field} value={calculatePnl()} disabled />
                                            ) : (
                                                <Input type="number" {...field} disabled />
                                            )}
                                        </FormControl>
                                        <FormDescription>
                                            Calculated PnL.
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
                                    Adding Trade...
                                </>
                            ) : (
                                <>
                                    Add Trade
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}