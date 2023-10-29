import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { Search as SearchInput } from "@/components/search";
import prismadb from "@/lib/prisma";

interface RootPageProps {
    searchParams: {
        category: string,
        name: string
    }
}

const Index = async ({
    searchParams
}: RootPageProps) => {
    const data = await prismadb.companion.findMany({
        where: {
          categoryId: searchParams.category,
          name: {
            search: searchParams.name,
          },
        },
        orderBy: {
          createdAt: "desc"
        },
        include: {
          _count: {
            select: {
              messages: true,
            }
          }
        },
      });

    const categories = await prismadb.category.findMany();
    
    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories} />
            <Companions data={data} />
        </div>
    )
}

export default Index;