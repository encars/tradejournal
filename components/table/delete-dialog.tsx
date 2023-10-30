import deleteTrade from "@/actions/delete-trade";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

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
                        This action will permanently delete this trade.
                        <br />
                        <br />
                        <span className="flex items-center font-bold text-lg mb-2"><AlertCircle className="h-6 w-6 mr-2" /> Warning:</span>
                        If the position is still open, the position size will <span className="font-bold">not</span> be returned to your capital. Consider closing the position first.
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