import { NavItem } from "@/types/home/nav";
import { Icons } from "@/types/icon";

const isActive = (pathname: string, link: NavItem, children?: NavItem[]) => {
    const active = pathname.includes(link.href);
    const childrenActive = children && children.some(child => pathname.includes(child.href));
    return active || childrenActive;
}

const getExpandedIcon = (active?: boolean, children?: NavItem[]): Icons | undefined => {
    if(!children) {
        return undefined;
    }

    return active ? 'chevron-down' : 'chevron-right';
}

export { isActive, getExpandedIcon };
