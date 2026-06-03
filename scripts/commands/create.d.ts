interface CreateOptions {
    code?: string;
    location?: string;
    tags?: string;
    pass?: string;
}
export declare function create(name: string, options: CreateOptions): Promise<void>;
export {};
