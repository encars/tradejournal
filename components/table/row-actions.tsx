import { Row } from "@tanstack/react-table"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, StickyNote, Trash2, X } from "lucide-react";
import { useState } from "react";
import { tradeSchema } from "@/lib/schema";
import { DeleteDialog } from "./delete-dialog";
import { CloseDialog } from "./close-dialog";
import { NoteDialog } from "./note-dialog";

interface RowActionsProps<TData> {
    row: Row<TData>;
    tradeId: string;
    notes: string;
};

export function RowActions<TData>({ row, tradeId, notes }: RowActionsProps<TData>) {
    const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

    const trade = tradeSchema.parse(row.original);

    const handleCloseClick = () => {
        setDialogContent(
            <CloseDialog tradeId={tradeId} trade={trade} onClose={() => setDialogContent(null)} />
        );
    };

    const handleNoteClick = () => {
        setDialogContent(
            <NoteDialog type="add" tradeId={tradeId} notes={notes} onClose={() => setDialogContent(null)} />
        );
    };

    const handleViewClick = () => {
        setDialogContent(
            <NoteDialog type="view" tradeId={tradeId} notes={notes} onClose={() => setDialogContent(null)} />
        );
    }

    return (
        <div className="text-right">
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {notes ? (
                            <DialogTrigger asChild onClick={handleViewClick}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <StickyNote className="h-4 w-4 mr-2" />
                                    View Note
                                </DropdownMenuItem>
                            </DialogTrigger>
                        ) : (
                            <DialogTrigger asChild onClick={handleNoteClick}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <StickyNote className="h-4 w-4 mr-2" />
                                    Add Note
                                </DropdownMenuItem>
                            </DialogTrigger>
                        )}
                        {trade.isOpen && (
                            <DialogTrigger asChild onClick={handleCloseClick}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <X className="h-4 w-4 mr-2" />
                                    Close Trade
                                </DropdownMenuItem>
                            </DialogTrigger>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="cursor-pointer">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Trade
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {dialogContent &&  <DialogContent>{dialogContent}</DialogContent>}
                <DeleteDialog tradeId={tradeId} isOpen={showDeleteDialog} showActionToggle={setShowDeleteDialog} />
            </Dialog>
        </div>
    )
}