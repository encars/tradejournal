"use client";

import { cn } from "@/lib/utils";
import { navLinks } from "@/settings/site";
import { DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between p-4 border-b border-muted-foreground">
            <div className="flex items-center">
                <Link href="/dashboard" className="flex items-center space-x-2 mr-32">
                    <DollarSign className="w-8 h-8" />
                    <p className="text-xl font-bold">
                        Trade Journal
                    </p>
                </Link>
                <ul className="flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link href={link.href} key={link.key} className={cn("text-muted-foreground transition duration-300 hover:text-primary", pathname === link.href && "text-primary")}>
                            {link.label}
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="flex items-center space-x-4">
                <ModeToggle />
                <Button onClick={() => signOut()} variant="secondary">
                    Sign Out
                </Button>
            </div>
        </nav>
    )
}