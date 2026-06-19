
import { getRequestConfig } from "next-intl/server";
import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;
    // Ensure the locale is one of the supported locales, otherwise fall back to default
    const resolvedLocale = typeof locale === "string" && routing.locales.includes(locale)
        ? locale
        : routing.defaultLocale;
    return {
        locale: resolvedLocale,
        messages: (await import(`./messages/${resolvedLocale}.json`)).default,
    };

});

export function localize(key: string, locale: string) {
    const messages = require(`./messages/${locale}.json`);
    const keys = key.split('.');
    return keys.reduce((acc, part) => acc && acc[part], messages);
}