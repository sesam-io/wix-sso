// import { SiteIds } from "./siteIds";
import { SiteIds } from "./siteIds";

export type ValueOf<T> = T[keyof T];

export type FormType = "login" | "logout" | "signup";

export type SiteId = ValueOf<typeof SiteIds>;

export type Site = {
  id: SiteId;
  baseId?: SiteId;
  name: string;
  logoUrl?: string;
  loginSubTitle: string;
  signupSubTitle: string;
  titleClassName?: string;
  html?: string;
};

export type Sites = Site[];
