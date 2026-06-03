"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = view;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
const cache_js_1 = require("../lib/cache.js");
async function view(name) {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space.');
        return;
    }
    if (!name) {
        console.log('Usage: nm view <name>');
        return;
    }
    const [profile, index] = await Promise.all([
        (0, api_js_1.getProfile)(space.code, name),
        (0, api_js_1.listProfiles)(space.code),
    ]);
    // Save to local cache + update timestamps (so 📝 clears on next list)
    (0, cache_js_1.saveProfile)({ name: profile.name, content: profile.content, createdAt: '' });
    const existing = (0, cache_js_1.getCachedTimestamps)();
    const entry = (index.profiles || []).find((p) => p.name === name);
    if (entry) {
        existing[entry.name] = entry.updatedAt;
        (0, cache_js_1.saveTimestamps)(Object.entries(existing).map(([n, t]) => ({ name: n, updatedAt: t })));
    }
    console.log(`--- ${profile.name} ---`);
    console.log(profile.content);
}
