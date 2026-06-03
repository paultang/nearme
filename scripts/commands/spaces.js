"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaces = spaces;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function spaces() {
    const userId = (0, location_js_1.getUserId)();
    const result = await (0, api_js_1.listMySpaces)(userId);
    if (result.length === 0) {
        console.log('You haven\'t created any spaces yet.');
        return;
    }
    console.log(`Your spaces (${result.length}):\n`);
    for (const s of result) {
        const status = s.expired ? ' (已过期)' : '';
        const loc = s.location ? ` @ ${s.location}` : '';
        console.log(`  ${s.code} — ${s.name}${loc}${status}`);
    }
}
