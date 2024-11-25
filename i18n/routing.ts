import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es'];

export const routing = defineRouting({
    locales: locales,
    defaultLocale: 'es',
    localePrefix: {
        mode: 'always',
        prefixes: {
            'en': '/en',
            'es': '/es'
        }
    },
    pathnames: {
        '/': '/'
    }
});

export type Locale = (typeof locales)[number];

export const {
    Link,
    redirect,
    usePathname,
    useRouter
} = createNavigation(routing);