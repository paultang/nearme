"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function create(name, options) {
    if (!name) {
        console.log('Usage: nm create "<name>" [--code <code>] [--loc <location>] [--tags <tags>] [--pass <password>]');
        return;
    }
    const tags = options.tags
        ? options.tags.split(',').map(t => t.trim()).filter(Boolean)
        : undefined;
    const space = await (0, api_js_1.createSpace)({
        name,
        code: options.code,
        location: options.location,
        tags,
        password: options.pass,
        creator: (0, location_js_1.getLastProfileName)(),
    });
    (0, location_js_1.setCurrentSpace)(space);
    console.log(`Created space: ${space.name}`);
    console.log(`Short code: ${space.code}`);
    if (space.location)
        console.log(`Location: ${space.location}`);
    if (space.password)
        console.log(`Password: ${space.password} (share with participants)`);
    console.log(`\nShare this code with others: "${space.code}"`);
    console.log('They can join with: nm here <code>');
}
