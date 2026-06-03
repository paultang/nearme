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
exports.share = share;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const api_js_1 = require("../lib/api.js");
const location_js_1 = require("../lib/location.js");
function parseFrontmatterName(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match)
        return null;
    for (const line of match[1].split('\n')) {
        const kv = line.match(/^name:\s*(.+)/);
        if (kv)
            return kv[1].trim();
    }
    return null;
}
async function share(profilePath) {
    const space = (0, location_js_1.getCurrentSpace)();
    if (!space) {
        console.log('No current space. Use `nm here <code|description>` first.');
        return;
    }
    if (!profilePath) {
        console.log('Usage: nm share <path-to-profile.md>');
        return;
    }
    const resolvedPath = path.resolve(profilePath);
    if (!fs.existsSync(resolvedPath)) {
        console.log(`File not found: ${resolvedPath}`);
        return;
    }
    const content = fs.readFileSync(resolvedPath, 'utf-8');
    // Parse name from YAML frontmatter; fall back to filename
    const name = parseFrontmatterName(content) || path.basename(resolvedPath, '.md');
    console.log(`Uploading profile "${name}" to ${space.name}...`);
    const userId = (0, location_js_1.getUserId)();
    const result = await (0, api_js_1.uploadProfile)(space.code, name, content, space.password, userId);
    (0, location_js_1.setLastProfileName)(name);
    const total = result.profiles.length;
    console.log(`Uploaded! Current space has ${total} person(s).`);
    console.log('Run `nm list` to see who\'s here, or `nm download` to save profiles locally.');
}
