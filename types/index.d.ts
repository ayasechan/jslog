export interface Writer {
    write(ctx: Record<string, unknown>): void;
}
export declare class Logger {
    #private;
    writer: Writer | null;
    constructor(mod: string, baseCtx: Record<string, unknown>);
    get mod(): string;
    _print: (ctx: Record<string, unknown>) => void;
    debug: (msg: string, ctx: Record<string, unknown>) => void;
    warn: (msg: string, ctx: Record<string, unknown>) => void;
    info: (msg: string, ctx: Record<string, unknown>) => void;
    error: (msg: string, ctx: Record<string, unknown>) => void;
    child: (ctx: Record<string, unknown>) => Logger;
    dump: () => Record<string, unknown>[];
}
