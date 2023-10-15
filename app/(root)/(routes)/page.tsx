import { Categories } from "@/components/categories";
import { Search as SearchInput } from "@/components/search";
import prismadb from "@/lib/prisma";

const Index = async () => {
    const categories = await prismadb.category.findMany();
    
    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories} />
        </div>
    )
}

export default Index;