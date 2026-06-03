"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = download;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
const cache_js_1 = require("../lib/cache.js");
const fs = require("node:fs");
const path = require("node:path");
async function download(spaceCode, options) {
    if (options && options.space) {
        const userId = (0, location_js_1.getUserId)();
        console.log(`Downloading profiles from ${options.space}...`);
        const result = await (0, api_js_1.downloadProfiles)(options.space, userId);
        const dir = path.resolve(process.cwd(), `${options.space}`);
        fs.mkdirSync(dir, { recursive: true });
        for (const p of result.profiles) {
            const safe = p.name.replace(/[^a-zA-Z0-9_\-一-鿿]/g, '_');
            fs.writeFileSync(path.join(dir, `${safe}.md`), p.content);
        }
        console.log(`Downloaded ${result.profiles.length} profile(s) to ./${options.space}/`);
        return;
    }
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space. Use `nm here <code|description>` first, or --space <code>');
        return;
    }
    console.log(`Downloading profiles from ${space.name}...`);
    const [result, index] = await Promise.all([
        (0, api_js_1.downloadProfiles)(space.code),
        (0, api_js_1.listProfiles)(space.code),
    ]);
    const dir = path.resolve(process.cwd(), `${space.code}`);
    fs.mkdirSync(dir, { recursive: true });
    for (const p of result.profiles) {
        const safe = p.name.replace(/[^a-zA-Z0-9_\-一-鿿]/g, '_');
        fs.writeFileSync(path.join(dir, `${safe}.md`), p.content);
    }
    (0, cache_js_1.saveTimestamps)(index.profiles || []);
    console.log(`Downloaded ${result.profiles.length} profile(s) to ./${space.code}/`);
}
