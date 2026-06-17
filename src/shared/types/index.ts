/**
 * Shared Type System
 * 
 * Central export point for all shared type utilities.
 * Provides branded types, Result types, and state management types.
 */

// Branded types for domain-specific identifiers
export type {
  Brand,
  Unbrand,
  ProductId,
  CategoryId,
  FilterId,
  UserId,
  SessionToken,
  Email,
} from './branded';

export {
  ProductId as createProductId,
  CategoryId as createCategoryId,
  FilterId as createFilterId,
  UserId as createUserId,
  SessionToken as createSessionToken,
  Email as createEmail,
  isBranded,
  isProductId,
  isCategoryId,
  isFilterId,
  isUserId,
  isSessionToken,
  isEmail,
} from './branded';

// Result types for error handling
export type { Result, Ok, Err } from './result';

export {
  ok,
  err,
  isOk,
  isErr,
  map,
  mapErr,
  andThen,
  unwrapOr,
  unwrapOrElse,
  match,
  fromPromise,
  toPromise,
  all,
  any,
} from './result';

// State management types
export type {
  AsyncState,
  IdleState,
  LoadingState,
  SuccessState,
  ErrorState,
  ExtendedAsyncState,
  ReloadingState,
  FormState,
  PaginationState,
  SortingState,
  FilterState,
  TableState,
} from './state';

export {
  idle,
  loading,
  success,
  error,
  reloading,
  isIdle,
  isLoading,
  isSuccess,
  isError,
  isReloading,
  mapData,
  matchState,
  formIdle,
  formValidating,
  formSubmitting,
  formSuccess,
  formError,
  createPaginationState,
  createSortingState,
  toggleSortDirection,
  createFilterState,
  createTableState,
} from './state';
