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
import Icon from "@/components/layout/icon"
import navItems from "@/src/shared/lib/navigation"
import { useTranslations } from "next-intl"

const isActive = (pathname: string, link: string) => {
    return pathname.includes(link);
}

const Index = () => {
    const pathname = usePathname();
    const t = useTranslations();

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
                                    <Icon name={item.icon} className='h-6 w-6' />
                                    {t(`layout.navbar.navigation.${item.title}`)}
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
                                                    <Icon name={item.icon} className='h-6 w-6' />
                                                    {t(`layout.navbar.navigation.${item.title}`)}
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