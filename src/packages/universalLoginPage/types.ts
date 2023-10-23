import { SiteIds } from "./constants";

export type FormType = "login" | "logout";

export type SiteId = keyof typeof SiteIds;
