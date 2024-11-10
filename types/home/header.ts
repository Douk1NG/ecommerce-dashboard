import { NavRef } from "./nav";

export type User = {
    username: string;
    email: string;
}

export type HeaderProps = {
    navRef: React.RefObject<NavRef>;
    user: User;
}

export type UserNavProps = {
    user: User;
}

export type HamburgerProps = {
    onClick: () => void;
}

