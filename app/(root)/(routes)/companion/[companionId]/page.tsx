import { auth, redirectToSignIn } from "@clerk/nextjs";
import { CompanionForm } from "./components/companion-form";
import prismadb from "@/lib/prisma";

interface CompanionPageIdProps {
    params: {
        companionId: string
    }
}

const CompanionPageId = async ({params}: CompanionPageIdProps) => {

    const { userId } = auth();
    
    if ( !userId ) {
        return redirectToSignIn();
    }
    
    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId,
            userId
        }
    })

    const categories = await prismadb.category.findMany();
    return ( 
        <CompanionForm
        initialData={companion}
        categories={categories}
        />
     );
}
 
export default CompanionPageId;