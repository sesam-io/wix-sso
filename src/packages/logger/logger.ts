export const getLoggerFn =
  (enabled = false, prefix = "SSO Flow") =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (title: string, ...args: any[]) => {
    if (!enabled) {
      return;
    }

    console.info(
      `${prefix} - ${title}`,
      args.length ? args : "",
      new Date().toLocaleTimeString()
    );
  };
