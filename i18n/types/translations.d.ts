/**
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
  | 'categories.descriptions.name'
  | 'categories.descriptions.subcategories'
  | 'categories.descriptions.filters'
  | 'categories.descriptions.featured_category'
  | 'categories.descriptions.image'
  | 'categories.descriptions.parent_id'
  | 'categories.descriptions.description'
  | 'categories.layout.add'
  | 'categories.layout.title'
  | 'categories.layout.description'
  | 'categories.metadata.title'
  | 'categories.metadata.description'
  | 'categories.scheme.name'
  | 'categories.scheme.subcategories'
  | 'categories.scheme.filters'
  | 'categories.scheme.featured_category'
  | 'categories.scheme.image'
  | 'categories.scheme.parent_id'
  | 'categories.scheme.description'
  | 'categories.sidebar.add'
  | 'categories.sidebar.edit'
  | 'categories.sidebar.detail'
  | 'filters.descriptions.name'
  | 'filters.descriptions.filters'
  | 'filters.layout.add'
  | 'filters.layout.title'
  | 'filters.layout.description'
  | 'filters.metadata.title'
  | 'filters.metadata.description'
  | 'filters.scheme.name'
  | 'filters.scheme.filters'
  | 'filters.sidebar.add'
  | 'filters.sidebar.edit'
  | 'filters.sidebar.detail'
  | 'inflow.descriptions.product'
  | 'inflow.descriptions.quantity'
  | 'inflow.descriptions.unit_price'
  | 'inflow.descriptions.total_price'
  | 'inflow.descriptions.reason'
  | 'inflow.descriptions.date'
  | 'inflow.descriptions.combinations'
  | 'inflow.layout.add'
  | 'inflow.layout.title'
  | 'inflow.layout.description'
  | 'inflow.metadata.title'
  | 'inflow.metadata.description'
  | 'inflow.scheme.product'
  | 'inflow.scheme.quantity'
  | 'inflow.scheme.unit_price'
  | 'inflow.scheme.total_price'
  | 'inflow.scheme.reason'
  | 'inflow.scheme.date'
  | 'inflow.scheme.combinations'
  | 'inflow.sidebar.add'
  | 'inflow.sidebar.edit'
  | 'inflow.sidebar.detail'
  | 'inventory.layout.title'
  | 'inventory.layout.description'
  | 'inventory.metadata.title'
  | 'inventory.metadata.description'
  | 'inventory.scheme.product'
  | 'inventory.scheme.quantity'
  | 'inventory.scheme.price'
  | 'layout.breadcrumb.default'
  | 'layout.confirm.close.cancel'
  | 'layout.confirm.close.accept'
  | 'layout.confirm.close.title'
  | 'layout.confirm.close.description'
  | 'layout.confirm.close.name'
  | 'layout.confirm.delete.cancel'
  | 'layout.confirm.delete.accept'
  | 'layout.confirm.delete.title'
  | 'layout.confirm.delete.description'
  | 'layout.confirm.delete.name'
  | 'layout.form.tagbox.add'
  | 'layout.form.tagbox.remove'
  | 'layout.form.tagbox.validation.unique.title'
  | 'layout.form.tagbox.validation.unique.description'
  | 'layout.form.upload.title'
  | 'layout.metadata.title'
  | 'layout.metadata.description'
  | 'layout.navbar.localeSwitcher.switch'
  | 'layout.navbar.localeSwitcher.langs.es'
  | 'layout.navbar.localeSwitcher.langs.en'
  | 'layout.navbar.navigation.dashboard'
  | 'layout.navbar.navigation.orders'
  | 'layout.navbar.navigation.products'
  | 'layout.navbar.navigation.categories'
  | 'layout.navbar.navigation.filters'
  | 'layout.navbar.navigation.inventory'
  | 'layout.navbar.navigation.outflow'
  | 'layout.navbar.navigation.inflow'
  | 'layout.navbar.navigation.settings'
  | 'layout.navbar.user.profile'
  | 'layout.navbar.user.logout'
  | 'layout.sidebar.edit'
  | 'layout.sidebar.close'
  | 'layout.sidebar.delete'
  | 'layout.sidebar.save'
  | 'layout.sidebar.return'
  | 'layout.table.search'
  | 'layout.table.empty'
  | 'layout.table.info'
  | 'layout.table.detail'
  | 'layout.table.select'
  | 'layout.table.deselect'
  | 'layout.table.sortAsc'
  | 'layout.table.sortDesc'
  | 'layout.table.hide'
  | 'layout.table.show'
  | 'layout.table.rowsPerPage'
  | 'layout.table.page'
  | 'layout.table.firstPage'
  | 'layout.table.previousPage'
  | 'layout.table.nextPage'
  | 'layout.table.lastPage'
  | 'layout.table.of'
  | 'layout.table.rowsSelected'
  | 'layout.table.viewOptions'
  | 'layout.table.toggleColumns'
  | 'layout.table.item'
  | 'login.metadata.title'
  | 'login.metadata.description'
  | 'orders.metadata.title'
  | 'orders.metadata.description'
  | 'products.descriptions.name'
  | 'products.descriptions.description'
  | 'products.descriptions.price'
  | 'products.descriptions.categories'
  | 'products.descriptions.images'
  | 'products.descriptions.active'
  | 'products.descriptions.featured_product'
  | 'products.descriptions.main_image'
  | 'products.descriptions.related_images'
  | 'products.descriptions.filter_combinations'
  | 'products.descriptions.filters'
  | 'products.layout.add'
  | 'products.layout.title'
  | 'products.layout.description'
  | 'products.metadata.title'
  | 'products.metadata.description'
  | 'products.scheme.name'
  | 'products.scheme.description'
  | 'products.scheme.price'
  | 'products.scheme.categories'
  | 'products.scheme.images'
  | 'products.scheme.active'
  | 'products.scheme.featured_product'
  | 'products.scheme.main_image'
  | 'products.scheme.related_images'
  | 'products.scheme.filter_combinations'
  | 'products.scheme.filters'
  | 'products.sidebar.add'
  | 'products.sidebar.edit'
  | 'products.sidebar.detail';

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
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

/**
 * Total number of translation keys
 */
