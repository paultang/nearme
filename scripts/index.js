#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const here_js_1 = require("./commands/here.js");
const share_js_1 = require("./commands/share.js");
const unshare_js_1 = require("./commands/unshare.js");
const list_js_1 = require("./commands/list.js");
const download_js_1 = require("./commands/download.js");
const refresh_js_1 = require("./commands/refresh.js");
const create_js_1 = require("./commands/create.js");
const close_js_1 = require("./commands/close.js");
const message_js_1 = require("./commands/message.js");
const inbox_js_1 = require("./commands/inbox.js");
const notice_js_1 = require("./commands/notice.js");
const board_js_1 = require("./commands/board.js");
const network_js_1 = require("./commands/network.js");
const partner_js_1 = require("./commands/partner.js");
const view_js_1 = require("./commands/view.js");
const questions_js_1 = require("./commands/questions.js");
const spaces_js_1 = require("./commands/spaces.js");
const [cmd, ...args] = process.argv.slice(2);
// Parse --key value options from args
function popFlag(key) {
    const idx = args.findIndex(a => a === `--${key}`);
    if (idx === -1)
        return undefined;
    const val = args.splice(idx, 2)[1];
    return val;
}
switch (cmd) {
    case 'here': {
        const pass = popFlag('pass');
        (0, here_js_1.here)(args[0] || '', { pass });
        break;
    }
    case 'share':
        (0, share_js_1.share)(args[0]);
        break;
    case 'unshare':
        (0, unshare_js_1.unshare)();
        break;
    case 'list':
        (0, list_js_1.list)();
        break;
    case 'download': {
        const space = popFlag('space');
        (0, download_js_1.download)(args.join(' '), { space });
        break;
    }
    case 'spaces':
        (0, spaces_js_1.spaces)();
        break;
    case 'refresh':
        (0, refresh_js_1.refresh)();
        break;
    case 'create': {
        const code = popFlag('code');
        const loc = popFlag('loc');
        const tags = popFlag('tags');
        const pass = popFlag('pass');
        (0, create_js_1.create)(args.join(' ') || '', { code, location: loc, tags, pass });
        break;
    }
    case 'message':
        (0, message_js_1.message)(args[0] || '', args.slice(1).join(' '));
        break;
    case 'inbox':
        (0, inbox_js_1.inbox)();
        break;
    case 'notice':
        (0, notice_js_1.notice)(args.join(' '));
        break;
    case 'board':
        (0, board_js_1.board)();
        break;
    case 'network':
        (0, network_js_1.network)();
        break;
    case 'partner':
        (0, partner_js_1.partner)(args[0]);
        break;
    case 'view':
        (0, view_js_1.view)(args[0]);
        break;
    case 'questions': {
        const set = popFlag('set');
        (0, questions_js_1.questions)(args.join(' '), { set });
        break;
    }
    case 'close':
        (0, close_js_1.close)();
        break;
    default:
        console.log('NearMeet CLI — Share MD profiles with people nearby');
        console.log('');
        console.log('Commands:');
        console.log('  here <code|desc> [--pass <pwd>]   Locate a space');
        console.log('  share <path>                       Upload profile');
        console.log('  unshare                            Remove profile');
        console.log('  list                               List people');
        console.log('  download                           Download profiles');
        console.log('  refresh                            Check new people');
        console.log('  create <name> [--code] [--pass]    Create space');
        console.log('  message <name> <text>              Send message');
        console.log('  inbox                              Read messages');
        console.log('  notice [text]                      Post/view notices');
        console.log('  board                              View notice board');
        console.log('  network                            View interactions');
        console.log('  partner <name>                     Add partner');
        console.log('  close                              Close space');
}
