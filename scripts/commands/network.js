"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.network = network;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function network() {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space.');
        return;
    }
    const from = (0, location_js_1.getLastProfileName)();
    if (!from) {
        console.log('Share your profile first.');
        return;
    }
    try {
        const result = await (0, api_js_1.getNetwork)(space.code, from);
        if (result.connections.length === 0) {
            console.log('No interactions yet.');
            return;
        }
        // Group by sender
        const groups = new Map();
        for (const c of result.connections) {
            if (!groups.has(c.from))
                groups.set(c.from, []);
            groups.get(c.from).push(c.to);
        }
        console.log('互动关系：\n');
        for (const [from, toList] of groups) {
            console.log(`  ${from} → ${toList.join(', ')}`);
        }
    }
    catch (err) {
        console.log(err.message || 'Failed to load network');
    }
}
