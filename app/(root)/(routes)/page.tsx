import { UserButton } from "@clerk/nextjs"

const Index = () => {
    return (
        <UserButton afterSignOutUrl="/" />
    )
}

export default Index;