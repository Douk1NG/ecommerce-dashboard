import { useTranslations } from "next-intl";
import type { IntlTextProps } from "@/src/shared/types/intl";

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
        const translationParams = params as IntlTextProps['params'];
        return translationParams ? t(valueOrKeys, { params: translationParams }) : t(valueOrKeys);
    }

    // Handle multiple translations
    const translations: Record<string, string> = {};

    Object.entries(valueOrKeys).forEach(([key, translationKey]) => {
        if (!translationKey) {
            translations[key] = '';
        } else {
            const keyParams = (params as TranslationParams)?.[key];
            translations[key] = keyParams ? t(translationKey, { params: keyParams }) : t(translationKey);
        }
    });

    return translations;
}