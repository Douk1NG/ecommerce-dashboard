/**
 * Result Type Utility
 * 
 * Provides a type-safe Result type for error handling without exceptions.
 * Result types make error handling explicit and force consumers to handle both success and error cases.
 * 
 * @example
 * ```typescript
 * function parseProduct(data: unknown): Result<Product, ValidationError> {
 *   const result = productSchema.safeParse(data);
 *   if (result.success) {
 *     return ok(result.data);
 *   }
 *   return err(new ValidationError(result.error));
 * }
 * 
 * const result = parseProduct(data);
 * if (result.success) {
 *   console.log(result.data); // Type: Product
 * } else {
 *   console.error(result.error); // Type: ValidationError
 * }
 * ```
 * 
 * Validates Requirement 4.5: Use discriminated unions for state management
 */

/**
 * Success result containing data
 * 
 * @template T - The type of the success data
 */
export interface Ok<T> {
  readonly success: true;
  readonly data: T;
}

/**
 * Error result containing an error
 * 
 * @template E - The type of the error
 */
export interface Err<E> {
  readonly success: false;
  readonly error: E;
}

/**
 * Result type representing either success or failure
 * 
 * @template T - The type of the success data
 * @template E - The type of the error (defaults to Error)
 */
export type Result<T, E = Error> = Ok<T> | Err<E>;

/**
 * Creates a successful Result
 * 
 * @template T - The type of the success data
 * @param data - The success data
 * @returns An Ok result
 */
export function ok<T>(data: T): Ok<T> {
  return { success: true, data };
}

/**
 * Creates an error Result
 * 
 * @template E - The type of the error
 * @param error - The error
 * @returns An Err result
 */
export function err<E>(error: E): Err<E> {
  return { success: false, error };
}

/**
 * Type guard to check if a Result is Ok
 * 
 * @param result - The Result to check
 * @returns True if the result is Ok
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.success === true;
}

/**
 * Type guard to check if a Result is Err
 * 
 * @param result - The Result to check
 * @returns True if the result is Err
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result.success === false;
}

/**
 * Maps a Result's success value to a new value
 * 
 * @template T - The original success type
 * @template U - The new success type
 * @template E - The error type
 * @param result - The Result to map
 * @param fn - The mapping function
 * @returns A new Result with the mapped value
 */
export function map<T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => U
): Result<U, E> {
  if (result.success) {
    return ok(fn(result.data));
  }
  return result;
}

/**
 * Maps a Result's error value to a new error
 * 
 * @template T - The success type
 * @template E - The original error type
 * @template F - The new error type
 * @param result - The Result to map
 * @param fn - The mapping function
 * @returns A new Result with the mapped error
 */
export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> {
  if (!result.success) {
    return err(fn(result.error));
  }
  return result;
}

/**
 * Chains a Result with a function that returns another Result
 * (also known as flatMap or bind)
 * 
 * @template T - The original success type
 * @template U - The new success type
 * @template E - The error type
 * @param result - The Result to chain
 * @param fn - The function that returns a new Result
 * @returns The chained Result
 */
export function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => Result<U, E>
): Result<U, E> {
  if (result.success) {
    return fn(result.data);
  }
  return result;
}

/**
 * Returns the success value or a default value if the Result is an error
 * 
 * @template T - The success type
 * @template E - The error type
 * @param result - The Result to unwrap
 * @param defaultValue - The default value to return on error
 * @returns The success value or the default value
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  if (result.success) {
    return result.data;
  }
  return defaultValue;
}

/**
 * Returns the success value or computes a default value if the Result is an error
 * 
 * @template T - The success type
 * @template E - The error type
 * @param result - The Result to unwrap
 * @param fn - Function to compute the default value from the error
 * @returns The success value or the computed default value
 */
export function unwrapOrElse<T, E>(
  result: Result<T, E>,
  fn: (error: E) => T
): T {
  if (result.success) {
    return result.data;
  }
  return fn(result.error);
}

/**
 * Matches a Result and executes the appropriate function
 * 
 * @template T - The success type
 * @template E - The error type
 * @template U - The return type
 * @param result - The Result to match
 * @param handlers - Object with ok and err handler functions
 * @returns The result of the matched handler
 */
export function match<T, E, U>(
  result: Result<T, E>,
  handlers: {
    ok: (data: T) => U;
    err: (error: E) => U;
  }
): U {
  if (result.success) {
    return handlers.ok(result.data);
  }
  return handlers.err(result.error);
}

/**
 * Converts a Promise to a Result, catching any errors
 * 
 * @template T - The success type
 * @param promise - The Promise to convert
 * @returns A Promise that resolves to a Result
 */
export async function fromPromise<T>(
  promise: Promise<T>
): Promise<Result<T, Error>> {
  try {
    const data = await promise;
    return ok(data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Converts a Result to a Promise
 * 
 * @template T - The success type
 * @template E - The error type
 * @param result - The Result to convert
 * @returns A Promise that resolves with the data or rejects with the error
 */
export function toPromise<T, E>(result: Result<T, E>): Promise<T> {
  if (result.success) {
    return Promise.resolve(result.data);
  }
  return Promise.reject(result.error);
}

/**
 * Combines multiple Results into a single Result containing an array
 * Returns Ok with all values if all Results are Ok, otherwise returns the first Err
 * 
 * @template T - The success type
 * @template E - The error type
 * @param results - Array of Results to combine
 * @returns A Result containing an array of all success values or the first error
 */
export function all<T, E>(results: Result<T, E>[]): Result<T[], E> {
  const values: T[] = [];
  
  for (const result of results) {
    if (!result.success) {
      return result;
    }
    values.push(result.data);
  }
  
  return ok(values);
}

/**
 * Returns the first Ok Result, or the last Err if all are errors
 * 
 * @template T - The success type
 * @template E - The error type
 * @param results - Array of Results to check
 * @returns The first Ok Result or the last Err
 */
export function any<T, E>(results: Result<T, E>[]): Result<T, E> {
  let lastErr: Err<E> | undefined;
  
  for (const result of results) {
    if (result.success) {
      return result;
    }
    lastErr = result;
  }
  
  return lastErr ?? err(new Error('No results provided') as E);
}
