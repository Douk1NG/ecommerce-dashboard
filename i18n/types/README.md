# Translation Types

This directory contains auto-generated TypeScript type definitions for translation keys.

## Overview

The translation type system provides compile-time validation of translation keys, ensuring that:
- All translation keys exist in the translation files
- All locales have the same set of keys
- Typos in translation keys are caught at compile time
- IDE autocomplete works for translation keys

## Generated Files

- `translations.d.ts` - Auto-generated type definitions (DO NOT EDIT MANUALLY)
- `index.ts` - Public API exports for the translation types

## Usage

### Basic Usage with next-intl

```typescript
import { useTranslations } from 'next-intl';
import type { TranslationKey } from '@/i18n/types';

function MyComponent() {
  const t = useTranslations();
  
  // Type-safe translation key access with autocomplete
  const title = t('products.layout.title' as TranslationKey);
  
  return <h1>{title}</h1>;
}
```

### Using Translation Key Constants

```typescript
import { ALL_TRANSLATION_KEYS, TRANSLATION_KEY_COUNT } from '@/i18n/types';

// Get all translation keys
console.log(`Total keys: ${TRANSLATION_KEY_COUNT}`);

// Iterate over all keys
ALL_TRANSLATION_KEYS.forEach(key => {
  console.log(key);
});
```

### Type-Safe Translation Key Validation

```typescript
import type { TranslationKey } from '@/i18n/types';

function isValidTranslationKey(key: string): key is TranslationKey {
  return ALL_TRANSLATION_KEYS.includes(key as TranslationKey);
}

// Usage
const userInput = 'products.layout.title';
if (isValidTranslationKey(userInput)) {
  // TypeScript knows userInput is a valid TranslationKey
  const translation = t(userInput);
}
```

## Regenerating Types

The translation types are automatically generated during the build process. To manually regenerate them:

```bash
npm run generate:translation-types
```

This will:
1. Parse all translation JSON files (en.json, es.json)
2. Validate that all locales have the same keys
3. Generate TypeScript type definitions
4. Write the types to `i18n/types/translations.d.ts`

## Build Integration

The type generation is integrated into the build process:

```json
{
  "scripts": {
    "build": "npm run generate:translation-types && next build",
    "generate:translation-types": "tsx scripts/generate-translation-types.ts"
  }
}
```

This ensures that:
- Types are always up-to-date before building
- Build fails if translation keys are missing or inconsistent
- No manual intervention is required

## Validation

The generator validates:

1. **File Existence**: All locale files must exist
2. **JSON Validity**: All files must be valid JSON
3. **Key Consistency**: All locales must have the same keys
4. **No Missing Keys**: Reports missing keys in any locale
5. **Extra Keys Warning**: Warns about extra keys in any locale

### Example Validation Output

```
🔍 Validating translation files...
✅ Validation passed

📝 Generating TypeScript types...
✅ Generated translation types successfully
   Output: C:\...\i18n\types\translations.d.ts
   Keys: 133
```

### Validation Errors

If validation fails, the build will fail with detailed error messages:

```
❌ Validation failed:
   Missing keys in es: products.new.title, categories.new.description
   Extra keys in es: products.old.title
```

## Requirements Satisfied

This implementation satisfies the following requirements from the Architecture Modernization spec:

- **Requirement 1.2**: Generate TypeScript types from translation JSON files
- **Requirement 1.3**: Validate translation keys exist at compile time
- **Requirement 1.5**: Build process fails if any translation key is missing

## File Structure

```
i18n/
├── messages/
│   ├── en.json          # English translations
│   └── es.json          # Spanish translations
├── types/
│   ├── translations.d.ts # Generated types (auto-generated)
│   ├── index.ts         # Public API exports
│   └── README.md        # This file
├── request.ts
└── routing.ts
```

## Adding New Translation Keys

1. Add the key to all locale files (en.json, es.json)
2. Run `npm run generate:translation-types`
3. The new key will be available in the `TranslationKey` type
4. TypeScript will validate usage across the codebase

## Troubleshooting

### Build fails with "Missing translation file"

Ensure all locale files exist in `i18n/messages/`:
- `i18n/messages/en.json`
- `i18n/messages/es.json`

### Build fails with "Missing keys in locale"

All locales must have the same keys. Check the error message for which keys are missing and add them to the appropriate locale file.

### Types not updating

Run the generator manually:
```bash
npm run generate:translation-types
```

If the issue persists, check that the output file is not read-only and that you have write permissions.
