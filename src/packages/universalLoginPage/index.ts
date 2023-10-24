import {
  brandLogo,
  getBrandTitleFn,
  getDefaultPageTitle,
  getWixSite,
} from "./brandForm";
import { LOGO_IMG_ID, SiteIds } from "./constants";

const formType = "{{prompt.name}}";
const siteId = "{{transaction.params.ext-site_id}}" || SiteIds.sesam;

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
