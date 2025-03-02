'use client'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Icon from "@/components/icon"
import IntlButton from "@/components/intl/ui/Button";
import IntlText from '@/components/intl/ui/Text';
import CONSTANTS from "@/lib/constants";
import { useLocaleSwitcher } from '@/hooks/use-locale-switcher'
import { type Locale, locales} from "@/i18n/routing"

const LocaleSwitcher = () => {
    const {
        locale,
        isPending,
        switchLocale
    } = useLocaleSwitcher();

    function handleLocaleChange(event: React.MouseEvent<HTMLDivElement>): void {
        switchLocale(event.currentTarget.id as Locale);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            </DropdownMenuTrigger>
            <DropdownMenuTrigger asChild disabled={isPending}>
                <IntlButton
                    variant="ghost"
                    size="icon"
                    title={CONSTANTS.LAYOUT.LOCALE_SWITCHER.SWITCH}
                    tooltip
                >
                    <Icon name='globe' className='h-5 w-5' />
                    <small className='uppercase'>{locale}</small>
                </IntlButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <IntlText title={CONSTANTS.LAYOUT.LOCALE_SWITCHER.SWITCH} />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {locales.map((it) => (
                    <DropdownMenuCheckboxItem
                        key={it}
                        onClick={handleLocaleChange}
                        id={it}
                        checked={it === locale}
                    >
                        <IntlText title={`${CONSTANTS.LAYOUT.LOCALE_SWITCHER.LANGS}.${it}`} />
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LocaleSwitcher