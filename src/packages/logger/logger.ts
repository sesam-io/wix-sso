const getLoggerFn =
  (enabled = false) =>
  (title: string, ...args: any[]) => {
    if (!enabled) {
      return;
    }

    console.info(
      `SSO FLow - ${title}`,
      args.length ? args : "",
      new Date().toLocaleTimeString()
    );
  };

const enabled = Boolean(localStorage.getItem("_log_"));

export const log = getLoggerFn(enabled);
