"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inbox = inbox;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function inbox() {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space. Use `nm here <code|description>` first.');
        return;
    }
    const name = (0, location_js_1.getLastProfileName)();
    if (!name) {
        console.log('Share your profile first: nm share <path>');
        return;
    }
    const result = await (0, api_js_1.getInbox)(space.code, name);
    if (result.messages.length === 0) {
        console.log('No messages.');
        return;
    }
    console.log(`Inbox for "${name}" — ${result.messages.length} message(s):\n`);
    for (const msg of result.messages) {
        const time = new Date(msg.createdAt).toLocaleTimeString();
        console.log(`  [${time}] ${msg.from}:`);
        console.log(`    ${msg.content}\n`);
    }
}
