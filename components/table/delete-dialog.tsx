import deleteTrade from "@/actions/delete-trade";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface DeleteDialogProps {
    tradeId: string;
    isOpen: boolean;
    showActionToggle: (open: boolean) => void;
}

export const DeleteDialog = ({ tradeId, isOpen, showActionToggle }: DeleteDialogProps) => {
    const router = useRouter();

    const handleDelete = () => {
        deleteTrade(tradeId).then(() => {
            toast({
                title: "Trade deleted",
                description: "The trade was successfully deleted.",
                variant: "default"
            });

            router.refresh();
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={showActionToggle}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the trade.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}