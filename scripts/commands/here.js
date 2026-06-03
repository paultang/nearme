"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.here = here;
const api_js_1 = require("../lib/api.js");
const matcher_js_1 = require("../lib/matcher.js");
const location_js_1 = require("../lib/location.js");
const path = require("node:path");
const fs = require("node:fs");
function saveQuestionsMd(space) {
    if (!space || !space.questions) return;
    const filePath = path.resolve(process.cwd(), 'questions.md');
    fs.writeFileSync(filePath, space.questions, 'utf-8');
    console.log(`Questions saved to ./questions.md`);
}
async function here(input, options) {
    if (!input) {
        const current = (0, location_js_1.getCurrentSpace)();
        if (current) {
            console.log(`Current space: ${current.name} (${current.code})`);
            if (current.location) console.log(`Location: ${current.location}`);
        } else {
            console.log('No current space. Use `nm here <code|description>` to set one.');
        }
        return;
    }
    const spaces = await (0, api_js_1.listSpaces)();
    const password = options?.pass;
    if ((0, matcher_js_1.looksLikeCode)(input)) {
        const exact = spaces.find(s => s.code.toLowerCase() === input.toLowerCase());
        if (exact) {
            (0, location_js_1.setCurrentSpace)(exact, password);
            saveQuestionsMd(exact);
            console.log(`Set current space to: ${exact.name} (${exact.code})`);
            if (exact.description) console.log(`📋 ${exact.description}`);
            if (exact.requiresPassword && !password) {
                console.log('Note: this space requires a password to share. Use --pass <password>');
            }
            return;
        }
    }
    const matches = (0, matcher_js_1.matchSpaces)(spaces, input);
    if (matches.length === 0) {
        console.log(`No active spaces matched "${input}".`);
        console.log('Create one with: nm create "<name>"');
        return;
    }
    if (matches.length === 1) {
        (0, location_js_1.setCurrentSpace)(matches[0], password);
        saveQuestionsMd(matches[0]);
        console.log(`Set current space to: ${matches[0].name} (${matches[0].code})`);
        if (matches[0].description) console.log(`📋 ${matches[0].description}`);
        if (matches[0].requiresPassword && !password) {
            console.log('Note: this space requires a password to share. Use --pass <password>');
        }
        return;
    }
    console.log(`Found ${matches.length} matching spaces. Which one are you at?`);
    for (const s of matches) {
        const loc = s.location ? ` @ ${s.location}` : '';
        console.log(`  ${s.code} — ${s.name}${loc}`);
    }
}
