import { v4 as uuidv4 } from "uuid";
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
import { getBaseSiteId } from "./utils";

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

  const brandedSiteId = getBaseSiteId(siteId);

  if (brandedSiteId) {
    buildBrandedHorizontalLogo(
      promptLogoCenter,
      `https://raw.githubusercontent.com/sesam-io/wix-sso/main/src/packages/universalLoginPage/${brandedSiteId}-logo.html?v=${uuidv4()}`
    );
  } else if (siteId === "wave") {
    brandLogo(promptLogoCenter, site.logoUrl);
  } else {
    addPoweredBySesamImg(promptLogoCenter);
  }

  brandTitle(
    formType === "login" ? site.loginSubTitle : site.signupSubTitle,
    site.titleClassName
  );
}
