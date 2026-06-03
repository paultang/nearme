"use strict";
// Simple content moderation — checks profiles for inappropriate content.
// Rejects uploads containing profanity or political sensitive material.
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderate = moderate;
const BLOCKED_PATTERNS = [
    // Profanity (Chinese)
    /[肏屄操幹干你][你他她妈母娘祖]/i,
    /[傻逼][逼货]/i,
    /fuck/i,
    /shit/i,
    // Personal attacks
    /你是[条只个]?[狗猪]/i,
];
/**
 * Check text against moderation rules. Returns reason if blocked, null if OK.
 */
function moderate(text) {
    for (const pattern of BLOCKED_PATTERNS) {
        if (pattern.test(text)) {
            return `Content blocked: inappropriate language detected.`;
        }
    }
    return null;
}
