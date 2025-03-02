'use client'

import {
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from '@/components/ui/sidebar'

import { usePathname } from "@/i18n/routing"
import Icon from "@/components/icon"
import CONSTANTS from "@/lib/constants";
import navItems from "@/lib/navigation"
import IntlText from '@/components/intl/ui/Text'
import type { Icons } from "@/types/icon"

const isActive = (pathname: string, link: string) => {
    return pathname.includes(link);
}

const Index = () => {
    const pathname = usePathname();

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem
                            key={item.title}
                            className="p-1"
                        >
                            <SidebarMenuButton
                                asChild
                                isActive={isActive(pathname, item.url)}
                            >
                                <a
                                    href={item.url}
                                    className="font-medium"
                                >
                                    <Icon name={item.icon as Icons} className='h-5 w-5' />
                                    <IntlText title={`${CONSTANTS.LAYOUT.NAVBAR.NAMESPACE}.${item.title}`} />
                                </a>
                            </SidebarMenuButton>
                            {item.items?.length ? (
                                <SidebarMenuSub>
                                    {item.items.map((item) => (
                                        <SidebarMenuSubItem
                                            key={item.title}
                                            className="p-1"
                                        >
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={isActive(pathname, item.url)}
                                            >
                                                <a href={item.url}>
                                                    <Icon name={item.icon as Icons} className='h-5 w-5' />
                                                    <IntlText title={`${CONSTANTS.LAYOUT.NAVBAR.NAMESPACE}.${item.title}`} />
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            ) : null}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
    )
}

export default Index