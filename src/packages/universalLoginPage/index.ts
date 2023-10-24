import { getBrandTitleFn, getDefaultPageTitle, getWixSite } from "./brandForm";
import { SiteIds } from "./constants";

const formType = "{{prompt.name}}";
const siteId = "{{transaction.params.ext-site_id}}" || SiteIds.sesam;

const brandTitle = getBrandTitleFn(
  document.getElementsByTagName("p") ?? {},
  // @ts-ignore
  getDefaultPageTitle(formType, siteId)
);

// @ts-ignore
brandTitle(getWixSite(siteId));
