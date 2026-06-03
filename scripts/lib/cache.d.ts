import type { ProfileEntry, ProfileIndexEntry } from './types.js';
export declare function saveProfile(profile: ProfileEntry): void;
export declare function saveProfiles(profiles: ProfileEntry[]): void;
export declare function listCachedProfiles(): string[];
export declare function getCachedProfile(name: string): string | null;
export declare function saveTimestamps(index: ProfileIndexEntry[]): void;
export declare function getCachedTimestamps(): Record<string, string>;
