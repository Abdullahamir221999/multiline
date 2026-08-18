/** Wraps an index within `[0, length)` for carousel navigation. */
export const wrapIndex = (index: number, length: number): number => {
  if (length <= 0) {
    return 0;
  }

  return ((index % length) + length) % length;
};
