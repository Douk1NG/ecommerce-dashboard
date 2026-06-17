/**
 * Translation Type Generator
 * 
 * This script generates TypeScript type definitions from translation JSON files.
 * It ensures type-safe translation key access at compile time.
 * 
 * Requirements: 1.2, 1.3, 1.5
 */

import fs from 'fs';
import path from 'path';

interface GeneratorConfig {
  sourceFiles: string[];
  outputPath: string;
  locales: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export type { GeneratorConfig };

/**
 * Recursively extracts all translation keys from a nested object
 */
export function extractKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...extractKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

/**
 * Validates that all locales have the same translation keys
 */
export function validateTranslations(config: GeneratorConfig): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  try {
    const keysByLocale = new Map<string, Set<string>>();

    // Extract keys from each locale file
    for (const locale of config.locales) {
      const filePath = config.sourceFiles.find(f => f.includes(`${locale}.json`));
      
      if (!filePath) {
        result.errors.push(`Missing translation file for locale: ${locale}`);
        result.valid = false;
        continue;
      }

      if (!fs.existsSync(filePath)) {
        result.errors.push(`Translation file not found: ${filePath}`);
        result.valid = false;
        continue;
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      let translations: Record<string, unknown>;

      try {
        translations = JSON.parse(content);
      } catch (error) {
        result.errors.push(`Invalid JSON in file: ${filePath}`);
        result.valid = false;
        continue;
      }

      const keys = extractKeys(translations);
      keysByLocale.set(locale, new Set(keys));
    }

    // Compare keys across locales
    if (keysByLocale.size > 1) {
      const locales = Array.from(keysByLocale.keys());
      const baseLocale = locales[0]!;
      const baseKeys = keysByLocale.get(baseLocale);

      if (!baseKeys) {
        result.errors.push(`No keys found for base locale: ${baseLocale}`);
        result.valid = false;
        return result;
      }

      for (let i = 1; i < locales.length; i++) {
        const locale = locales[i]!;
        const localeKeys = keysByLocale.get(locale);

        if (!localeKeys) continue;

        // Find missing keys
        const missingInLocale = Array.from(baseKeys).filter(k => !localeKeys.has(k));
        const extraInLocale = Array.from(localeKeys).filter(k => !baseKeys.has(k));

        if (missingInLocale.length > 0) {
          result.errors.push(
            `Missing keys in ${locale}: ${missingInLocale.join(', ')}`
          );
          result.valid = false;
        }

        if (extraInLocale.length > 0) {
          result.warnings.push(
            `Extra keys in ${locale}: ${extraInLocale.join(', ')}`
          );
        }
      }
    }

    return result;
  } catch (error) {
    result.errors.push(`Validation error: ${error instanceof Error ? error.message : String(error)}`);
    result.valid = false;
    return result;
  }
}

/**
 * Generates TypeScript type definitions from translation keys
 */
export function generateTypes(config: GeneratorConfig): void {
  try {
    // Use the first locale as the source of truth
    const primaryLocale = config.locales[0];
    const primaryFile = config.sourceFiles.find(f => f.includes(`${primaryLocale}.json`));

    if (!primaryFile) {
      throw new Error(`Primary locale file not found: ${primaryLocale}`);
    }

    const content = fs.readFileSync(primaryFile, 'utf-8');
    const translations = JSON.parse(content) as Record<string, unknown>;
    const keys = extractKeys(translations);

    // Generate type definition
    const typeDefinition = `/**
 * Auto-generated translation types
 * 
 * This file is generated from translation JSON files.
 * DO NOT EDIT MANUALLY - changes will be overwritten.
 * 
 * To regenerate, run: npm run generate:translation-types
 */

/**
 * All available translation keys in the application.
 * These keys are validated at compile time to ensure they exist.
 */
export type TranslationKey =
${keys.map(key => `  | '${key}'`).join('\n')};

/**
 * Type-safe translation key access
 * Use this type to ensure translation keys exist at compile time
 */
export type TranslationKeys = {
  [K in TranslationKey]: K;
};

/**
 * Helper type for nested translation objects
 */
export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? \`\${K}.\${NestedKeyOf<T[K]>}\`
          : K
        : never;
    }[keyof T]
  : never;

/**
 * Total number of translation keys
 */
export const TRANSLATION_KEY_COUNT = ${keys.length};

/**
 * All translation keys as a readonly array
 */
export const ALL_TRANSLATION_KEYS: readonly TranslationKey[] = [
${keys.map(key => `  '${key}'`).join(',\n')}
] as const;
`;

    // Ensure output directory exists
    const outputDir = path.dirname(config.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write type definition file
    fs.writeFileSync(config.outputPath, typeDefinition, 'utf-8');

    console.log(`✅ Generated translation types successfully`);
    console.log(`   Output: ${config.outputPath}`);
    console.log(`   Keys: ${keys.length}`);
  } catch (error) {
    console.error('❌ Error generating types:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

/**
 * Main execution function
 */
function main(): void {
  const config: GeneratorConfig = {
    sourceFiles: [
      path.join(process.cwd(), 'i18n/messages/en.json'),
      path.join(process.cwd(), 'i18n/messages/es.json')
    ],
    outputPath: path.join(process.cwd(), 'i18n/types/translations.d.ts'),
    locales: ['en', 'es']
  };

  console.log('🔍 Validating translation files...');
  
  const validation = validateTranslations(config);

  // Display warnings
  if (validation.warnings.length > 0) {
    console.warn('\n⚠️  Warnings:');
    validation.warnings.forEach(warning => console.warn(`   ${warning}`));
  }

  // Display errors and exit if validation failed
  if (!validation.valid) {
    console.error('\n❌ Validation failed:');
    validation.errors.forEach(error => console.error(`   ${error}`));
    process.exit(1);
  }

  console.log('✅ Validation passed');
  console.log('\n📝 Generating TypeScript types...');

  generateTypes(config);
}

// Run the generator
main();
