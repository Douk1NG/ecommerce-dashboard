import { SidebarFooter, SidebarMenuItem } from "@/components/ui/sidebar"
import UserNav from "@/components/user-nav"
import LocaleSwitcher from "@/components/locale-switcher"

const Index = () => {
    return (
        <SidebarFooter>
            <SidebarMenuItem className="flex justify-between">
                <UserNav />
                <LocaleSwitcher />
            </SidebarMenuItem>
        </SidebarFooter>
    )
}

export default Index