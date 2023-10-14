"use client";

import Link from "next/link";
import { Nunito } from "next/font/google";
import { Menu, Sparkles } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

import { cn } from "@/lib/utils";

const font = Nunito({
    weight: ["400", "700"],
    subsets: ["latin"]
})

export const Navbar = () => {
    return (
        <div className="fixed z-50 w-full border-b flex items-center justify-between p-2">
            <div className="flex items-center">
                <Menu className="block md:hidden" />
                <Link href="/">
                    <h1 className={cn(
                        "hidden md:block",
                        font.className
                    )}>
                        Companion. <span className="italic">by</span> <span className="font-bold">miti.</span>
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="premium" size="sm" className="flex items-center justify-between gap-1">
                    Upgrade
                    <Sparkles className="h-4 w-4 fill-white text-white" />
                </Button>
                <ModeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}