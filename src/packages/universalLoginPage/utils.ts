import { SesamDefaultSite, WixSites } from "./sites";
import { FormType, SiteId } from "./types";

const getWixSiteFn = (wixSites: typeof WixSites) => (siteId: SiteId) => {
  const site = wixSites.find(
    (site) => site.baseId === siteId || site.id === siteId
  );

  if (!site) {
    return SesamDefaultSite;
  }

  return site;
};

export const getSite = getWixSiteFn(WixSites);

export const getDefaultPageTitle = (formType: FormType) => {
  if (formType === "login") {
    return SesamDefaultSite.defaultLoginTitle
      ? SesamDefaultSite.defaultLoginTitle
      : SesamDefaultSite.loginSubTitle;
  }

  return SesamDefaultSite.defaultSignupTitle
    ? SesamDefaultSite.defaultSignupTitle
    : SesamDefaultSite.signupSubTitle;
};
