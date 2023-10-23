import { SiteIds } from "./constants";

export type FormType = "login" | "logout";

export type SiteId = keyof typeof SiteIds;

export type Sites = {
  [key: string]: {
    title: string;
    logoUrl?: string;
    logIn: {
      subTitle: string;
    };
    signup: {
      subTitle: string;
    };
  };
};
