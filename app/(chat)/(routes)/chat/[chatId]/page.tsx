import prismadb from "@/lib/prisma";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatClient from "./components/client";

interface ChatProps {
    params: {
        chatId: string
    }
}
const ChatPage = async ({
    params
}: ChatProps) => {
    const { userId } = auth();
    if (!userId) {
        return redirectToSignIn()
    }

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    userId
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    if (!companion) {
        return redirect("/");
    }
    return (
        <div>
            <ChatClient companion={companion} />
        </div>
    );
}
 
export default ChatPage;