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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentSpace = setCurrentSpace;
exports.getCurrentSpace = getCurrentSpace;
exports.setLastProfileName = setLastProfileName;
exports.getLastProfileName = getLastProfileName;
exports.getUserId = getUserId;
exports.addPartner = addPartner;
exports.getPartners = getPartners;
exports.clearCurrentSpace = clearCurrentSpace;
exports.saveQuestions = saveQuestions;
exports.getQuestionsPath = getQuestionsPath;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const node_crypto_1 = __importDefault(require("node:crypto"));
// Default state dir = skill root (scripts/../), overridable via env
const STATE_DIR = process.env.NEARMEET_STATE_DIR || path.resolve(__dirname || '.', '..', '..');
const STATE_FILE = path.join(STATE_DIR, 'state.json');
const QUESTIONS_FILE = path.join(STATE_DIR, 'questions.md');
function ensureDir() {
    if (!fs.existsSync(STATE_DIR)) {
        fs.mkdirSync(STATE_DIR, { recursive: true });
    }
}
function read() {
    ensureDir();
    try {
        return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    }
    catch {
        return {};
    }
}
function write(state) {
    ensureDir();
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}
function setCurrentSpace(space, password) {
    const state = read();
    state.currentSpace = {
        code: space.code,
        name: space.name,
        location: space.location,
        password: password || space.password,
    };
    write(state);
}
function getCurrentSpace() {
    return read().currentSpace;
}
function setLastProfileName(name) {
    const state = read();
    state.lastProfileName = name;
    write(state);
}
function getLastProfileName() {
    return read().lastProfileName;
}
function getUserId() {
    const state = read();
    if (state.userId)
        return state.userId;
    // generate on first use
    const id = 'nm_' + node_crypto_1.default.randomBytes(6).toString('hex');
    state.userId = id;
    write(state);
    return id;
}
function addPartner(name) {
    const state = read();
    if (!state.partners)
        state.partners = [];
    if (!state.partners.includes(name))
        state.partners.push(name);
    write(state);
}
function getPartners() {
    return read().partners || [];
}
function clearCurrentSpace() {
    const state = read();
    // Preserve userId and partners — only clear space info
    write({ userId: state.userId, partners: state.partners || [] });
    // Clean up questions.md
    try {
        fs.unlinkSync(QUESTIONS_FILE);
    }
    catch { /* ok */ }
}
function saveQuestions(content) {
    ensureDir();
    if (content && content.trim()) {
        fs.writeFileSync(QUESTIONS_FILE, content, 'utf-8');
    }
    else {
        try {
            fs.unlinkSync(QUESTIONS_FILE);
        }
        catch { /* ok */ }
    }
}
function getQuestionsPath() {
    return QUESTIONS_FILE;
}
