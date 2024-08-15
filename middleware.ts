import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "./i18n";

export default createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
    localePrefix: localePrefix
});

export const config = {
    matcher: [
        "/((?!api|static|.*\\..*|_next).*)",
        "/(es|en)/:path*"
    ]
};