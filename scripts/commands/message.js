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
        console.log('Usage: nm message <name> <your message>');
        return;
    }
    const msg = await (0, api_js_1.sendMessage)(space.code, { from, to, content }, space.password);
    console.log(`Message sent to "${to}".`);
}
