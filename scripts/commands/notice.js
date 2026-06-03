"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notice = notice;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function notice(content) {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space. Use `nm here <code|description>` first.');
        return;
    }
    // No arguments → show board
    if (!content) {
        const result = await (0, api_js_1.getBoard)(space.code);
        if (result.notices.length === 0) {
            console.log(`No notices in "${space.name}". Post one: nm notice <message>`);
            return;
        }
        console.log(`📋 ${space.name} — Notice Board\n`);
        for (const n of result.notices) {
            const time = new Date(n.createdAt).toLocaleString();
            console.log(`  [${time}] ${n.from}:`);
            console.log(`    ${n.content}\n`);
        }
        return;
    }
    // Has content → post a notice
    const from = (0, location_js_1.getLastProfileName)();
    if (!from) {
        console.log('Share your profile first: nm share <path>');
        return;
    }
    try {
        await (0, api_js_1.postNotice)(space.code, from, content, space.password, (0, location_js_1.getUserId)());
        console.log(`Notice posted. View with: nm notice`);
    }
    catch (err) {
        console.log(err.message || 'Failed to post notice');
    }
}
