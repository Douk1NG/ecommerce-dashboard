'use client'
import { useTranslations } from 'next-intl'
import { useLocaleSwitcher } from '@/hooks/use-locale-switcher'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import Icon from "@/components/icon"

import { type Locale, locales} from "@/i18n/routing"
import { translations } from '@/i18n/request'

const LocaleSwitcher = () => {
    const t = useTranslations(translations.header);
    const { locale, isPending, switchLocale } = useLocaleSwitcher();

    function handleLocaleChange(event: React.MouseEvent<HTMLDivElement>): void {
        switchLocale(event.currentTarget.id as Locale);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            </DropdownMenuTrigger>
            <DropdownMenuTrigger asChild disabled={isPending}>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    title={t('lang')}
                >
                    <Icon name='globe'/>
                    <small className='uppercase'>{locale}</small>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('lang')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {locales.map((it) => (
                    <DropdownMenuCheckboxItem
                        key={it}
                        onClick={handleLocaleChange}
                        id={it}
                        checked={it === locale}
                    >
                        {t(`langs.${it}`)}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LocaleSwitcher