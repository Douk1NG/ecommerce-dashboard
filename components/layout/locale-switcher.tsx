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
import NAVBAR_CONSTANTS from "@/constants/navbar";
import LAYOUT_CONSTANTS from "@/constants/layout";
import { useLocaleSwitcher } from '@/hooks/use-locale-switcher'
import { type Locale, locales } from "@/i18n/routing"

const LocaleSwitcher = () => {
    const {
        locale,
        isPending,
        switchLocale
    } = useLocaleSwitcher();

    const module = `${LAYOUT_CONSTANTS.LAYOUT().NAMESPACE}.${NAVBAR_CONSTANTS.NAMESPACE}`
    const namespace = NAVBAR_CONSTANTS.LOCALESWITCHER.NAMESPACE

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
                    module={module}
                    namespace={namespace}
                    value={NAVBAR_CONSTANTS.LOCALESWITCHER.SWITCH}
                    tooltip
                >
                    <Icon name='globe' className='h-5 w-5' />
                    <small className='uppercase'>{locale}</small>
                </IntlButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <IntlText
                        module={module}
                        namespace={namespace}
                        value={NAVBAR_CONSTANTS.LOCALESWITCHER.SWITCH}
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
                            module={module}
                            namespace={namespace}
                            value={`${NAVBAR_CONSTANTS.LOCALESWITCHER.LANGS}.${it}`}
                        />
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LocaleSwitcher