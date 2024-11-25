"use client";
import React from 'react';
import { useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import links from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { translations } from '@/i18n/request';
import { usePathname } from '@/i18n/routing';

import type { NavItem } from '@/types/home/header';

const useBreadcrumbPath = (currentUrl: string) => {
    return useMemo(() => {
        const findBreadcrumbPath = (items: NavItem[], url: string, path: NavItem[] = []): NavItem[] | null => {
            for (const item of items) {
                const newPath = [...path, item];

                if (url.includes(item.url)) {
                    return newPath;
                }

                if (item.items) {
                    const result = findBreadcrumbPath(item.items, url, newPath);
                    if (result) return result;
                }
            }
            return null;
        };

        return findBreadcrumbPath(links, currentUrl);
    }, [currentUrl]);
};

const Header = () => {
    const pathname = usePathname();
    const breadcrumbPath = useBreadcrumbPath(pathname);
    const t = useTranslations(translations.navbar);

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbPath?.map((crumb, index) => (
                        index === breadcrumbPath.length - 1 ? (
                            <BreadcrumbItem key={crumb.url}>
                                <BreadcrumbPage>{t(crumb.title)}</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : (
                            <React.Fragment key={crumb.url}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={crumb.url}>
                                        {t(crumb.title)}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator key={`separator-${crumb.url}`} />
                            </React.Fragment>
                        )
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    );
};

export default Header;