import { useTranslations } from "next-intl";
import type { IntlTextProps } from "@/types/intl";

type TranslationKeys = Record<string, string>;
type TranslationParams = Record<string, IntlTextProps['params']>;

export function useIntlText(
    valueOrKeys?: string | TranslationKeys,
    params?: IntlTextProps['params'] | TranslationParams
) {
    const t = useTranslations();

    if (!valueOrKeys) return '';

    // Handle single translation (backward compatibility)
    if (typeof valueOrKeys === 'string') {
        return t(valueOrKeys, { params: params as IntlTextProps['params'] });
    }

    // Handle multiple translations
    const translations: Record<string, string> = {};

    Object.entries(valueOrKeys).forEach(([key, translationKey]) => {
        if (!translationKey) {
            translations[key] = '';
        } else {
            translations[key] = t(translationKey, {
                params: (params as TranslationParams)?.[key]
            });
        }
    });

    return translations;
}