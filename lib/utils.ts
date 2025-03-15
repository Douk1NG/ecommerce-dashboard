import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CONSTANTS from '@/constants/layout'
import type { Query } from "@/types/services";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @desc helps to omit type checking and parse errors
**/
export function safeParseFloat(value?: unknown): number | unknown {
  if(typeof value === 'string') {
    return parseFloat(value);
  }

  return value;
}

/**
 * @desc returns a splitted string cleaning empty values
**/
export function cleanSplit({value, criteria}: { value: string , criteria: string}) {
  if(typeof value === 'string') {
    return value.split(criteria).filter(it => it)
  }

  return value
}

/**
 * @desc returns the base path of the current path
**/
export function getBasePath(pathname: string) {
  return cleanSplit({
    value: pathname,
    criteria: '/'
  }).slice(0, -1).join('/')
}

/**
 * @desc returns the form mode
**/
export function getDisplayMode(searchParams: URLSearchParams, values: unknown) {
    const isEdit = searchParams.get(CONSTANTS.LAYOUT.SIDEBAR.EDIT)
    const isDetail = Boolean(values && !isEdit)
    const isNotDetail = !isDetail

    return {
        showSaveButton: isNotDetail,
        readOnly: isDetail
    }
}

/**
 * @desc returns a unique array by a key
**/
export function getUniqueByKey<T extends Record<string, unknown>>(array: T[], key: string) {
  return array.filter((item, index, self) =>
      index === self.findIndex((t) => t[key] === item[key])
  );
};

/**
 * @desc returns a parsed JSON
**/
export const safeParseJSON = (value: unknown) => {
  if(typeof value === 'string' && value) {
    return JSON.parse(value)
  }
  return value
}

/**
 * @desc clean symbols from a string
 */
export const cleanSymbols = (value: string) => {
  return value.replace(/[^\w\s]/g, '')
}

/**
 * @desc returns a parsed number
 */
export const safeParseNumber = (value: unknown) => {
  if(typeof value === 'string' && value) {
    return Number(cleanSymbols(value))
  }

  return value
}

/**
 * @desc returns a parsed boolean
 */
export const safeParseBoolean = (value: unknown) => {
  if(typeof value === 'string' && value) {
    return Boolean(value)
  }

  return false
}

/**
 * @desc returns a property of an array of objects
 */
export const getPropertyOfArray = (value: unknown, property: string) => {
  if(Array.isArray(value)) {
    return value.map((item) => item[property])
  }

  return value
}

/**
 * @desc returns a query string
 */
export const buildGetQuery = (query?: Query) => {
  if (!query) {
    return ''
  }

  const [selectable, full, purpose] = Object.entries(query).flat()

  const build = `?${selectable}=${Boolean(selectable)}`

  if (full) {
    const [key, value] = Object.entries(full).flat()
    return `${build}&${key}=${value}`
  }

  if (purpose) {
    const [key, value] = Object.entries(purpose).flat()
    return `${build}&${key}=${value}`
  }

  return build
}