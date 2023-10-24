"use client";

import { Trade } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Minus, MoreHorizontal, Plus } from "lucide-react";

export const columns: ColumnDef<Trade>[] = [
    {
        accessorKey: "asset",
        header: "Asset",
    },
    {
        accessorKey: "symbol",
        header: "Symbol",
    },
    {
        accessorKey: "quantity",
        header: () => <div className="text-right">Quantity</div>,
        cell: ({ row }) => {
            const quantity = parseFloat(row.getValue("quantity"))

            return <div className="text-right">{quantity}</div>
        }
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
                return <div className="text-right">Not set</div>
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
        header: () => <div className="text-right">PnL</div>,
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
                        {pnl} €
                    </div>
                );
            }
        }
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
                            <DropdownMenuLabel>
                                Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => { }}>
                                Set exit price
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
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