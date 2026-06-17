/**
 * Application Constants
 * 
 * Centralized location for all application-wide constants.
 * This file consolidates constants from the legacy /constants directory
 * and provides a single source of truth for configuration values.
 * 
 * Note: Translation keys should be accessed directly through next-intl's
 * useTranslations hook. This file contains only non-translation constants.
 */

/**
 * Application routes and navigation paths
 */
export const ROUTES = {
  /** Authentication routes */
  auth: {
    login: '/login',
    logout: '/logout',
  },
  
  /** Main application routes */
  app: {
    dashboard: '/dashboard',
    products: '/products',
    categories: '/categories',
    filters: '/filters',
    inventory: '/inventory',
  },
  
  /** API routes for creating new entities */
  new: {
    product: '/products/new',
    category: '/categories/new',
    filter: '/filters/new',
  },
} as const;

/**
 * Translation namespaces for next-intl
 * 
 * These correspond to the JSON files in /i18n/messages/
 */
export const TRANSLATION_NAMESPACES = {
  products: 'products',
  categories: 'categories',
  filters: 'filters',
  inventory: 'inventory',
  layout: 'layout',
  navbar: 'navbar',
  sidebar: 'sidebar',
  table: 'table',
  login: 'login',
  outflow: 'outflow',
} as const;

/**
 * Database field keys for entities
 * 
 * These represent the actual field names used in the database
 * and API responses. Use these for type-safe field access.
 */
export const ENTITY_FIELDS = {
  /** Product entity fields */
  product: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    featuredProduct: 'featured_product',
    categories: 'categories',
    active: 'active',
    images: 'images',
    mainImage: 'main_image',
    relatedImages: 'related_images',
    filterCombinations: 'filter_combinations',
    filters: 'filters',
  },
  
  /** Category entity fields */
  category: {
    id: 'id',
    name: 'name',
    description: 'description',
    featuredCategory: 'featured_category',
    filters: 'filters',
    image: 'image',
    parentId: 'parent_id',
    subcategories: 'subcategories',
  },
  
  /** Filter entity fields */
  filter: {
    id: 'id',
    name: 'name',
    filters: 'filters',
  },
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  /** Default page size for data tables */
  defaultPageSize: 10,
  
  /** Available page size options */
  pageSizeOptions: [10, 25, 50, 100] as const,
  
  /** Default page index (0-based) */
  defaultPageIndex: 0,
} as const;

/**
 * Form validation constants
 */
export const VALIDATION = {
  /** String length limits */
  string: {
    minNameLength: 1,
    maxNameLength: 255,
    minDescriptionLength: 1,
    maxDescriptionLength: 5000,
  },
  
  /** Number limits */
  number: {
    minPrice: 0.01,
    maxPrice: 999999.99,
  },
  
  /** File upload limits */
  file: {
    maxImageSize: 5 * 1024 * 1024, // 5MB in bytes
    maxImagesPerProduct: 10,
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'] as const,
  },
} as const;

/**
 * API configuration constants
 */
export const API = {
  /** Request timeout in milliseconds */
  timeout: 30000,
  
  /** Retry configuration */
  retry: {
    maxAttempts: 3,
    initialDelay: 1000,
    maxDelay: 30000,
  },
  
  /** Cache configuration */
  cache: {
    defaultTTL: 300, // 5 minutes in seconds
    staleTime: 5 * 60 * 1000, // 5 minutes in milliseconds
    gcTime: 10 * 60 * 1000, // 10 minutes in milliseconds
  },
} as const;

/**
 * UI constants
 */
export const UI = {
  /** Toast notification duration in milliseconds */
  toastDuration: 5000,
  
  /** Debounce delay for search inputs in milliseconds */
  searchDebounceDelay: 300,
  
  /** Animation durations in milliseconds */
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
} as const;

/**
 * Date and time formats
 */
export const DATE_FORMATS = {
  /** Display format for dates (e.g., "Jan 15, 2024") */
  display: 'MMM dd, yyyy',
  
  /** ISO format for API communication */
  iso: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  
  /** Short date format (e.g., "01/15/2024") */
  short: 'MM/dd/yyyy',
  
  /** Long date format (e.g., "January 15, 2024") */
  long: 'MMMM dd, yyyy',
} as const;

/**
 * Feature flags for conditional functionality
 * 
 * Use these to enable/disable features across the application
 */
export const FEATURE_FLAGS = {
  /** Enable optimistic UI updates */
  enableOptimisticUpdates: true,
  
  /** Enable error monitoring service integration */
  enableErrorMonitoring: false,
  
  /** Enable debug logging in development */
  enableDebugLogging: process.env.NODE_ENV === 'development',
} as const;

/**
 * Type exports for constants
 */
export type Route = typeof ROUTES;
export type TranslationNamespace = typeof TRANSLATION_NAMESPACES;
export type EntityFields = typeof ENTITY_FIELDS;
export type PaginationConfig = typeof PAGINATION;
export type ValidationConfig = typeof VALIDATION;
export type APIConfig = typeof API;
export type UIConfig = typeof UI;
export type DateFormats = typeof DATE_FORMATS;
export type FeatureFlags = typeof FEATURE_FLAGS;
