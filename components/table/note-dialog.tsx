import { addNoteSchema } from "@/lib/schema";
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
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface NoteDialogProps {
    type: "add" | "view";
    tradeId: string;
    notes?: string;
    onClose: () => void;
};

export const NoteDialog = ({ type, tradeId, notes, onClose }: NoteDialogProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [note, setNote] = useState<string>(notes || "");

    const form = useForm<z.infer<typeof addNoteSchema>>({
        resolver: zodResolver(addNoteSchema),
        defaultValues: {
            note: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof addNoteSchema>) => {
        try {
            setIsSubmitting(true);
            const res = await axios.patch(`/api/trades/${tradeId}/notes`, values);

            if (res.status === 200) {
                form.reset();
                toast({
                    title: "Success",
                    description: `Note ${type === "add" ? "added" : "updated"} successfully.`,
                    variant: "success",
                });
                router.refresh();
                onClose();
            } else {
                toast({
                    title: "Error",
                    description: `An error occurred while ${type === "add" ? "adding" : "updating"} the note.`,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: `An error occurred while ${type === "add" ? "adding" : "updating"} the note.`,
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
                    {type === "add" ? "Add Note" : "View Note"}
                </DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Note
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={note} onChange={(e) => {
                                        field.onChange(e);
                                        setNote(e.target.value);
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {type === "add" ? "Adding Note..." : "Updating Note..."}
                            </>
                        ) : (
                            <>
                                {type === "add" ? "Add Note" : "Update Note"}
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};