export type User = {
    username: string;
    email: string;
}

export type UserNavProps = {
    user?: User;
}

export type NavItem = {
    title: string;
    url: string;
    items?: NavItem[];
}