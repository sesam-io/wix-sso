import { getLoggerFn } from "packages/logger/logger";
import {
  buildPowerOfficeLogo,
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

  const promptLogoCenter = document.getElementById(
    LOGO_IMG_ID
  ) as HTMLImageElement;

  const isPowerOffice = SiteIds.powerofficego.toLowerCase() === siteId;

  if (
    [
      SiteIds.superoffice.toLowerCase(),
      SiteIds["superoffice-test"].toLowerCase(),
      SiteIds.tripletex.toLowerCase(),
      SiteIds["tripletex-test"].toLowerCase(),
    ].includes(siteId)
  ) {
    addPoweredBySesamImg(promptLogoCenter);
  } else if (isPowerOffice) {
    buildPowerOfficeLogo();
  }

  if (!isPowerOffice) {
    brandLogo(promptLogoCenter, site.logoUrl);
  }

  brandTitle(
    formType === "login" ? site.loginSubTitle : site.signupSubTitle,
    site.titleClassName
  );
}
