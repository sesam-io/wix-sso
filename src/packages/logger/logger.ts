export const getLoggerFn =
  (enabled = false, prefix = "SSO Flow") =>
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
