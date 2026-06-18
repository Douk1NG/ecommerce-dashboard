'use client'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Icon from "@/components/layout/icon"
import { Button } from "@/components/ui/button"
import { useLocaleSwitcher } from '@/hooks/use-locale-switcher'
import { locales } from "@/i18n/routing"
import { useTranslations } from "next-intl"

const LocaleSwitcher = () => {
    const {
        locale,
        isPending,
        handleLocaleChange
    } = useLocaleSwitcher();
    const t = useTranslations()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isPending}>
                <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                    title={t("layout.navbar.localeSwitcher.switch")}
                >
                    <Icon name='globe' className='h-5 w-5' />
                    <small className='uppercase'>{locale}</small>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    {t("layout.navbar.localeSwitcher.switch")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {locales.map((it) => (
                    <DropdownMenuCheckboxItem
                        key={it}
                        onClick={handleLocaleChange}
                        id={it}
                        checked={it === locale}
                    >
                        {t(`layout.navbar.localeSwitcher.langs.${it}`)}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LocaleSwitcher