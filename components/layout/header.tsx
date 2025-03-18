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

import CONSTANTS from '@/constants/layout';
import NAVBAR_CONSTANTS from '@/constants/navbar';

import type { NavItem } from '@/types/nav';

const BreadcrumbContent = ({ breadcrumbPath }: {
    breadcrumbPath: NavItem[] | null
}) => {
    const module = `${CONSTANTS.LAYOUT().NAMESPACE}`
    const namespace = `${NAVBAR_CONSTANTS.NAMESPACE}.${NAVBAR_CONSTANTS.NAVIGATION.NAMESPACE}`

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbPath?.map((crumb, index) => (
                    index === breadcrumbPath.length - 1 ? (
                        <BreadcrumbItem key={crumb.url}>
                            <BreadcrumbPage>
                                <IntlText
                                    module={module}
                                    namespace={namespace}
                                    value={crumb.title}
                                />
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    ) : (
                        <Fragment key={crumb.url}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={crumb.url}>
                                    <IntlText
                                        module={module}
                                        namespace={namespace}
                                        value={crumb.title}
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
    const module = `${CONSTANTS.LAYOUT().NAMESPACE}`
    const namespace = CONSTANTS.BREADCRUMB.NAMESPACE

    return (
        <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1">
                {!breadcrumbPath && (
                    <IntlText
                        module={module}
                        namespace={namespace}
                        value={CONSTANTS.BREADCRUMB.DEFAULT}
                    />
                )}
            </SidebarTrigger>

            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbContent breadcrumbPath={breadcrumbPath} />
        </div>
    );
};

export default Header;