export const TRANSLATION_KEY_COUNT = 155;

/**
 * All translation keys as a readonly array
 */
export const ALL_TRANSLATION_KEYS: readonly TranslationKey[] = [
  'categories.descriptions.name',
  'categories.descriptions.subcategories',
  'categories.descriptions.filters',
  'categories.descriptions.featured_category',
  'categories.descriptions.image',
  'categories.descriptions.parent_id',
  'categories.descriptions.description',
  'categories.layout.add',
  'categories.layout.title',
  'categories.layout.description',
  'categories.metadata.title',
  'categories.metadata.description',
  'categories.scheme.name',
  'categories.scheme.subcategories',
  'categories.scheme.filters',
  'categories.scheme.featured_category',
  'categories.scheme.image',
  'categories.scheme.parent_id',
  'categories.scheme.description',
  'categories.sidebar.add',
  'categories.sidebar.edit',
  'categories.sidebar.detail',
  'filters.descriptions.name',
  'filters.descriptions.filters',
  'filters.layout.add',
  'filters.layout.title',
  'filters.layout.description',
  'filters.metadata.title',
  'filters.metadata.description',
  'filters.scheme.name',
  'filters.scheme.filters',
  'filters.sidebar.add',
  'filters.sidebar.edit',
  'filters.sidebar.detail',
  'inflow.descriptions.product',
  'inflow.descriptions.quantity',
  'inflow.descriptions.unit_price',
  'inflow.descriptions.total_price',
  'inflow.descriptions.reason',
  'inflow.descriptions.date',
  'inflow.descriptions.combinations',
  'inflow.layout.add',
  'inflow.layout.title',
  'inflow.layout.description',
  'inflow.metadata.title',
  'inflow.metadata.description',
  'inflow.scheme.product',
  'inflow.scheme.quantity',
  'inflow.scheme.unit_price',
  'inflow.scheme.total_price',
  'inflow.scheme.reason',
  'inflow.scheme.date',
  'inflow.scheme.combinations',
  'inflow.sidebar.add',
  'inflow.sidebar.edit',
  'inflow.sidebar.detail',
  'inventory.layout.title',
  'inventory.layout.description',
  'inventory.metadata.title',
  'inventory.metadata.description',
  'inventory.scheme.product',
  'inventory.scheme.quantity',
  'inventory.scheme.price',
  'layout.breadcrumb.default',
  'layout.confirm.close.cancel',
  'layout.confirm.close.accept',
  'layout.confirm.close.title',
  'layout.confirm.close.description',
  'layout.confirm.close.name',
  'layout.confirm.delete.cancel',
  'layout.confirm.delete.accept',
  'layout.confirm.delete.title',
  'layout.confirm.delete.description',
  'layout.confirm.delete.name',
  'layout.form.tagbox.add',
  'layout.form.tagbox.remove',
  'layout.form.tagbox.validation.unique.title',
  'layout.form.tagbox.validation.unique.description',
  'layout.form.upload.title',
  'layout.metadata.title',
  'layout.metadata.description',
  'layout.navbar.localeSwitcher.switch',
  'layout.navbar.localeSwitcher.langs.es',
  'layout.navbar.localeSwitcher.langs.en',
  'layout.navbar.navigation.dashboard',
  'layout.navbar.navigation.orders',
  'layout.navbar.navigation.products',
  'layout.navbar.navigation.categories',
  'layout.navbar.navigation.filters',
  'layout.navbar.navigation.inventory',
  'layout.navbar.navigation.outflow',
  'layout.navbar.navigation.inflow',
  'layout.navbar.navigation.settings',
  'layout.navbar.user.profile',
  'layout.navbar.user.logout',
  'layout.sidebar.edit',
  'layout.sidebar.close',
  'layout.sidebar.delete',
  'layout.sidebar.save',
  'layout.sidebar.return',
  'layout.table.search',
  'layout.table.empty',
  'layout.table.info',
  'layout.table.detail',
  'layout.table.select',
  'layout.table.deselect',
  'layout.table.sortAsc',
  'layout.table.sortDesc',
  'layout.table.hide',
  'layout.table.show',
  'layout.table.rowsPerPage',
  'layout.table.page',
  'layout.table.firstPage',
  'layout.table.previousPage',
  'layout.table.nextPage',
  'layout.table.lastPage',
  'layout.table.of',
  'layout.table.rowsSelected',
  'layout.table.viewOptions',
  'layout.table.toggleColumns',
  'layout.table.item',
  'login.metadata.title',
  'login.metadata.description',
  'orders.metadata.title',
  'orders.metadata.description',
  'products.descriptions.name',
  'products.descriptions.description',
  'products.descriptions.price',
  'products.descriptions.categories',
  'products.descriptions.images',
  'products.descriptions.active',
  'products.descriptions.featured_product',
  'products.descriptions.main_image',
  'products.descriptions.related_images',
  'products.descriptions.filter_combinations',
  'products.descriptions.filters',
  'products.layout.add',
  'products.layout.title',
  'products.layout.description',
  'products.metadata.title',
  'products.metadata.description',
  'products.scheme.name',
  'products.scheme.description',
  'products.scheme.price',
  'products.scheme.categories',
  'products.scheme.images',
  'products.scheme.active',
  'products.scheme.featured_product',
  'products.scheme.main_image',
  'products.scheme.related_images',
  'products.scheme.filter_combinations',
  'products.scheme.filters',
  'products.sidebar.add',
  'products.sidebar.edit',
  'products.sidebar.detail'
] as const;
