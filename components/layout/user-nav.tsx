import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import IntlButton from "@/components/intl/Button";
import IntlText from "@/components/intl/Text";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import CONSTANTS from "@/lib/constants";

import type { UserNavProps } from "@/types/nav";

const user = {
    "username": "username",
    "email": "example@email.com",
    "avatar": "/images/avatar.jpg"
}

const UserNav = (props: UserNavProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-2">
                    <IntlButton
                        title={CONSTANTS.LAYOUT.USERNAV.PROFILE}
                        variant="ghost"
                        className="relative h-8 w-8 aspect-square"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={user.avatar}
                                alt="@shadcn"
                            />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                    </IntlButton>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <IntlText title={CONSTANTS.LAYOUT.USERNAV.PROFILE} />
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <IntlText title={CONSTANTS.LAYOUT.USERNAV.LOGOUT} />
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav