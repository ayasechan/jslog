export interface Writer {
  write(ctx: Record<string, unknown>): void;
}

const consoleWriter: Writer = {
  write: (ctx: Record<string, unknown>) => {
    if (typeof window === "undefined") {
      console.log(JSON.stringify(ctx));
    } else {
      const buf = [];
      for (const [k, v] of Object.entries(ctx)) {
        buf.push(`%c${k}%c=%c${JSON.stringify(v)}`);
      }
      const baseColors = ["color: green", "color: black", "color: orangered"];
      const colors = buf.reduce<string[]>((pre) => [...pre, ...baseColors], []);
      console.log(buf.join(" "), ...colors);
    }
  },
};
export class Logger {
  private history: Record<string, unknown>[];
  private mod: string;
  private baseCtx: Record<string, unknown>;
  writer: Writer | null;
  constructor(mod: string, baseCtx: Record<string, unknown>) {
    this.history = [];
    this.mod = mod;
    this.baseCtx = baseCtx;
    this.writer = null;
  }
  _print = (ctx: Record<string, unknown>) => {
    ctx = { mod: ctx.mod ?? this.mod, ...this.baseCtx, ...ctx };
    this.history.push(ctx);
    const writeFn = this.writer?.write ?? consoleWriter.write;
    writeFn(ctx);
  };
  debug = (msg: string, ctx: Record<string, unknown>) => {
    this._print({ msg, lvl: "debug", ...ctx });
  };
  warn = (msg: string, ctx: Record<string, unknown>) => {
    this._print({ msg, lvl: "warn", ...ctx });
  };
  info = (msg: string, ctx: Record<string, unknown>) => {
    this._print({ msg, lvl: "info", ...ctx });
  };
  error = (msg: string, ctx: Record<string, unknown>) => {
    this._print({ msg, lvl: "error", ...ctx });
  };
  child = (ctx: Record<string, unknown>) => {
    const l = new Logger(this.mod, { ...this.baseCtx, ...ctx });
    l.writer = this.writer;
    return l;
  };
  dump = () => {
    return [...this.history];
  };
}
