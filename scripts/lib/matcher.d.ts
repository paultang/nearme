import type { SpaceMeta } from './types.js';
/**
 * Check if input looks like a short code (alphanumeric, hyphens, 3-50 chars).
 */
export declare function looksLikeCode(input: string): boolean;
/**
 * Find the best matching space from a list.
 * Returns all matches with a score > 0, sorted by score descending.
 */
export declare function matchSpaces(spaces: SpaceMeta[], input: string): SpaceMeta[];
