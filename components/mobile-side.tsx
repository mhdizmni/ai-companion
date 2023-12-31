import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Sidebar } from "@/components/sidebar";

export const MobileSide = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-2">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}  