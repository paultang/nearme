"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
        // Upload mode: read file and update server
        try {
            const fs = await Promise.resolve().then(() => __importStar(require('node:fs')));
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
    // Display mode: fetch from server
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
