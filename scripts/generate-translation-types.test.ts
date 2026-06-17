/**
 * Unit tests for Translation Type Generator
 * 
 * Tests type generation from sample translation files, validation of missing keys
 * across locales, and error handling for malformed JSON.
 * 
 * Requirements: 1.5
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { extractKeys, validateTranslations, generateTypes } from './generate-translation-types';
import type { GeneratorConfig, ValidationResult } from './generate-translation-types';

// Test fixtures directory
const TEST_DIR = path.join(__dirname, '__test-fixtures__');

describe('extractKeys', () => {
  it('should extract keys from flat object', () => {
    const obj = {
      hello: 'Hello',
      world: 'World',
      goodbye: 'Goodbye'
    };

    const keys = extractKeys(obj);

    expect(keys).toEqual(['hello', 'world', 'goodbye']);
  });

  it('should extract keys from nested object', () => {
    const obj = {
      products: {
        title: 'Products',
        description: 'Product list'
      },
      categories: {
        title: 'Categories'
      }
    };

    const keys = extractKeys(obj);

    expect(keys).toEqual([
      'products.title',
      'products.description',
      'categories.title'
    ]);
  });

  it('should extract keys from deeply nested object', () => {
    const obj = {
      app: {
        header: {
          nav: {
            home: 'Home',
            about: 'About'
          }
        }
      }
    };

    const keys = extractKeys(obj);

    expect(keys).toEqual([
      'app.header.nav.home',
      'app.header.nav.about'
    ]);
  });

  it('should handle empty object', () => {
    const obj = {};

    const keys = extractKeys(obj);

    expect(keys).toEqual([]);
  });

  it('should handle object with array values', () => {
    const obj = {
      items: ['item1', 'item2'],
      name: 'Test'
    };

    const keys = extractKeys(obj);

    expect(keys).toEqual(['items', 'name']);
  });

  it('should handle object with null values', () => {
    const obj = {
      value: null,
      name: 'Test'
    };

    const keys = extractKeys(obj);

    expect(keys).toEqual(['value', 'name']);
  });

  it('should handle object with mixed types', () => {
    const obj = {
      string: 'text',
      number: 42,
      boolean: true,
      nested: {
        key: 'value'
      }
    };

    const keys = extractKeys(obj);

    expect(keys).toEqual(['string', 'number', 'boolean', 'nested.key']);
  });
});

describe('validateTranslations', () => {
  beforeEach(() => {
    // Create test fixtures directory
    if (!fs.existsSync(TEST_DIR)) {
      fs.mkdirSync(TEST_DIR, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test fixtures
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  it('should validate matching translation keys across locales', () => {
    // Create test translation files
    const enTranslations = {
      products: {
        title: 'Products',
        description: 'Product list'
      },
      categories: {
        title: 'Categories'
      }
    };

    const esTranslations = {
      products: {
        title: 'Productos',
        description: 'Lista de productos'
      },
      categories: {
        title: 'Categorías'
      }
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(enTranslations, null, 2)
    );
    fs.writeFileSync(
      path.join(TEST_DIR, 'es.json'),
      JSON.stringify(esTranslations, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [
        path.join(TEST_DIR, 'en.json'),
        path.join(TEST_DIR, 'es.json')
      ],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en', 'es']
    };

    const result = validateTranslations(config);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([]);
  });

  it('should detect missing keys in secondary locale', () => {
    const enTranslations = {
      products: {
        title: 'Products',
        description: 'Product list'
      },
      categories: {
        title: 'Categories'
      }
    };

    const esTranslations = {
      products: {
        title: 'Productos'
        // Missing: products.description
      },
      categories: {
        title: 'Categorías'
      }
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(enTranslations, null, 2)
    );
    fs.writeFileSync(
      path.join(TEST_DIR, 'es.json'),
      JSON.stringify(esTranslations, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [
        path.join(TEST_DIR, 'en.json'),
        path.join(TEST_DIR, 'es.json')
      ],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en', 'es']
    };

    const result = validateTranslations(config);

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain('Missing keys in es');
    expect(result.errors[0]).toContain('products.description');
  });

  it('should detect extra keys in secondary locale', () => {
    const enTranslations = {
      products: {
        title: 'Products'
      }
    };

    const esTranslations = {
      products: {
        title: 'Productos',
        description: 'Lista de productos' // Extra key
      }
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(enTranslations, null, 2)
    );
    fs.writeFileSync(
      path.join(TEST_DIR, 'es.json'),
      JSON.stringify(esTranslations, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [
        path.join(TEST_DIR, 'en.json'),
        path.join(TEST_DIR, 'es.json')
      ],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en', 'es']
    };

    const result = validateTranslations(config);

    expect(result.valid).toBe(true); // Extra keys are warnings, not errors
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]).toContain('Extra keys in es');
    expect(result.warnings[0]).toContain('products.description');
  });

  it('should handle malformed JSON', () => {
    // Create invalid JSON file
    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      '{ invalid json }'
    );
    fs.writeFileSync(
      path.join(TEST_DIR, 'es.json'),
      JSON.stringify({ test: 'test' }, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [
        path.join(TEST_DIR, 'en.json'),
        path.join(TEST_DIR, 'es.json')
      ],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en', 'es']
    };

    const result = validateTranslations(config);

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain('Invalid JSON');
    expect(result.errors[0]).toContain('en.json');
  });

  it('should handle missing translation file', () => {
    const config: GeneratorConfig = {
      sourceFiles: [
        path.join(TEST_DIR, 'en.json'),
        path.join(TEST_DIR, 'es.json')
      ],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en', 'es']
    };

    const result = validateTranslations(config);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain('Translation file not found');
  });

  it('should handle missing locale in source files', () => {
    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify({ test: 'test' }, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [
        path.join(TEST_DIR, 'en.json')
      ],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en', 'es'] // es is missing
    };

    const result = validateTranslations(config);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing translation file for locale: es');
  });

  it('should detect multiple missing keys', () => {
    const enTranslations = {
      products: {
        title: 'Products',
        description: 'Product list',
        price: 'Price'
      }
    };

    const esTranslations = {
      products: {
        title: 'Productos'
        // Missing: description and price
      }
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(enTranslations, null, 2)
    );
    fs.writeFileSync(
      path.join(TEST_DIR, 'es.json'),
      JSON.stringify(esTranslations, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [
        path.join(TEST_DIR, 'en.json'),
        path.join(TEST_DIR, 'es.json')
      ],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en', 'es']
    };

    const result = validateTranslations(config);

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain('products.description');
    expect(result.errors[0]).toContain('products.price');
  });

  it('should handle empty translation files', () => {
    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify({}, null, 2)
    );
    fs.writeFileSync(
      path.join(TEST_DIR, 'es.json'),
      JSON.stringify({}, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [
        path.join(TEST_DIR, 'en.json'),
        path.join(TEST_DIR, 'es.json')
      ],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en', 'es']
    };

    const result = validateTranslations(config);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});

describe('generateTypes', () => {
  beforeEach(() => {
    // Create test fixtures directory
    if (!fs.existsSync(TEST_DIR)) {
      fs.mkdirSync(TEST_DIR, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test fixtures
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  it('should generate type definitions from translation file', () => {
    const translations = {
      products: {
        title: 'Products',
        description: 'Product list'
      },
      categories: {
        title: 'Categories'
      }
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(translations, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [path.join(TEST_DIR, 'en.json')],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en']
    };

    generateTypes(config);

    // Verify file was created
    expect(fs.existsSync(config.outputPath)).toBe(true);

    // Read generated file
    const content = fs.readFileSync(config.outputPath, 'utf-8');

    // Verify content includes all keys
    expect(content).toContain("| 'products.title'");
    expect(content).toContain("| 'products.description'");
    expect(content).toContain("| 'categories.title'");

    // Verify type definition structure
    expect(content).toContain('export type TranslationKey =');
    expect(content).toContain('export type TranslationKeys =');
    expect(content).toContain('export const TRANSLATION_KEY_COUNT =');
    expect(content).toContain('export const ALL_TRANSLATION_KEYS');

    // Verify key count
    expect(content).toContain('TRANSLATION_KEY_COUNT = 3');
  });

  it('should create output directory if it does not exist', () => {
    const translations = {
      test: 'Test'
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(translations, null, 2)
    );

    const outputDir = path.join(TEST_DIR, 'nested', 'output');
    const config: GeneratorConfig = {
      sourceFiles: [path.join(TEST_DIR, 'en.json')],
      outputPath: path.join(outputDir, 'translations.d.ts'),
      locales: ['en']
    };

    generateTypes(config);

    // Verify directory and file were created
    expect(fs.existsSync(outputDir)).toBe(true);
    expect(fs.existsSync(config.outputPath)).toBe(true);
  });

  it('should generate correct type for single key', () => {
    const translations = {
      hello: 'Hello'
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(translations, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [path.join(TEST_DIR, 'en.json')],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en']
    };

    generateTypes(config);

    const content = fs.readFileSync(config.outputPath, 'utf-8');

    expect(content).toContain("| 'hello'");
    expect(content).toContain('TRANSLATION_KEY_COUNT = 1');
  });

  it('should generate correct type for deeply nested keys', () => {
    const translations = {
      app: {
        header: {
          nav: {
            home: 'Home',
            about: 'About'
          }
        }
      }
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(translations, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [path.join(TEST_DIR, 'en.json')],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en']
    };

    generateTypes(config);

    const content = fs.readFileSync(config.outputPath, 'utf-8');

    expect(content).toContain("| 'app.header.nav.home'");
    expect(content).toContain("| 'app.header.nav.about'");
    expect(content).toContain('TRANSLATION_KEY_COUNT = 2');
  });

  it('should include all keys in ALL_TRANSLATION_KEYS array', () => {
    const translations = {
      key1: 'Value 1',
      key2: 'Value 2',
      key3: 'Value 3'
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(translations, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [path.join(TEST_DIR, 'en.json')],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en']
    };

    generateTypes(config);

    const content = fs.readFileSync(config.outputPath, 'utf-8');

    expect(content).toContain("'key1'");
    expect(content).toContain("'key2'");
    expect(content).toContain("'key3'");
    expect(content).toContain('ALL_TRANSLATION_KEYS');
  });

  it('should throw error if primary locale file is missing', () => {
    const config: GeneratorConfig = {
      sourceFiles: [path.join(TEST_DIR, 'en.json')],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en']
    };

    expect(() => generateTypes(config)).toThrow();
  });

  it('should throw error if primary locale file has invalid JSON', () => {
    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      '{ invalid json }'
    );

    const config: GeneratorConfig = {
      sourceFiles: [path.join(TEST_DIR, 'en.json')],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en']
    };

    expect(() => generateTypes(config)).toThrow();
  });

  it('should overwrite existing type definition file', () => {
    const translations = {
      test: 'Test'
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(translations, null, 2)
    );

    // Create existing file
    const outputPath = path.join(TEST_DIR, 'translations.d.ts');
    fs.writeFileSync(outputPath, 'old content');

    const config: GeneratorConfig = {
      sourceFiles: [path.join(TEST_DIR, 'en.json')],
      outputPath,
      locales: ['en']
    };

    generateTypes(config);

    const content = fs.readFileSync(outputPath, 'utf-8');

    expect(content).not.toContain('old content');
    expect(content).toContain('TranslationKey');
  });

  it('should include documentation comments in generated file', () => {
    const translations = {
      test: 'Test'
    };

    fs.writeFileSync(
      path.join(TEST_DIR, 'en.json'),
      JSON.stringify(translations, null, 2)
    );

    const config: GeneratorConfig = {
      sourceFiles: [path.join(TEST_DIR, 'en.json')],
      outputPath: path.join(TEST_DIR, 'translations.d.ts'),
      locales: ['en']
    };

    generateTypes(config);

    const content = fs.readFileSync(config.outputPath, 'utf-8');

    expect(content).toContain('Auto-generated translation types');
    expect(content).toContain('DO NOT EDIT MANUALLY');
    expect(content).toContain('All available translation keys');
  });
});
