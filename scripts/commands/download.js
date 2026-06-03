"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = download;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
const cache_js_1 = require("../lib/cache.js");
async function download() {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space. Use `nm here <code|description>` first.');
        return;
    }
    console.log(`Downloading profiles from ${space.name}...`);
    const [result, index] = await Promise.all([
        (0, api_js_1.downloadProfiles)(space.code),
        (0, api_js_1.listProfiles)(space.code),
    ]);
    (0, cache_js_1.saveProfiles)(result.profiles);
    (0, cache_js_1.saveTimestamps)(index.profiles || []);
    console.log(`Downloaded ${result.profiles.length} profile(s) to ./nearmeet-profiles/`);
    console.log('You can now ask your AI Agent about people here.');
}
