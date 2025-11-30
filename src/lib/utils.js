// CSS utility libraries for dynamic class name handling
// clsx - Library for conditionally joining class names together
// Documentation: https://github.com/lukeed/clsx
import { clsx } from "clsx";

// tailwind-merge - Merges Tailwind CSS classes and resolves conflicts
// Documentation: https://github.com/dcastil/tailwind-merge
// Example: If you have "p-4 p-6", it keeps only "p-6" (the latter wins)
import { twMerge } from "tailwind-merge";

/**
 * Utility Function Pattern: cn (className) function
 *
 * This is a common pattern in React projects using Tailwind CSS
 * It combines clsx and tailwind-merge to handle dynamic class names
 *
 * Benefits:
 * 1. Conditionally apply classes: cn('base-class', condition && 'conditional-class')
 * 2. Merge arrays of classes: cn(['class1', 'class2'])
 * 3. Resolve Tailwind conflicts: cn('p-4', 'p-6') → 'p-6'
 *
 * Usage examples:
 * - cn('text-red-500', isError && 'bg-red-100')
 * - cn('btn', { 'btn-active': isActive, 'btn-disabled': isDisabled })
 *
 * @param {...any} inputs - Any number of class name inputs (strings, objects, arrays)
 * @returns {string} - Merged and conflict-resolved class name string
 */
export function cn(...inputs) {
  // Step 1: clsx processes conditional logic and combines class names
  // Step 2: twMerge removes conflicting Tailwind classes
  return twMerge(clsx(inputs));
}
