import { SiteIds } from "./constants";
import { FormType, SiteId } from "./types";

export const getSiteDefaultTitle = (formType: FormType, siteId: SiteId) => {
  if (siteId !== SiteIds.sesam) {
    let pageTitle =
      formType === "login"
        ? "Log in to Sesam Talk."
        : "Sign Up to Sesam Talk to continue to Sesam Talk.";

    return pageTitle;
  }

  return "Log in to Sesam Talk.";
};
