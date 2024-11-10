import Logo from "./logo";
import LocaleSwitcher from "./locale-switcher";
import UserNav from "./user-nav";
import Hamburger from "./hamburger";

interface PropTypes {
    onToggleNavBar: () => void;
}

export default function Header({ onToggleNavBar }: PropTypes) {
    return (
        <header className="fixed md:relative flex justify-center items-center bg-foreground h-20 px-4 md:gap-4 col-span-3 w-full z-10">
            <Hamburger onClick={onToggleNavBar} />
            <Logo />
            <LocaleSwitcher />
            <div className="flex items-center space-x-4 ml-8">
                <UserNav />
            </div>
        </header>
    )
}