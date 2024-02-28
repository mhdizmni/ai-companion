"use client";

import qs from "query-string"
import { Category } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoriesProps {
    data: Category[];
}

export const Categories = ({
    data
}: CategoriesProps ) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const category = searchParams.get("category");

    const onClick = (id: string | undefined) => {
        let query = { category: id }

        if (category === id) {query = {category: undefined}}

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipNull: true})

        router.push(url)
    }

    return (
        <div className="w-full overflow-x-auto space-x-2 flex p-1">
          <button
            onClick={() => onClick(undefined)}
            className={cn(`
              flex 
              items-center 
              text-center 
              text-xs 
              md:text-sm 
              px-2 
              md:px-4 
              py-2 
              md:py-3 
              rounded-md 
              bg-primary/10 
              hover:opacity-75 
              transition
            `,
              !category ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-primary/10'
            )}
          >
            All
          </button>
          {data.map((item) => (
            <button
              onClick={() => onClick(item.id)}
              className={cn(`
                flex 
                items-center 
                text-center 
                text-xs 
                md:text-sm 
                px-2 
                md:px-4 
                py-2 
                md:py-3 
                rounded-md 
                bg-primary/10 
                hover:opacity-75 
                transition
              `,
                item.id === category ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-primary/10'
              )}
              key={item.id}
            >
              {item.name}
            </button>
          ))}
        </div>
      )
}