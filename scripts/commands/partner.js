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
        console.log('Usage: nm partner <name|number>');
        return;
    }
    try {
        const userId = (0, location_js_1.getUserId)();
        // Resolve number → name
        const profiles = await (0, api_js_1.listProfiles)(space.code);
        const resolved = (0, api_js_1.resolveProfile)(target, profiles.profiles || []);
        if (!resolved) { console.log(`No one found: "${target}". Use nm list to see available people.`); return; }
        await (0, api_js_1.addPartner)(space.code, from, resolved.name, space.password, userId);
        (0, location_js_1.addPartner)(resolved.name);
        console.log(`"${resolved.name}" is now a partner.`);
    }
    catch (err) {
        console.log(err.message || 'Failed to add partner');
    }
}
