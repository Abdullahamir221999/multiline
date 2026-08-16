type ClassValue = string | false | null | undefined;

/**
 * Conditionally join class names. Keeps UI class composition readable
 * without pulling in an extra dependency.
 */
export const cn = (...values: ClassValue[]): string =>
  values.filter(Boolean).join(" ");
