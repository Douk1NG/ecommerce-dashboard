// prettier-ignore
import {
    Logo,
    LocaleSwitcher,
    UserNav,
    Hamburger
} from "./components";

import type { HeaderProps } from "@/types/home/header";

export default function Header({ navRef, user }: HeaderProps) {

    const onToggleNav = () => {
        navRef.current?.toggleVisibility();
    }

    return (
        <header className="fixed md:relative flex justify-center items-center bg-foreground h-20 px-4 md:gap-4 col-span-3 w-full z-10">
            <Hamburger onClick={onToggleNav} />
            <Logo />
            <LocaleSwitcher />
            <div className="flex items-center space-x-4 ml-8">
                <UserNav  user={user}/>
            </div>
        </header>
    )
}