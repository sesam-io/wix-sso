import {
  brandLogo,
  getBrandTitleFn,
  getDefaultPageTitle,
  getWixSite,
} from "./brandForm";
import { LOGO_IMG_ID, SiteIds } from "./constants";

// @ts-ignore
if (formType && siteId) {
  // @ts-ignore
  const site = getWixSite(siteId);

  const brandTitle = getBrandTitleFn(
    document.getElementsByTagName("p") ?? {},
    // @ts-ignore
    getDefaultPageTitle(formType, siteId)
  );

  const imgElement = document.getElementById(LOGO_IMG_ID) as HTMLImageElement;

  brandLogo(imgElement, site.logoUrl);

  brandTitle(site.loginSubTitle);
}
