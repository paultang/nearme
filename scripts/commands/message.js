"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = message;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function message(to, content) {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space. Use `nm here <code|description>` first.');
        return;
    }
    const from = (0, location_js_1.getLastProfileName)();
    if (!from) {
        console.log('Share your profile first: nm share <path>');
        return;
    }
    if (!to || !content) {
        console.log('Usage: nm message <name|number> <your message>');
        return;
    }
    // Resolve number → name
    const profiles = await (0, api_js_1.listProfiles)(space.code);
    const resolved = (0, api_js_1.resolveProfile)(to, profiles.profiles || []);
    if (!resolved) { console.log(`No one found: "${to}". Use nm list to see available people.`); return; }
    const msg = await (0, api_js_1.sendMessage)(space.code, { from, to: resolved.name, content }, space.password);
    console.log(`Message sent to "${resolved.name}".`);
}
