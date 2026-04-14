import { clsx } from "clsx"

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
