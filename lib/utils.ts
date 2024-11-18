import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function safeParseFloat(value?: any) {
  if(typeof value === 'string') {
    return parseFloat(value);
  }

  return value;
}