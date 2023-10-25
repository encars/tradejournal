"use client";

import { Trade } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Trade>[] = [
    {
        accessorKey: "asset",
        header: "Asset",
    },
    {
        accessorKey: "symbol",
        header: "Symbol",
        cell: ({ row }) => {
            const symbol: string = row.getValue("symbol");
            return (
                <div className="font-semibold">{symbol}</div>
            )
        }
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "tradeDate",
        header: () => <div className="text-right">Entry Date</div>,
        cell: ({ row }) => {
            const date = new Date(row.getValue("tradeDate"))
            const formatted = new Intl.DateTimeFormat("de-DE").format(date)

            return <div className="text-right">{formatted}</div>
        }
    },
    {
        accessorKey: "closeDate",
        header: () => <div className="text-right">Exit Date</div>,
        cell: ({ row }) => {
            if (!row.getValue("closeDate")) {
                return <div className="text-right">-</div>
            }

            const date = new Date(row.getValue("closeDate"));

            const formatted = new Intl.DateTimeFormat("de-DE").format(date)

            return <div className="text-right">{formatted}</div>
        }
    },
    {
        accessorKey: "isOpen",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const isOpen = row.getValue("isOpen")

            if (isOpen) {
                return <div className="text-right text-green-500">Open</div>
            } else {
                return <div className="text-right text-red-500">Closed</div>
            }
        }
    },
    {
        accessorKey: "entryPrice",
        header: () => <div className="text-right">Entry Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("entryPrice"))
            const formatted = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(price)

            return <div className="text-right">{formatted}</div>
        }
    },
    {
        accessorKey: "exitPrice",
        header: () => <div className="text-right">Exit Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("exitPrice")) || ""

            if (!price) {
                return <div className="text-right">-</div>
            }

            const formatted = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(price)

            return <div className="text-right">{formatted}</div>
        }
    },
    {
        accessorKey: "pnl",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        PnL
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const pnl = parseFloat(row.getValue("pnl")) || 0;

            if (pnl > 0) {
                return (
                    <div className="text-right text-green-500">
                        +{pnl} €
                    </div>
                );
            } else if (pnl < 0) {
                return (
                    <div className="text-right text-red-500">
                        {pnl} €
                    </div>
                )
            } else {
                return (
                    <div className="text-right">
                        -
                    </div>
                );
            }
        }
    },
    {
        accessorKey: "duration",
        header: () => <div className="text-right">Duration</div>,
        cell: ({ row }) => {
            const tradeDate = new Date(row.getValue("tradeDate"));
            const closeDate = row.getValue("closeDate") ? new Date(row.getValue("closeDate")) : null;

            if (!closeDate) {
                return <div className="text-right">-</div>
            }

            const duration = closeDate.getTime() - tradeDate.getTime();

            const days = Math.floor(duration / (1000 * 60 * 60 * 24));

            const formattedDuration = days === 1 ? `${days} day` : `${days} days`;

            return <div className="text-right">{formattedDuration}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const trade = row.original;

            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {trade.isOpen && (
                                <DropdownMenuItem onClick={() => { }}>
                                    Close Trade
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => { }}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]