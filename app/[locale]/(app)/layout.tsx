import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Nav from "@/components/nav"
import Header from "@/components/layout/header"
import { Toaster } from "@/components/ui/toaster"
import type { BaseLayoutProps } from "@/src/shared/types/layout"

const AppLayout: React.FC<BaseLayoutProps> = async ({ children }: BaseLayoutProps) => {
    return (
        <SidebarProvider>
            <Nav />
            <SidebarInset>
                <Header />
                {children}
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AppLayout 