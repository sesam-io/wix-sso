import { LOG_STORAGE_KEY } from "./constants";

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

const enabled = Boolean(localStorage.getItem(LOG_STORAGE_KEY));

export const log = getLoggerFn(enabled);
