import { Navbar } from "@/components/navbar";

const RootLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    );
}
 
export default RootLayout;