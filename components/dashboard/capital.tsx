"use client";

import { User } from "@prisma/client";
import { Button } from "../ui/button";
import { Loader2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addCapitalSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "../ui/use-toast";

interface CapitalProps {
    user: User;
};

export const Capital = ({ user }: CapitalProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof addCapitalSchema>>({
        resolver: zodResolver(addCapitalSchema),
        defaultValues: {
            amount: 0,
        },
    });

    const onSubmit = async (values: z.infer<typeof addCapitalSchema>) => {
        try {
            setIsSubmitting(true);
            const res = await axios.patch("/api/capital", values);

            if (res.status === 200) {
                form.reset();
                toast({
                    title: "Capital added",
                    description: `You successfully added ${values.amount} € to your account.`,
                    variant: "default",
                });
                setIsDialogOpen(false);
                router.refresh();
            } else {
                toast({
                    title: "Error",
                    description: "Something went wrong while adding capital to your account.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong while adding capital to your account.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Button variant="outline">
                Your capital: <span className="ml-2 font-bold">{user.capital?.toLocaleString("de-DE") || 0} €</span>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add capital
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add capital
                        </DialogTitle>
                        <DialogDescription>
                            Add capital to your account to start trading.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Amount (€)
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The amount of capital you want to add to your account.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding capital...
                                    </>
                                ) : (
                                    <>
                                        Add capital
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};