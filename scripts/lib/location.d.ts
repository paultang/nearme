import type { SpaceMeta } from './types.js';
interface State {
    currentSpace?: {
        code: string;
        name: string;
        location?: string;
        password?: string;
    };
    lastProfileName?: string;
    userId?: string;
    partners?: string[];
}
export declare function setCurrentSpace(space: SpaceMeta, password?: string): void;
export declare function getCurrentSpace(): State['currentSpace'] | undefined;
export declare function setLastProfileName(name: string): void;
export declare function getLastProfileName(): string | undefined;
export declare function getUserId(): string;
export declare function addPartner(name: string): void;
export declare function getPartners(): string[];
export declare function clearCurrentSpace(): void;
export {};
