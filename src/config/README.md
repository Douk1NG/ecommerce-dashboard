# Configuration Module

This directory contains centralized configuration for the application, replacing the legacy `/constants` directory.

## Files

### `env.ts`
Provides typed and validated access to environment variables.

**Usage:**
```typescript
import { env } from '@/src/config';

// Access API configuration
const apiUrl = env.api.url;
const apiToken = env.api.token;

// Check environment
if (env.isDevelopment) {
  console.log('Running in development mode');
}
```

**Benefits:**
- Type-safe environment variable access
- Runtime validation of required variables
- Clear error messages for missing configuration
- Centralized environment logic

### `constants.ts`
Contains all application-wide constants including routes, validation rules, and configuration values.

**Usage:**
```typescript
import { ROUTES, PAGINATION, VALIDATION, ENTITY_FIELDS } from '@/src/config';

// Use route constants
router.push(ROUTES.app.products);

// Use pagination defaults
const pageSize = PAGINATION.defaultPageSize;

// Use validation rules
const maxLength = VALIDATION.string.maxNameLength;

// Use entity field names
const productFields = ENTITY_FIELDS.product;
```

**Benefits:**
- Single source of truth for constants
- Type-safe constant access
- JSDoc documentation for all constants
- Organized by domain (routes, validation, UI, etc.)

## Migration from Legacy `/constants`

The legacy `/constants` directory contained duplicate translation keys that are now handled by next-intl directly. This new configuration module contains only non-translation constants.

### What Changed

**Before (Legacy):**
```typescript
// constants/products.ts
const PRODUCTS_CONSTANTS = {
  NAMESPACE: 'products',
  SCHEME: {
    NAME: 'scheme.name',
    DESCRIPTION: 'scheme.description',
    // ... more translation keys
  }
};
```

**After (New):**
```typescript
// Use next-intl directly for translations
import { useTranslations } from 'next-intl';

function ProductForm() {
  const t = useTranslations('products');
  return <label>{t('scheme.name')}</label>;
}

// Use centralized config for non-translation constants
import { ENTITY_FIELDS } from '@/src/config';

const fieldName = ENTITY_FIELDS.product.name; // 'name'
```

### Migration Guide

1. **Translation Keys**: Remove all translation key constants. Use `useTranslations()` hook directly with the translation key string.

2. **Route Paths**: Replace hardcoded paths with `ROUTES` constants:
   ```typescript
   // Before
   const link = '/products/new';
   
   // After
   import { ROUTES } from '@/src/config';
   const link = ROUTES.new.product;
   ```

3. **Entity Fields**: Replace string literals with `ENTITY_FIELDS`:
   ```typescript
   // Before
   const name = product['name'];
   
   // After
   import { ENTITY_FIELDS } from '@/src/config';
   const name = product[ENTITY_FIELDS.product.name];
   ```

4. **Environment Variables**: Replace `process.env` access with `env`:
   ```typescript
   // Before
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
   
   // After
   import { env } from '@/src/config';
   const apiUrl = env.api.url;
   ```

## Adding New Constants

When adding new constants:

1. **Determine the category**: Routes, validation, UI, API, etc.
2. **Add to the appropriate section** in `constants.ts`
3. **Add JSDoc comments** explaining the constant's purpose
4. **Use `as const`** for type safety
5. **Export types** if needed for external use

**Example:**
```typescript
/**
 * Email validation constants
 */
export const EMAIL = {
  /** Maximum length for email addresses */
  maxLength: 254,
  
  /** Regex pattern for email validation */
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export type EmailConfig = typeof EMAIL;
```

## Best Practices

1. **Never duplicate constants** - If a constant exists here, use it everywhere
2. **Don't store translation keys** - Use next-intl's type-safe translation system
3. **Use environment variables for secrets** - Never hardcode sensitive values
4. **Document all constants** - Add JSDoc comments explaining purpose and usage
5. **Group related constants** - Keep constants organized by domain
6. **Use TypeScript const assertions** - Add `as const` for literal types
7. **Export types** - Make constants type-safe for consumers

## Type Safety

All constants are exported with TypeScript types for compile-time safety:

```typescript
import type { Route, ValidationConfig, EntityFields } from '@/src/config';

// Type-safe function parameters
function navigateTo(route: Route['app'][keyof Route['app']]) {
  router.push(route);
}

// Type-safe configuration
function validateInput(config: ValidationConfig['string']) {
  // ...
}
```

## Testing

When testing code that uses these constants:

```typescript
import { ROUTES, PAGINATION } from '@/src/config';

describe('ProductList', () => {
  it('should use correct page size', () => {
    expect(component.pageSize).toBe(PAGINATION.defaultPageSize);
  });
  
  it('should navigate to correct route', () => {
    component.addNew();
    expect(router.push).toHaveBeenCalledWith(ROUTES.new.product);
  });
});
```

## Environment Variables

Required environment variables are documented in `.env.local.example`. The `env.ts` module validates all required variables at startup and provides helpful error messages if any are missing.

To add a new environment variable:

1. Add it to `.env.local.example` with a placeholder value
2. Update the `EnvironmentVariables` interface in `env.ts`
3. Add validation and access logic in the `env` object
4. Document the variable's purpose with JSDoc comments
