import { useTransition } from 'react'
import { useParams } from "next/navigation"
import { useLocale } from 'next-intl'
import { type Locale, usePathname, useRouter } from "@/i18n/routing"

export function useLocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    const switchLocale = (newLocale: Locale) => {
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
    };

    return {
        locale,
        isPending,
        switchLocale
    }
}