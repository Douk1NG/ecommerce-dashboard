import { useTransition } from 'react'
import { usePathname, useRouter } from "@/lib/navigation"
import { useParams } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl'

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

import { Locale, locales, translations } from "@/i18n"

const LocaleSwitcher = () => {
    const t = useTranslations(translations.header);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    function handleLocaleChange(event: React.MouseEvent<HTMLDivElement>): void {
        const newLocale = event.currentTarget.id as Locale;
        if (newLocale === locale) return;

        document.cookie.replace(
            new RegExp(`(^| )locale=([^;]+)(;|$)`),
            `$1locale=${newLocale}$3`
        )

        startTransition(() => {
            router.replace(
                // @ts-expect-error
                { pathname, params },
                { locale: newLocale }
            );

            router.refresh();
        });
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
                    className='hover:bg-slate-600'
                >
                    <Icon name='globe' className='invert' />
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