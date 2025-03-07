import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { someUtil } from '@/lib/utils';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
