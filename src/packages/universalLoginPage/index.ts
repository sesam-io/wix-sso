import { getLoggerFn } from "packages/logger/logger";
import {
  addPoweredBySesamImg,
  brandLogo,
  getBrandTitleFn,
  getDefaultPageTitle,
  getWixSite,
} from "./brandForm";
import { LOGO_IMG_ID, SiteIds } from "./constants";

const enabled = Boolean(localStorage.getItem("_log_"));
export const log = getLoggerFn(enabled, "ULP Flow");

if (window.ulpState) {
  const { siteId, formType } = window.ulpState;
  log("ulpState", window.ulpState);

  const site = getWixSite(siteId);

  const brandTitle = getBrandTitleFn(
    document.getElementsByTagName("p") ?? {},
    getDefaultPageTitle(formType)
  );

  const imgElement = document.getElementById(LOGO_IMG_ID) as HTMLImageElement;

  if (
    [
      SiteIds.superoffice.toLowerCase(),
      SiteIds.tripletex.toLowerCase(),
    ].includes(siteId)
  ) {
    addPoweredBySesamImg(imgElement);
  }

  brandLogo(imgElement, site.logoUrl);

  brandTitle(
    formType === "login" ? site.loginSubTitle : site.signupSubTitle,
    site.titleClassName
  );
}
