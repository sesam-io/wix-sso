import { getLoggerFn } from "packages/logger/logger";
import {
  brandLogo,
  getBrandTitleFn,
  getDefaultPageTitle,
  getWixSite,
} from "./brandForm";
import { LOGO_IMG_ID } from "./constants";

const enabled = Boolean(localStorage.getItem("_log_"));
export const log = getLoggerFn(enabled, "ulp");

if (window.ulpState) {
  const { siteId, formType } = window.ulpState;
  log("siteId", siteId);
  log("formType", formType);

  const site = getWixSite(siteId);

  const brandTitle = getBrandTitleFn(
    document.getElementsByTagName("p") ?? {},
    getDefaultPageTitle(formType)
  );

  const imgElement = document.getElementById(LOGO_IMG_ID) as HTMLImageElement;

  brandLogo(imgElement, site.logoUrl);

  brandTitle(
    formType === "login" ? site.loginSubTitle : site.signupSubTitle,
    site.titleClassName
  );
}
