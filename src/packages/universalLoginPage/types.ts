import { SiteIds } from "./constants";

export type FormType = "login" | "logout" | "signup";

export type SiteId = keyof typeof SiteIds;

export type Site = {
  id: string;
  logoUrl?: string;
  loginSubTitle: string;
  signupSubTitle: string;
};

type SiteIdKey = keyof typeof SiteIds;

export type Sites = {
  [key in SiteIdKey]: Site;
};
