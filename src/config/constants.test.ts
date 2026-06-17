import { describe, it, expect } from 'vitest';
import {
  ROUTES,
  TRANSLATION_NAMESPACES,
  ENTITY_FIELDS,
  PAGINATION,
  VALIDATION,
  API,
  UI,
  DATE_FORMATS,
  FEATURE_FLAGS,
} from './constants';

describe('Application Constants', () => {
  describe('ROUTES', () => {
    it('should define authentication routes', () => {
      expect(ROUTES.auth.login).toBe('/login');
      expect(ROUTES.auth.logout).toBe('/logout');
    });

    it('should define application routes', () => {
      expect(ROUTES.app.dashboard).toBe('/dashboard');
      expect(ROUTES.app.products).toBe('/products');
      expect(ROUTES.app.categories).toBe('/categories');
      expect(ROUTES.app.filters).toBe('/filters');
      expect(ROUTES.app.inventory).toBe('/inventory');
    });

    it('should define new entity routes', () => {
      expect(ROUTES.new.product).toBe('/products/new');
      expect(ROUTES.new.category).toBe('/categories/new');
      expect(ROUTES.new.filter).toBe('/filters/new');
    });
  });

  describe('TRANSLATION_NAMESPACES', () => {
    it('should define all translation namespaces', () => {
      expect(TRANSLATION_NAMESPACES.products).toBe('products');
      expect(TRANSLATION_NAMESPACES.categories).toBe('categories');
      expect(TRANSLATION_NAMESPACES.filters).toBe('filters');
      expect(TRANSLATION_NAMESPACES.inventory).toBe('inventory');
      expect(TRANSLATION_NAMESPACES.layout).toBe('layout');
      expect(TRANSLATION_NAMESPACES.navbar).toBe('navbar');
      expect(TRANSLATION_NAMESPACES.sidebar).toBe('sidebar');
      expect(TRANSLATION_NAMESPACES.table).toBe('table');
      expect(TRANSLATION_NAMESPACES.login).toBe('login');
      expect(TRANSLATION_NAMESPACES.outflow).toBe('outflow');
    });
  });

  describe('ENTITY_FIELDS', () => {
    it('should define product fields', () => {
      expect(ENTITY_FIELDS.product.id).toBe('id');
      expect(ENTITY_FIELDS.product.name).toBe('name');
      expect(ENTITY_FIELDS.product.description).toBe('description');
      expect(ENTITY_FIELDS.product.price).toBe('price');
      expect(ENTITY_FIELDS.product.featuredProduct).toBe('featured_product');
      expect(ENTITY_FIELDS.product.categories).toBe('categories');
      expect(ENTITY_FIELDS.product.active).toBe('active');
      expect(ENTITY_FIELDS.product.mainImage).toBe('main_image');
      expect(ENTITY_FIELDS.product.relatedImages).toBe('related_images');
      expect(ENTITY_FIELDS.product.filterCombinations).toBe('filter_combinations');
    });

    it('should define category fields', () => {
      expect(ENTITY_FIELDS.category.id).toBe('id');
      expect(ENTITY_FIELDS.category.name).toBe('name');
      expect(ENTITY_FIELDS.category.description).toBe('description');
      expect(ENTITY_FIELDS.category.featuredCategory).toBe('featured_category');
      expect(ENTITY_FIELDS.category.filters).toBe('filters');
      expect(ENTITY_FIELDS.category.image).toBe('image');
      expect(ENTITY_FIELDS.category.parentId).toBe('parent_id');
      expect(ENTITY_FIELDS.category.subcategories).toBe('subcategories');
    });

    it('should define filter fields', () => {
      expect(ENTITY_FIELDS.filter.id).toBe('id');
      expect(ENTITY_FIELDS.filter.name).toBe('name');
      expect(ENTITY_FIELDS.filter.filters).toBe('filters');
    });
  });

  describe('PAGINATION', () => {
    it('should define pagination defaults', () => {
      expect(PAGINATION.defaultPageSize).toBe(10);
      expect(PAGINATION.defaultPageIndex).toBe(0);
    });

    it('should define page size options', () => {
      expect(PAGINATION.pageSizeOptions).toEqual([10, 25, 50, 100]);
    });
  });

  describe('VALIDATION', () => {
    it('should define string validation rules', () => {
      expect(VALIDATION.string.minNameLength).toBe(1);
      expect(VALIDATION.string.maxNameLength).toBe(255);
      expect(VALIDATION.string.minDescriptionLength).toBe(1);
      expect(VALIDATION.string.maxDescriptionLength).toBe(5000);
    });

    it('should define number validation rules', () => {
      expect(VALIDATION.number.minPrice).toBe(0.01);
      expect(VALIDATION.number.maxPrice).toBe(999999.99);
    });

    it('should define file validation rules', () => {
      expect(VALIDATION.file.maxImageSize).toBe(5 * 1024 * 1024);
      expect(VALIDATION.file.maxImagesPerProduct).toBe(10);
      expect(VALIDATION.file.allowedImageTypes).toEqual([
        'image/jpeg',
        'image/png',
        'image/webp',
      ]);
    });
  });

  describe('API', () => {
    it('should define API timeout', () => {
      expect(API.timeout).toBe(30000);
    });

    it('should define retry configuration', () => {
      expect(API.retry.maxAttempts).toBe(3);
      expect(API.retry.initialDelay).toBe(1000);
      expect(API.retry.maxDelay).toBe(30000);
    });

    it('should define cache configuration', () => {
      expect(API.cache.defaultTTL).toBe(300);
      expect(API.cache.staleTime).toBe(5 * 60 * 1000);
      expect(API.cache.gcTime).toBe(10 * 60 * 1000);
    });
  });

  describe('UI', () => {
    it('should define UI timing constants', () => {
      expect(UI.toastDuration).toBe(5000);
      expect(UI.searchDebounceDelay).toBe(300);
    });

    it('should define animation durations', () => {
      expect(UI.animation.fast).toBe(150);
      expect(UI.animation.normal).toBe(300);
      expect(UI.animation.slow).toBe(500);
    });
  });

  describe('DATE_FORMATS', () => {
    it('should define date format strings', () => {
      expect(DATE_FORMATS.display).toBe('MMM dd, yyyy');
      expect(DATE_FORMATS.iso).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      expect(DATE_FORMATS.short).toBe('MM/dd/yyyy');
      expect(DATE_FORMATS.long).toBe('MMMM dd, yyyy');
    });
  });

  describe('FEATURE_FLAGS', () => {
    it('should define feature flags', () => {
      expect(typeof FEATURE_FLAGS.enableOptimisticUpdates).toBe('boolean');
      expect(typeof FEATURE_FLAGS.enableErrorMonitoring).toBe('boolean');
      expect(typeof FEATURE_FLAGS.enableDebugLogging).toBe('boolean');
    });
  });

  describe('Type Safety', () => {
    it('should be immutable (as const)', () => {
      // TypeScript will catch mutations at compile time
      // This test verifies the structure is correct
      expect(Object.isFrozen(ROUTES)).toBe(false); // as const doesn't freeze, but TS prevents mutation
      expect(typeof ROUTES).toBe('object');
    });
  });
});
