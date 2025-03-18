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

import NAVBAR_CONSTANTS from "@/constants/navbar";
import LAYOUT_CONSTANTS from "@/constants/layout";

const user = {
    "username": "username",
    "email": "example@email.com",
    "avatar": "/images/avatar.jpg"
}

const UserNav = () => {
    const module = `${LAYOUT_CONSTANTS.LAYOUT().NAMESPACE}.${NAVBAR_CONSTANTS.NAMESPACE}`

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-2">
                    <IntlButton
                        module={module}
                        namespace={NAVBAR_CONSTANTS.USER.NAMESPACE}
                        title={NAVBAR_CONSTANTS.USER.PROFILE}
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
                        <IntlText
                            module={module}
                            namespace={NAVBAR_CONSTANTS.USER.NAMESPACE}
                            value={NAVBAR_CONSTANTS.USER.PROFILE}
                        />
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <IntlText
                        module={module}
                        namespace={NAVBAR_CONSTANTS.USER.NAMESPACE}
                        value={NAVBAR_CONSTANTS.USER.LOGOUT}
                    />
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav