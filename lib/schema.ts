import { z } from "zod";

export const tradeSchema = z.object({
    asset: z.string().min(1, "Asset name is required").max(255),
    symbol: z.string().min(1, "Symbol is required").max(255),
    entryPrice: z.coerce.number().positive("Entry price must be positive").min(1, "Entry price is required"),
    exitPrice: z.coerce.number().optional(),
    isOpen: z.boolean(),
    quantity: z.coerce.number().min(1, "Quantity is required"),
    tradeDate: z.date(),
    closeDate: z.date().optional().nullable(),
    pnl: z.coerce.number().optional(),
}).superRefine((data, ctx) => {
    if (!!data.closeDate && !data.exitPrice) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["exitPrice"],
            message: "Both exit price and close date must be filled, or neither.",
        });
    } else if (!data.closeDate && !!data.exitPrice) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["closeDate"],
            message: "Both exit price and close date must be filled, or neither.",
        });
    }
    if (data.closeDate && data.tradeDate && data.closeDate < data.tradeDate) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["closeDate"],
            message: "Close date must be after trade date.",
        });
    }
});

export const closeTradeSchema = z.object({
    exitPrice: z.coerce.number().positive("Exit price must be positive").min(1, "Exit price is required"),
    closeDate: z.date(),
});

export const addCapitalSchema = z.object({
    amount: z.coerce.number().positive("Amount must be positive").min(1, "Amount is required"),
});