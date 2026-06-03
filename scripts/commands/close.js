"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = close;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function close() {
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
        const userId = (0, location_js_1.getUserId)();
        await (0, api_js_1.closeSpace)(space.code, from, space.password, userId);
        (0, location_js_1.clearCurrentSpace)();
        console.log(`Space "${space.name}" closed.`);
    }
    catch (err) {
        console.log(err.message || 'Failed to close space');
    }
}
