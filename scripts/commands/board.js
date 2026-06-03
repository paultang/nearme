"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.board = board;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function board() {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space. Use `nm here <code|description>` first.');
        return;
    }
    const result = await (0, api_js_1.getBoard)(space.code);
    if (result.notices.length === 0) {
        console.log(`No notices in "${space.name}".`);
        return;
    }
    console.log(`📋 ${space.name} — Notice Board\n`);
    for (const n of result.notices) {
        const time = new Date(n.createdAt).toLocaleString();
        console.log(`  [${time}] ${n.from}:`);
        console.log(`    ${n.content}\n`);
    }
}
