import { Icons } from "../icon";

export type NavItem = {
    title: string;
    icon: Icons;
    href: string;
    children?: NavItem[];
    index: number;
}

export type NavProps = {
    translations: string;
    links: NavItem[];
    navRef: React.RefObject<NavRef>;
}

export type NavRef = {
    toggleVisibility: () => void;
}

export type ItemProps = {
    title: string;
    href: string;
    icon: Icons;
    locale?: string;
    isChild?: boolean;
    isActive?: boolean;
    onClick?: () => void;
    expansible?: Icons;
}
