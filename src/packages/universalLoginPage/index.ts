import {
  brandLogo,
  getBrandTitleFn,
  getDefaultPageTitle,
  getWixSite,
} from "./brandForm";
import { LOGO_IMG_ID, SiteIds } from "./constants";

// const formType = "{{prompt.name}}";
// const siteId = "{{transaction.params.ext-site_id}}" || SiteIds.sesam;

// @ts-ignore
if (window.formType && window.siteId) {
  // @ts-ignore
  const site = getWixSite(window.siteId);

  const brandTitle = getBrandTitleFn(
    document.getElementsByTagName("p") ?? {},
    // @ts-ignore
    getDefaultPageTitle(window.formType, window.siteId)
  );

  const imgElement = document.getElementById(LOGO_IMG_ID) as HTMLImageElement;

  brandLogo(imgElement, site.logoUrl);

  brandTitle(site.loginSubTitle);
}
