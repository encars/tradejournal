"use client";

import { cn } from "@/lib/utils";
import { navLinks } from "@/settings/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between p-4 border-b border-muted-foreground">
            <div className="flex items-center">
                <Link href="/dashboard" className="flex items-center space-x-2 mr-32">
                    <Image src="/tjLogoNoBg.png" alt="logo" width={48} height={48} className="mx-2" />
                    <p className="text-2xl font-bold">
                        Trade Journal
                    </p>
                </Link>
                <ul className="flex items-center space-x-16">
                    {navLinks.map((link) => (
                        <Link href={link.href} key={link.key} className={cn("text-muted-foreground transition duration-300 hover:text-primary", pathname === link.href && "text-primary font-semibold")}>
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