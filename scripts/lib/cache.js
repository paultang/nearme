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
exports.saveProfile = saveProfile;
exports.saveProfiles = saveProfiles;
exports.listCachedProfiles = listCachedProfiles;
exports.getCachedProfile = getCachedProfile;
exports.saveTimestamps = saveTimestamps;
exports.getCachedTimestamps = getCachedTimestamps;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const CACHE_DIR = process.env.NEARMEET_CACHE_DIR || '.';
function ensureDir() {
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
}
function profilePath(name) {
    const safe = name.replace(/[^a-zA-Z0-9_\-一-鿿]/g, '_');
    return path.join(CACHE_DIR, `${safe}.md`);
}
function saveProfile(profile) {
    ensureDir();
    fs.writeFileSync(profilePath(profile.name), profile.content);
}
function saveProfiles(profiles) {
    ensureDir();
    for (const p of profiles) {
        saveProfile(p);
    }
}
function listCachedProfiles() {
    if (!fs.existsSync(CACHE_DIR))
        return [];
    return fs.readdirSync(CACHE_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => f.replace(/\.md$/, ''));
}
function getCachedProfile(name) {
    const fp = profilePath(name);
    if (!fs.existsSync(fp))
        return null;
    return fs.readFileSync(fp, 'utf-8');
}
// --- timestamps ---
const TIMESTAMPS_FILE = '_timestamps.json';
function saveTimestamps(index) {
    ensureDir();
    const map = {};
    for (const e of index) {
        map[e.name] = e.updatedAt;
    }
    fs.writeFileSync(path.join(CACHE_DIR, TIMESTAMPS_FILE), JSON.stringify(map, null, 2));
}
function getCachedTimestamps() {
    const fp = path.join(CACHE_DIR, TIMESTAMPS_FILE);
    try {
        return JSON.parse(fs.readFileSync(fp, 'utf-8'));
    }
    catch {
        return {};
    }
}
