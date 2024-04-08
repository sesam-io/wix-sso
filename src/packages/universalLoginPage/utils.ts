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

export const getWixSite = getWixSiteFn(WixSites);

export const getDefaultPageTitle = (formType: FormType) =>
  formType === "login"
    ? SesamDefaultSite.loginSubTitle
    : SesamDefaultSite.signupSubTitle;
