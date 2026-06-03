"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questions = questions;
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function questions(input, options) {
    const current = (0, location_js_1.getCurrentSpace)();
    if (!current) {
        console.log('No current space. Use `nm here <code>` first.');
        return;
    }
    const password = current.password;
    if (options.set) {
        try {
            const fs = require('node:fs');
            const content = fs.readFileSync(options.set, 'utf-8');
            const from = (0, location_js_1.getLastProfileName)() || 'anonymous';
            const userId = (0, location_js_1.getUserId)();
            await (0, api_js_1.updateQuestions)(current.code, content, from, password, userId);
            (0, location_js_1.saveQuestions)(content);
            console.log(`Questions updated for space "${current.name}".`);
        }
        catch (e) {
            console.log(`Error: ${e.message}`);
        }
        return;
    }
    try {
        const space = await (0, api_js_1.getSpace)(current.code);
        if (space.questions) {
            console.log(`--- Questions for "${current.name}" ---\n`);
            console.log(space.questions);
        }
        else {
            console.log(`No questions set for space "${current.name}".`);
            console.log('Set questions with: nm questions --set <file>');
        }
    }
    catch (e) {
        console.log(`Error: ${e.message}`);
    }
}
