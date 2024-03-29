import { getLoggerFn } from "packages/logger/logger";
import {
  buildPowerOfficeLogo,
  addPoweredBySesamImg,
  brandLogo,
  getBrandTitleFn,
  getDefaultPageTitle,
  getWixSite,
} from "./brandForm";
import { LOGO_IMG_ID } from "./constants";
import { BrandedSiteIds, SiteIds } from "./siteIds";
import { isInBrandedSites } from "./utils";

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

  if (isInBrandedSites(BrandedSiteIds, siteId)) {
    isPowerOffice
      ? buildPowerOfficeLogo(promptLogoCenter)
      : addPoweredBySesamImg(promptLogoCenter);
  }

  brandLogo(promptLogoCenter, site.logoUrl);

  brandTitle(
    formType === "login" ? site.loginSubTitle : site.signupSubTitle,
    site.titleClassName
  );
}
