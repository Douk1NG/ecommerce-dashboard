/**
 * Translation Types Module
 * 
 * Exports type-safe translation utilities for use throughout the application.
 * These types are auto-generated from translation JSON files.
 * 
 * @example
 * ```typescript
 * import { TranslationKey } from '@/i18n/types';
 * import { useTranslations } from 'next-intl';
 * 
 * function MyComponent() {
 *   const t = useTranslations();
 *   // Type-safe translation key access with autocomplete
 *   const title: string = t('products.layout.title');
 *   return <h1>{title}</h1>;
 * }
 * ```
 */

export type {
  TranslationKey,
  TranslationKeys,
  NestedKeyOf
} from './translations';

export {
  TRANSLATION_KEY_COUNT,
  ALL_TRANSLATION_KEYS
} from './translations';
