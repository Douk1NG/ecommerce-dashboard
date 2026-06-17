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
import IntlButton from "@/components/intl/Button";
import IntlText from '@/components/intl/Text';
import { useLocaleSwitcher } from '@/hooks/use-locale-switcher'
import { locales } from "@/i18n/routing"

const LocaleSwitcher = () => {
    const {
        locale,
        isPending,
        handleLocaleChange
    } = useLocaleSwitcher();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            </DropdownMenuTrigger>
            <DropdownMenuTrigger asChild disabled={isPending}>
                <IntlButton
                    variant="ghost"
                    size="icon"
                    value="layout.navbar.localeSwitcher.switch"
                    tooltip
                >
                    <Icon name='globe' className='h-5 w-5' />
                    <small className='uppercase'>{locale}</small>
                </IntlButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <IntlText
                        value="layout.navbar.localeSwitcher.switch"
                    />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {locales.map((it) => (
                    <DropdownMenuCheckboxItem
                        key={it}
                        onClick={handleLocaleChange}
                        id={it}
                        checked={it === locale}
                    >
                        <IntlText
                            value={`layout.navbar.localeSwitcher.langs.${it}`}
                        />
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LocaleSwitcher