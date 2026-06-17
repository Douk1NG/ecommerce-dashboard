# Translation Type Generator Scripts

## Overview

This directory contains scripts for generating TypeScript type definitions from translation JSON files, ensuring type-safe translation key access throughout the application.

## Files

### `generate-translation-types.ts`

Main script that:
- Parses translation JSON files from all locales
- Validates that all locales have matching translation keys
- Generates TypeScript type definitions for compile-time validation
- Fails the build if translation keys are missing or inconsistent

**Usage:**
```bash
npm run generate:translation-types
```

**Functions:**
- `extractKeys(obj, prefix)`: Recursively extracts all translation keys from nested objects
- `validateTranslations(config)`: Validates that all locales have matching keys
- `generateTypes(config)`: Generates TypeScript type definitions

### `generate-translation-types.test.ts`

Comprehensive unit tests for the translation type generator:
- 24 passing tests
- 83.87% statement coverage
- Tests type generation, validation, and error handling

**Usage:**
```bash
# Run tests
npm test -- scripts/generate-translation-types.test.ts --run

# Run with coverage
npm test -- scripts/generate-translation-types.test.ts --run --coverage

# Watch mode
npm test -- scripts/generate-translation-types.test.ts
```

### `TEST_SUMMARY.md`

Detailed documentation of test coverage and validation results.

## Configuration

The generator is configured in `generate-translation-types.ts`:

```typescript
const config: GeneratorConfig = {
  sourceFiles: [
    path.join(process.cwd(), 'i18n/messages/en.json'),
    path.join(process.cwd(), 'i18n/messages/es.json')
  ],
  outputPath: path.join(process.cwd(), 'i18n/types/translations.d.ts'),
  locales: ['en', 'es']
};
```

## Generated Output

The script generates `i18n/types/translations.d.ts` with:

```typescript
export type TranslationKey =
  | 'products.layout.title'
  | 'products.scheme.name'
  | 'categories.layout.title'
  // ... all translation keys

export type TranslationKeys = {
  [K in TranslationKey]: K;
};

export const TRANSLATION_KEY_COUNT = 161;

export const ALL_TRANSLATION_KEYS: readonly TranslationKey[] = [
  'products.layout.title',
  'products.scheme.name',
  // ... all keys
] as const;
```

## Integration with Build Process

The script is integrated into the build process via `package.json`:

```json
{
  "scripts": {
    "build": "npm run generate:translation-types && next build",
    "generate:translation-types": "tsx scripts/generate-translation-types.ts"
  }
}
```

This ensures:
1. Translation types are generated before every build
2. Build fails if translation keys are missing or inconsistent
3. Developers get compile-time validation of translation keys

## Validation Rules

The validator checks:

1. **Missing Keys (Errors)**: If a key exists in the base locale but not in another locale
2. **Extra Keys (Warnings)**: If a key exists in a locale but not in the base locale
3. **Malformed JSON (Errors)**: If any translation file contains invalid JSON
4. **Missing Files (Errors)**: If any expected translation file is not found

## Requirements

Implements requirements from the Architecture Modernization spec:
- **Requirement 1.2**: Generate TypeScript types from translation JSON files
- **Requirement 1.3**: Validate translation keys exist at compile time
- **Requirement 1.5**: Fail build if translation keys are missing

## Testing

The test suite validates:
- ✅ Type generation from sample translation files
- ✅ Validation of missing keys across locales
- ✅ Error handling for malformed JSON
- ✅ Edge cases (empty files, nested keys, etc.)
- ✅ File system operations (directory creation, file overwriting)

See `TEST_SUMMARY.md` for detailed test coverage information.
