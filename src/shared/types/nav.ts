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
    icon: string;
    items?: NavItem[];
}