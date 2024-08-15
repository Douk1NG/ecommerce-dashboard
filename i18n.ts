import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { LocalePrefix, Pathnames } from 'next-intl/routing';

export const locales = ['en', 'es'] as const;
export const localePrefix: LocalePrefix<typeof locales> = 'always';
export const defaultLocale = 'es' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});

export function localize(key: string, locale: string) {
    const messages = require(`./messages/${locale}.json`);
    const keys = key.split('.');
    return keys.reduce((acc, part) => acc && acc[part], messages);
}

export const translations = {
    'navbar': 'home.navbar',
    'header': 'home.header',
    'orders': 'orders.content',
    'products': 'products.content',
    'categories': 'categories.content',
    'dashboard': 'dashboard.content',
    'sidebar': 'home.sidebar',
    'dialog': 'home.dialog'
}

export const pathnames: Pathnames<typeof locales> = {
    '/': '/',
};