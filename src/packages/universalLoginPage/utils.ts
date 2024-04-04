import { SiteIds } from "./siteIds";

export const isInBrandedSites = (siteIds: string[], siteId: string) =>
  siteIds.includes(siteId);

export const getBaseSiteIdFn =
  (siteIds: typeof SiteIds) => (siteId?: string) => {
    if (siteId?.toLowerCase().startsWith(siteIds.tripletex.toLowerCase())) {
      return "tripletex";
    }

    if (siteId?.toLowerCase().startsWith(siteIds.powerofficego.toLowerCase())) {
      return "poweroffice";
    }

    return "";
  };

export const getBaseSiteId = getBaseSiteIdFn(SiteIds);
