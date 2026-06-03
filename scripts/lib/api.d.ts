import type { SpaceMeta, CreateSpaceRequest, UploadProfileResponse, DownloadProfilesResponse, Message, SendMessageRequest, ProfileIndexEntry } from './types.js';
export declare function listSpaces(q?: string): Promise<SpaceMeta[]>;
export declare function getSpace(code: string): Promise<SpaceMeta>;
export declare function createSpace(body: CreateSpaceRequest): Promise<SpaceMeta>;
export declare function uploadProfile(code: string, name: string, content: string, password?: string, userId?: string): Promise<UploadProfileResponse>;
export declare function listProfiles(code: string): Promise<{
    profiles: ProfileIndexEntry[];
    creator?: string;
    partners?: string[];
}>;
export declare function closeSpace(code: string, from: string, password?: string): Promise<{
    status: string;
}>;
export declare function addPartner(code: string, from: string, target: string, password?: string): Promise<{
    partners: string[];
}>;
export declare function getProfile(code: string, name: string): Promise<{
    name: string;
    content: string;
}>;
export declare function downloadProfiles(code: string): Promise<DownloadProfilesResponse>;
export declare function deleteProfile(code: string, name: string): Promise<void>;
export declare function sendMessage(code: string, msg: SendMessageRequest, password?: string): Promise<Message>;
export declare function getInbox(code: string, name: string): Promise<{
    messages: Message[];
}>;
export declare function postNotice(code: string, from: string, content: string, password?: string): Promise<{
    status: string;
}>;
export declare function getNetwork(code: string, from: string): Promise<{
    connections: {
        from: string;
        to: string;
    }[];
}>;
export declare function getBoard(code: string): Promise<{
    notices: {
        from: string;
        content: string;
        createdAt: string;
    }[];
}>;
