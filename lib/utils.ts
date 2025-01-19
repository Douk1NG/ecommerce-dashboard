import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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