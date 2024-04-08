import { v4 as uuidv4 } from "uuid";
import { getLoggerFn } from "packages/logger/logger";
import {
  buildBrandedHorizontalLogo,
  addPoweredBySesamImg,
  brandLogo,
  getBrandTitleFn,
} from "./brandForm";
import { LOGO_IMG_ID } from "./constants";
import { getDefaultPageTitle, getWixSite } from "./utils";

const enabled = Boolean(localStorage.getItem("_log_"));
export const log = getLoggerFn(enabled, "ULP Flow");

const run = () => {
  if (!window.ulpState) {
    log("no site id found!", window.ulpState);
    return;
  }

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

  if (site.html) {
    buildBrandedHorizontalLogo(
      promptLogoCenter,
      `https://raw.githubusercontent.com/sesam-io/wix-sso/main/src/packages/universalLoginPage/html/${
        site.html
      }?v=${uuidv4()}`
    );
  }

  if (site.isBrandLogo) {
    brandLogo(promptLogoCenter, site.logoUrl);
  }

  if (site.displayPoweredBySesam) {
    addPoweredBySesamImg(promptLogoCenter);
  }

  brandTitle(
    formType === "login" ? site.loginSubTitle : site.signupSubTitle,
    site.titleClassName
  );
};

run();
