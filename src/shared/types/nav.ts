import type { Icons } from "@/components/layout/icon";

export type User = {
    username: string;
    email: string;
}

export type UserNavProps = {
    user?: User;
}

export type NavItem = {
    title: 'products' | 'categories' | 'filters' | 'inventory' | 'settings';
    url: string;
    icon: Icons;
    items?: NavItem[];
}