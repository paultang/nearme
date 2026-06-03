"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.looksLikeCode = looksLikeCode;
exports.matchSpaces = matchSpaces;
/**
 * Check if input looks like a short code (alphanumeric, hyphens, 3-50 chars).
 */
function looksLikeCode(input) {
    return /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/i.test(input);
}
/**
 * Score how well a space's metadata matches a query string.
 * Returns 0 for no match, higher for better match.
 */
function scoreSpace(space, query) {
    const q = query.toLowerCase().trim();
    if (!q)
        return 0;
    let score = 0;
    // exact code match → highest score
    if (space.code.toLowerCase() === q)
        return 100;
    // code prefix match
    if (space.code.toLowerCase().startsWith(q))
        score += 80;
    else if (space.code.toLowerCase().includes(q))
        score += 60;
    // name match
    if (space.name.toLowerCase() === q)
        score += 90;
    else if (space.name.toLowerCase().includes(q))
        score += 50;
    // location match
    if (space.location?.toLowerCase().includes(q))
        score += 40;
    // tag match
    if (space.tags?.some(t => t.toLowerCase().includes(q)))
        score += 30;
    return score;
}
/**
 * Find the best matching space from a list.
 * Returns all matches with a score > 0, sorted by score descending.
 */
function matchSpaces(spaces, input) {
    const scored = spaces
        .map(s => ({ space: s, score: scoreSpace(s, input) }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score);
    return scored.map(x => x.space);
}
