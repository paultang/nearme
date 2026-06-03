"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
const cache_js_1 = require("../lib/cache.js");
async function list() {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space. Use `nm here <code|description>` first.');
        return;
    }
    const result = await (0, api_js_1.listProfiles)(space.code);
    const profiles = result.profiles || [];
    const creator = result.creator;
    const partners = result.partners || [];
    if (profiles.length === 0) {
        console.log(`No one in "${space.name}" yet. Be the first: nm share <your-profile.md>`);
        return;
    }
    const localTimestamps = (0, cache_js_1.getCachedTimestamps)();
    console.log(`${space.name} — ${profiles.length} person(s):`);
    for (let i = 0; i < profiles.length; i++) {
        const p = profiles[i];
        const localTime = localTimestamps[p.name];
        const marker = localTime && localTime !== p.updatedAt ? ' 📝' : '';
        const role = p.name === creator ? ' 👑' : partners.includes(p.name) ? ' 🤝' : '';
        console.log(`  ${i + 1}. ${p.name}${role}${marker}`);
    }
    console.log(`\nRun \`nm download\` to save their profiles locally.`);
}
