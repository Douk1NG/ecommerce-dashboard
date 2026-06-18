"use client";
import { Fragment } from 'react';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from '@/components/ui/breadcrumb';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { useBreadcrumbPath } from '@/hooks/use-breadcrumb-path';
import { usePathname } from '@/i18n/routing';

import type { NavItem } from '@/src/shared/types/nav';

const BreadcrumbContent = ({ breadcrumbPath, t }: {
    breadcrumbPath: NavItem[] | null;
    t: ReturnType<typeof useTranslations>;
}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbPath?.map((crumb, index) => (
                    index === breadcrumbPath.length - 1 ? (
                        <BreadcrumbItem key={crumb.url}>
                            <BreadcrumbPage>
                                {t(`layout.navbar.navigation.${crumb.title}`)}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    ) : (
                        <Fragment key={crumb.url}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={crumb.url}>
                                    {t(`layout.navbar.navigation.${crumb.title}`)}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator key={`separator-${crumb.url}`} />
                        </Fragment>
                    )
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

const Header = () => {
    const pathname = usePathname();
    const breadcrumbPath = useBreadcrumbPath(pathname);
    const t = useTranslations();

    return (
        <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1">
                {!breadcrumbPath && t('layout.breadcrumb.default')}
            </SidebarTrigger>

            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbContent breadcrumbPath={breadcrumbPath} t={t} />
        </div>
    );
};

export default Header;