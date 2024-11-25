import Logo from "@/components/logo"
import { SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"

const Index = () => {
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem className="px-4">
                    <Logo />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}

export default Index