import { Logger, Writer } from ".";

test("test logger", () => {
  const newTestWriter = (want: Record<string, any>) => {
    const w: Writer = {
      write(ctx) {
        expect(ctx).toStrictEqual(want);
      },
    };
    return w;
  };
  const logger = new Logger("test", { base: 1 });
  logger.writer = newTestWriter({
    base: 1,
    foo: 1,
    lvl: "info",
    mod: "test",
    msg: "foo",
  });
  logger.info("foo", { foo: 1 });

  const childLogger = logger.child({ child: 1 });
  childLogger.writer = newTestWriter({
    base: 1,
    foo: 1,
    lvl: "info",
    mod: "test",
    msg: "foo",
    child: 1,
  });
  childLogger.info("foo", { foo: 1 });
});
