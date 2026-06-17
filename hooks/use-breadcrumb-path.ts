import { useMemo } from 'react';
import links from '@/src/shared/lib/navigation';
import type { NavItem } from '@/src/shared/types/nav';

const findBreadcrumbPath = (
    items: NavItem[],
    url: string,
    path: NavItem[] = []
): NavItem[] | null => {
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

export const useBreadcrumbPath = (currentUrl: string) => {
    return useMemo(() => {
        return findBreadcrumbPath(links, currentUrl);
    }, [currentUrl]);
};