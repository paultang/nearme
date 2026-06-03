export interface SpaceMeta {
    code: string;
    name: string;
    location?: string;
    creator: string;
    createdAt: string;
    lastActiveAt: string;
    tags?: string[];
    password?: string;
    requiresPassword?: boolean;
    partners?: string[];
}
export interface ProfileEntry {
    name: string;
    content: string;
    createdAt: string;
    userId?: string;
}
export interface CreateSpaceRequest {
    name: string;
    code?: string;
    location?: string;
    tags?: string[];
    password?: string;
    creator?: string;
}
export interface UploadProfileRequest {
    name: string;
    content: string;
    password?: string;
    userId?: string;
}
export interface ProfileIndexEntry {
    name: string;
    updatedAt: string;
    userId?: string;
}
export interface UploadProfileResponse {
    profiles: ProfileIndexEntry[];
}
export interface DownloadProfilesResponse {
    profiles: ProfileEntry[];
}
export interface Message {
    id: string;
    from: string;
    to: string;
    content: string;
    createdAt: string;
}
export interface SendMessageRequest {
    from: string;
    to: string;
    content: string;
}
