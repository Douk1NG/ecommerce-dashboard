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

import { useTranslations } from "next-intl"
import { translations } from "@/i18n/request"
import Icon from "@/components/icon"
import { Icons } from "@/types/icon"
import { usePathname } from "@/i18n/routing"
import navItems from "@/lib/navigation"

const isActive = (pathname: string, link: string) => {
    return pathname.includes(link);
}

const Index = () => {
    const t = useTranslations(translations.navbar);
    const pathname = usePathname();

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.title} className="p-1">
                            <SidebarMenuButton asChild isActive={isActive(pathname, item.url)}>
                                <a href={item.url} className="font-medium">
                                    <div><Icon name={item.icon as Icons} /></div>
                                    <span>{t(item.title)}</span>
                                </a>
                            </SidebarMenuButton>
                            {item.items?.length ? (
                                <SidebarMenuSub>
                                    {item.items.map((item) => (
                                        <SidebarMenuSubItem key={item.title} className="p-1">
                                            <SidebarMenuSubButton asChild isActive={isActive(pathname, item.url)}>
                                                <a href={item.url}>
                                                    <div><Icon name={item.icon as Icons} /></div>
                                                    <span>{t(item.title)}</span>
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