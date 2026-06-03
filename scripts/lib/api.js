"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSpaces = listSpaces;
exports.getSpace = getSpace;
exports.createSpace = createSpace;
exports.uploadProfile = uploadProfile;
exports.listProfiles = listProfiles;
exports.closeSpace = closeSpace;
exports.addPartner = addPartner;
exports.getProfile = getProfile;
exports.downloadProfiles = downloadProfiles;
exports.deleteProfile = deleteProfile;
exports.sendMessage = sendMessage;
exports.getInbox = getInbox;
exports.postNotice = postNotice;
exports.getNetwork = getNetwork;
exports.getBoard = getBoard;
const BASE_URL = process.env.NEARMEET_API_URL || 'https://story-9ghdavb90e1aeb73-1375229540.ap-shanghai.app.tcloudbase.com/nearmeet';
async function request(path, options) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${text}`);
    }
    // handle 204 No Content
    if (res.status === 204)
        return undefined;
    return res.json();
}
function listSpaces(q) {
    const query = q ? `?q=${encodeURIComponent(q)}` : '';
    return request(`/api/spaces${query}`);
}
function getSpace(code) {
    return request(`/api/spaces/${encodeURIComponent(code)}`);
}
function createSpace(body) {
    return request('/api/spaces', { method: 'POST', body: JSON.stringify(body) });
}
function uploadProfile(code, name, content, password, userId) {
    return request(`/api/spaces/${encodeURIComponent(code)}/profiles`, {
        method: 'POST',
        body: JSON.stringify({ name, content, password, userId }),
    });
}
function listProfiles(code) {
    return request(`/api/spaces/${encodeURIComponent(code)}/profiles`);
}
function closeSpace(code, from, password) {
    return request(`/api/spaces/${encodeURIComponent(code)}`, {
        method: 'DELETE',
        body: JSON.stringify({ from }),
    });
}
function addPartner(code, from, target, password) {
    return request(`/api/spaces/${encodeURIComponent(code)}/partner`, {
        method: 'POST',
        body: JSON.stringify({ from, target, password }),
    });
}
function getProfile(code, name) {
    return request(`/api/spaces/${encodeURIComponent(code)}/profiles/${encodeURIComponent(name)}`);
}
function downloadProfiles(code) {
    return request(`/api/spaces/${encodeURIComponent(code)}/profiles/download`);
}
function deleteProfile(code, name) {
    return request(`/api/spaces/${encodeURIComponent(code)}/profiles/${encodeURIComponent(name)}`, {
        method: 'DELETE',
    });
}
function sendMessage(code, msg, password) {
    return request(`/api/spaces/${encodeURIComponent(code)}/messages`, {
        method: 'POST',
        body: JSON.stringify({ ...msg, password }),
    });
}
function getInbox(code, name) {
    return request(`/api/spaces/${encodeURIComponent(code)}/messages/${encodeURIComponent(name)}`);
}
function postNotice(code, from, content, password) {
    return request(`/api/spaces/${encodeURIComponent(code)}/board`, {
        method: 'POST',
        body: JSON.stringify({ from, content, password }),
    });
}
function getNetwork(code, from) {
    return request(`/api/spaces/${encodeURIComponent(code)}/network?from=${encodeURIComponent(from)}`);
}
function getBoard(code) {
    return request(`/api/spaces/${encodeURIComponent(code)}/board`);
}
