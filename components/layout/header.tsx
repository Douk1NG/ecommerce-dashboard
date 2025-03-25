"use client";
import { Fragment } from 'react';
import { Separator } from '@/components/ui/separator';
import IntlText from '@/components/intl/Text';

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

import LayoutTranslations from '@/constants/translations/layout';

import type { NavItem } from '@/types/nav';

const BreadcrumbContent = ({ breadcrumbPath }: {
    breadcrumbPath: NavItem[] | null
}) => {
    const namespace = LayoutTranslations.navbar.navigation;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbPath?.map((crumb, index) => (
                    index === breadcrumbPath.length - 1 ? (
                        <BreadcrumbItem key={crumb.url}>
                            <BreadcrumbPage>
                                <IntlText
                                    value={namespace[crumb.title]}
                                />
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    ) : (
                        <Fragment key={crumb.url}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={crumb.url}>
                                    <IntlText
                                        value={namespace[crumb.title]}
                                    />
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

    return (
        <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1">
                {!breadcrumbPath && (
                    <IntlText
                        value={LayoutTranslations.breadcrumb.default}
                    />
                )}
            </SidebarTrigger>

            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbContent breadcrumbPath={breadcrumbPath} />
        </div>
    );
};

export default Header;