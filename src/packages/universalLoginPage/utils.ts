import { SiteIds } from "./siteIds";
import { SesamDefaultSite, WixSites } from "./sites";
import { FormType, SiteId } from "./types";

export const isInBrandedSites = (siteIds: string[], siteId: string) =>
  siteIds.includes(siteId);

const getBaseSiteIdFn = (siteIds: typeof SiteIds) => (siteId?: string) => {
  if (siteId?.toLowerCase().startsWith(siteIds.tripletex.toLowerCase())) {
    return "tripletex";
  }

  if (siteId?.toLowerCase().startsWith(siteIds.powerofficego.toLowerCase())) {
    return "poweroffice";
  }

  return "";
};

export const getBaseSiteId = getBaseSiteIdFn(SiteIds);

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
