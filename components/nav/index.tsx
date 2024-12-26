import {
    Sidebar,
    SidebarRail,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarFooter
} from "@/components/ui/sidebar"

import Title from "@/components/title"
import UserNav from "@/components/user-nav"
import LocaleSwitcher from "@/components/locale-switcher"

import Content from "./content"

function Nav({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="px-4">
                        <Title />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <Content />
            <SidebarFooter>
            <SidebarMenuItem className="flex justify-between">
                <UserNav />
                <LocaleSwitcher />
            </SidebarMenuItem>
        </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default Nav