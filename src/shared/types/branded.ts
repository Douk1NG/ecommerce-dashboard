/**
 * Branded Types Utility
 * 
 * Provides type-safe branded types for domain-specific identifiers.
 * Branded types prevent mixing different ID types at compile time.
 * 
 * @example
 * ```typescript
 * type ProductId = Brand<number, 'ProductId'>;
 * type CategoryId = Brand<number, 'CategoryId'>;
 * 
 * const productId = ProductId(123);
 * const categoryId = CategoryId(456);
 * 
 * // Type error: Cannot assign CategoryId to ProductId
 * const invalid: ProductId = categoryId;
 * ```
 * 
 * Validates Requirement 4.6: Define branded types for domain-specific identifiers
 */

/**
 * Brand type that adds a unique symbol to a base type
 * to create a distinct type at compile time.
 * 
 * @template K - The base type to brand
 * @template T - The brand identifier (unique string literal)
 */
export type Brand<K, T extends string> = K & { readonly __brand: T };

/**
 * Utility type to extract the base type from a branded type
 * 
 * @template T - The branded type
 */
export type Unbrand<T> = T extends Brand<infer K, string> ? K : T;

/**
 * Type guard to check if a value is a valid branded type
 * 
 * @template K - The base type
 * @template T - The brand identifier
 */
export function isBranded<K, T extends string>(
  value: unknown,
  validator: (val: unknown) => val is K
): value is Brand<K, T> {
  return validator(value);
}

// Domain-specific branded types

/**
 * Branded type for Product IDs
 */
export type ProductId = Brand<number, 'ProductId'>;

/**
 * Constructor function for ProductId
 * 
 * @param id - The numeric product ID
 * @returns A branded ProductId
 */
export const ProductId = (id: number): ProductId => id as ProductId;

/**
 * Branded type for Category IDs
 */
export type CategoryId = Brand<number, 'CategoryId'>;

/**
 * Constructor function for CategoryId
 * 
 * @param id - The numeric category ID
 * @returns A branded CategoryId
 */
export const CategoryId = (id: number): CategoryId => id as CategoryId;

/**
 * Branded type for Filter IDs
 */
export type FilterId = Brand<number, 'FilterId'>;

/**
 * Constructor function for FilterId
 * 
 * @param id - The numeric filter ID
 * @returns A branded FilterId
 */
export const FilterId = (id: number): FilterId => id as FilterId;

/**
 * Branded type for User IDs
 */
export type UserId = Brand<string, 'UserId'>;

/**
 * Constructor function for UserId
 * 
 * @param id - The string user ID
 * @returns A branded UserId
 */
export const UserId = (id: string): UserId => id as UserId;

/**
 * Branded type for Session tokens
 */
export type SessionToken = Brand<string, 'SessionToken'>;

/**
 * Constructor function for SessionToken
 * 
 * @param token - The session token string
 * @returns A branded SessionToken
 */
export const SessionToken = (token: string): SessionToken => token as SessionToken;

/**
 * Branded type for Email addresses
 */
export type Email = Brand<string, 'Email'>;

/**
 * Constructor function for Email with basic validation
 * 
 * @param email - The email string
 * @returns A branded Email
 * @throws Error if email format is invalid
 */
export const Email = (email: string): Email => {
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }
  return email as Email;
};

/**
 * Type guard for ProductId
 */
export function isProductId(value: unknown): value is ProductId {
  return typeof value === 'number' && value > 0;
}

/**
 * Type guard for CategoryId
 */
export function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === 'number' && value > 0;
}

/**
 * Type guard for FilterId
 */
export function isFilterId(value: unknown): value is FilterId {
  return typeof value === 'number' && value > 0;
}

/**
 * Type guard for UserId
 */
export function isUserId(value: unknown): value is UserId {
  return typeof value === 'string' && value.length > 0;
}

/**
 * Type guard for SessionToken
 */
export function isSessionToken(value: unknown): value is SessionToken {
  return typeof value === 'string' && value.length > 0;
}

/**
 * Type guard for Email
 */
export function isEmail(value: unknown): value is Email {
  return typeof value === 'string' && value.includes('@');
}
