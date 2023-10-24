import { getLoggerFn } from "packages/logger/logger";
import { LOG_STORAGE_KEY } from "./constants";

const enabled = Boolean(localStorage.getItem(LOG_STORAGE_KEY));

export const log = getLoggerFn(enabled);
