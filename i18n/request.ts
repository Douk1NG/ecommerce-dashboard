
import { getRequestConfig } from "next-intl/server";
import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }
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
    'navbar': 'layout.navbar',
    'header': 'layout.header',
    'dialog': 'layout.dialog',
    'orders': 'orders',
    'categories': 'categories',
    'filters': 'filters',
    'products': 'products'
}