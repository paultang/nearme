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
exports.create = create;
const fs = __importStar(require("node:fs"));
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
async function create(name, options) {
    if (!name) {
        console.log('Usage: nm create "<name>" [--code <code>] [--loc <location>] [--tags <tags>] [--pass <password>] [--questions <file>]');
        return;
    }
    const tags = options.tags
        ? options.tags.split(',').map(t => t.trim()).filter(Boolean)
        : undefined;
    let questions;
    if (options.questions) {
        try {
            questions = fs.readFileSync(options.questions, 'utf-8');
        }
        catch (e) {
            console.log(`Error reading questions file: ${e.message}`);
            return;
        }
    }
    const space = await (0, api_js_1.createSpace)({
        name,
        code: options.code,
        location: options.location,
        tags,
        password: options.pass,
        creator: (0, location_js_1.getLastProfileName)(),
        creatorId: (0, location_js_1.getUserId)(),
        questions,
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
