"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unshare = unshare;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function unshare() {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space. Use `nm here <code|description>` first.');
        return;
    }
    const name = (0, location_js_1.getLastProfileName)();
    if (!name) {
        console.log('No profile found. Run `nm share <path>` first.');
        return;
    }
    try {
        await (0, api_js_1.deleteProfile)(space.code, name);
        console.log(`Profile "${name}" removed from ${space.name}.`);
    }
    catch {
        console.log(`Could not remove "${name}". Try sharing first: nm share <path>`);
    }
}
