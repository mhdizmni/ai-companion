"use client";

import qs from "query-string";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

import { SearchIcon } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

export const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const category = searchParams.get("category");
    const name = searchParams.get("name");

    const [value, setValue] = useState(name || "");
    const debouncedValue = useDebounce<string>(value);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        const query = {
            name: debouncedValue,
            category: category
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipEmptyString: true, skipNull: true})

        router.push(url)
    }, [debouncedValue, router, category])

    return (
        <div className="relative">
            <SearchIcon className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
            <Input
                onChange={onChange}
                value={value}
                placeholder="Search"
                className="pl-10 bg-primary/10"
            />
        </div>
    )
}