import { useTranslations } from "next-intl";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { translations } from '@/i18n/request';

import type { UserNavProps } from "@/types/home/header";

const UserNav = ({ user }: UserNavProps) => {

    const defaultUser = {
        "username": "Dibey Valencia",
        "email": "dialexanderx@gmail.com"
    }

    const {
        username,
        email
    } = user || defaultUser

    const t = useTranslations(translations.header);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-2">
                    <Button
                        title={t('profile')}
                        variant="ghost"
                        className="relative h-8 w-8 aspect-square"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src="/images/avatar.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                    </Button>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{username}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        {t('profile')}
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    {t('logout')}
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav