/**
 * State Management Types
 * 
 * Provides discriminated union types for managing loading, error, and data states.
 * These types replace optional properties with explicit state variants for type safety.
 * 
 * @example
 * ```typescript
 * const [state, setState] = useState<AsyncState<Product[]>>(idle());
 * 
 * // Type-safe state handling
 * switch (state.status) {
 *   case 'idle':
 *     return <div>Click to load</div>;
 *   case 'loading':
 *     return <div>Loading...</div>;
 *   case 'success':
 *     return <div>{state.data.length} products</div>; // data is guaranteed
 *   case 'error':
 *     return <div>Error: {state.error.message}</div>; // error is guaranteed
 * }
 * ```
 * 
 * Validates Requirement 4.5: Use discriminated unions for state management instead of optional properties
 */

/**
 * Idle state - no operation has been initiated
 */
export interface IdleState {
  readonly status: 'idle';
}

/**
 * Loading state - operation is in progress
 */
export interface LoadingState {
  readonly status: 'loading';
}

/**
 * Success state - operation completed successfully with data
 * 
 * @template T - The type of the success data
 */
export interface SuccessState<T> {
  readonly status: 'success';
  readonly data: T;
}

/**
 * Error state - operation failed with an error
 */
export interface ErrorState {
  readonly status: 'error';
  readonly error: Error;
}

/**
 * Async state representing the lifecycle of an asynchronous operation
 * 
 * @template T - The type of the success data
 */
export type AsyncState<T> =
  | IdleState
  | LoadingState
  | SuccessState<T>
  | ErrorState;

/**
 * Creates an idle state
 * 
 * @returns An IdleState
 */
export function idle(): IdleState {
  return { status: 'idle' };
}

/**
 * Creates a loading state
 * 
 * @returns A LoadingState
 */
export function loading(): LoadingState {
  return { status: 'loading' };
}

/**
 * Creates a success state with data
 * 
 * @template T - The type of the success data
 * @param data - The success data
 * @returns A SuccessState
 */
export function success<T>(data: T): SuccessState<T> {
  return { status: 'success', data };
}

/**
 * Creates an error state with an error
 * 
 * @param error - The error
 * @returns An ErrorState
 */
export function error(error: Error): ErrorState {
  return { status: 'error', error };
}

/**
 * Type guard to check if state is idle
 * 
 * @param state - The state to check
 * @returns True if the state is idle
 */
export function isIdle<T>(state: AsyncState<T>): state is IdleState {
  return state.status === 'idle';
}

/**
 * Type guard to check if state is loading
 * 
 * @param state - The state to check
 * @returns True if the state is loading
 */
export function isLoading<T>(state: AsyncState<T>): state is LoadingState {
  return state.status === 'loading';
}

/**
 * Type guard to check if state is success
 * 
 * @param state - The state to check
 * @returns True if the state is success
 */
export function isSuccess<T>(state: AsyncState<T>): state is SuccessState<T> {
  return state.status === 'success';
}

/**
 * Type guard to check if state is error
 * 
 * @param state - The state to check
 * @returns True if the state is error
 */
export function isError<T>(state: AsyncState<T>): state is ErrorState {
  return state.status === 'error';
}

/**
 * Maps a success state's data to a new value
 * 
 * @template T - The original data type
 * @template U - The new data type
 * @param state - The state to map
 * @param fn - The mapping function
 * @returns A new state with the mapped data
 */
export function mapData<T, U>(
  state: AsyncState<T>,
  fn: (data: T) => U
): AsyncState<U> {
  if (state.status === 'success') {
    return success(fn(state.data));
  }
  return state as AsyncState<U>;
}

/**
 * Matches an AsyncState and executes the appropriate handler
 * 
 * @template T - The data type
 * @template U - The return type
 * @param state - The state to match
 * @param handlers - Object with handler functions for each state
 * @returns The result of the matched handler
 */
export function matchState<T, U>(
  state: AsyncState<T>,
  handlers: {
    idle: () => U;
    loading: () => U;
    success: (data: T) => U;
    error: (error: Error) => U;
  }
): U {
  switch (state.status) {
    case 'idle':
      return handlers.idle();
    case 'loading':
      return handlers.loading();
    case 'success':
      return handlers.success(state.data);
    case 'error':
      return handlers.error(state.error);
  }
}

/**
 * Reloading state - operation is in progress but previous data is available
 * Useful for showing stale data while fetching fresh data
 * 
 * @template T - The type of the data
 */
export interface ReloadingState<T> {
  readonly status: 'reloading';
  readonly data: T;
}

/**
 * Extended async state that includes reloading state
 * 
 * @template T - The type of the success data
 */
export type ExtendedAsyncState<T> =
  | IdleState
  | LoadingState
  | SuccessState<T>
  | ReloadingState<T>
  | ErrorState;

/**
 * Creates a reloading state with stale data
 * 
 * @template T - The type of the data
 * @param data - The stale data to show while reloading
 * @returns A ReloadingState
 */
export function reloading<T>(data: T): ReloadingState<T> {
  return { status: 'reloading', data };
}

/**
 * Type guard to check if state is reloading
 * 
 * @param state - The state to check
 * @returns True if the state is reloading
 */
export function isReloading<T>(
  state: ExtendedAsyncState<T>
): state is ReloadingState<T> {
  return state.status === 'reloading';
}

/**
 * Form submission state
 */
export type FormState =
  | { status: 'idle' }
  | { status: 'validating' }
  | { status: 'submitting' }
  | { status: 'success'; message: string }
  | { status: 'error'; errors: Record<string, string[]> };

/**
 * Creates an idle form state
 */
export function formIdle(): FormState {
  return { status: 'idle' };
}

/**
 * Creates a validating form state
 */
export function formValidating(): FormState {
  return { status: 'validating' };
}

/**
 * Creates a submitting form state
 */
export function formSubmitting(): FormState {
  return { status: 'submitting' };
}

/**
 * Creates a success form state with a message
 * 
 * @param message - Success message
 */
export function formSuccess(message: string): FormState {
  return { status: 'success', message };
}

/**
 * Creates an error form state with field errors
 * 
 * @param errors - Field-level errors
 */
export function formError(errors: Record<string, string[]>): FormState {
  return { status: 'error', errors };
}

/**
 * Pagination state
 */
export interface PaginationState {
  readonly currentPage: number;
  readonly pageSize: number;
  readonly totalPages: number;
  readonly totalRecords: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

/**
 * Creates a pagination state
 * 
 * @param params - Pagination parameters
 * @returns A PaginationState
 */
export function createPaginationState(params: {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
}): PaginationState {
  const { currentPage, pageSize, totalRecords } = params;
  const totalPages = Math.ceil(totalRecords / pageSize);
  
  return {
    currentPage,
    pageSize,
    totalPages,
    totalRecords,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

/**
 * Sorting state
 */
export interface SortingState {
  readonly column: string;
  readonly direction: 'asc' | 'desc';
}

/**
 * Creates a sorting state
 * 
 * @param column - Column to sort by
 * @param direction - Sort direction
 * @returns A SortingState
 */
export function createSortingState(
  column: string,
  direction: 'asc' | 'desc' = 'asc'
): SortingState {
  return { column, direction };
}

/**
 * Toggles the sort direction
 * 
 * @param state - Current sorting state
 * @returns New sorting state with toggled direction
 */
export function toggleSortDirection(state: SortingState): SortingState {
  return {
    column: state.column,
    direction: state.direction === 'asc' ? 'desc' : 'asc',
  };
}

/**
 * Filter state
 */
export interface FilterState {
  readonly column: string;
  readonly value: string | number | boolean;
  readonly operator?: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains';
}

/**
 * Creates a filter state
 * 
 * @param params - Filter parameters
 * @returns A FilterState
 */
export function createFilterState(params: {
  column: string;
  value: string | number | boolean;
  operator?: FilterState['operator'];
}): FilterState {
  return {
    column: params.column,
    value: params.value,
    operator: params.operator ?? 'eq',
  };
}

/**
 * Table state combining data, pagination, sorting, and filtering
 * 
 * @template T - The type of table row data
 */
export interface TableState<T> {
  readonly data: AsyncState<T[]>;
  readonly pagination: PaginationState;
  readonly sorting: SortingState | null;
  readonly filters: FilterState[];
  readonly selectedRows: Set<number>;
}

/**
 * Creates an initial table state
 * 
 * @template T - The type of table row data
 * @param params - Initial table parameters
 * @returns A TableState
 */
export function createTableState<T>(params?: {
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}): TableState<T> {
  return {
    data: idle(),
    pagination: createPaginationState({
      currentPage: 1,
      pageSize: params?.pageSize ?? 10,
      totalRecords: 0,
    }),
    sorting: params?.sortColumn
      ? createSortingState(params.sortColumn, params.sortDirection)
      : null,
    filters: [],
    selectedRows: new Set(),
  };
}
