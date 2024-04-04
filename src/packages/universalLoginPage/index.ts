import { getLoggerFn } from "packages/logger/logger";
import {
  buildBrandedHorizontalLogo,
  addPoweredBySesamImg,
  brandLogo,
  getBrandTitleFn,
  getDefaultPageTitle,
  getWixSite,
} from "./brandForm";
import { LOGO_IMG_ID } from "./constants";
import { BrandedSiteIds, SiteIds } from "./siteIds";
import { getBaseSiteId, isInBrandedSites } from "./utils";

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
    const baseSiteId = getBaseSiteId(siteId);

    isPowerOffice
      ? buildBrandedHorizontalLogo(
          promptLogoCenter,
          `https://raw.githubusercontent.com/sesam-io/wix-sso/main/src/packages/universalLoginPage/${baseSiteId}-logo.html`
        )
      : addPoweredBySesamImg(promptLogoCenter);
  }

  brandLogo(promptLogoCenter, site.logoUrl);

  brandTitle(
    formType === "login" ? site.loginSubTitle : site.signupSubTitle,
    site.titleClassName
  );
}
