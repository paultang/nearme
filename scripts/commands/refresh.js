"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = refresh;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
const cache_js_1 = require("../lib/cache.js");
async function refresh() {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space. Use `nm here <code|description>` first.');
        return;
    }
    const result = await (0, api_js_1.listProfiles)(space.code);
    const remoteList = result.profiles || [];
    const cachedNames = (0, cache_js_1.listCachedProfiles)();
    const newPeople = remoteList.filter((p) => !cachedNames.includes(p.name));
    if (newPeople.length === 0) {
        console.log('No new people since last refresh.');
        return;
    }
    console.log(`Found ${newPeople.length} new person(s):`);
    for (const p of newPeople) {
        console.log(`  - ${p.name}`);
    }
    console.log(`\nRun \`nm download\` to download their profiles.`);
}
