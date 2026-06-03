"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partner = partner;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function partner(target) {
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
    if (!target) {
        console.log('Usage: nm partner <name>');
        return;
    }
    try {
        await (0, api_js_1.addPartner)(space.code, from, target, space.password, (0, location_js_1.getUserId)());
        (0, location_js_1.addPartner)(target);
        console.log(`"${target}" is now a partner.`);
    }
    catch (err) {
        console.log(err.message || 'Failed to add partner');
    }
}
