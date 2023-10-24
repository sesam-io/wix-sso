import { SiteIds, WixSites } from "./constants";
import { FormType, SiteId } from "./types";

export const getWixSite = (siteId: SiteId) => {
  const site = WixSites[siteId];

  if (!site) {
    return WixSites.sesam;
  }

  return site;
};

export const getSiteTitle = (formType: FormType, siteId: SiteId) => {
  console.info(`SSO Flow - ULP - site_id: ${siteId}`);
  console.info(`SSO Flow - ULP - form type: ${formType}`);

  const site = WixSites[siteId];

  if (!site) {
    return formType === "login"
      ? WixSites.sesam.loginSubTitle
      : WixSites.sesam.signupSubTitle;
  }

  return formType === "login" ? site.loginSubTitle : site.signupSubTitle;

  //   let pageTitle =
  //     formType === "login"
  //       ? "Log in to Sesam Talk."
  //       : "Sign Up to Sesam Talk to continue to Sesam Talk.";

  //   const pTags = document.getElementsByTagName("p") ?? {};

  //   Array.from(pTags)?.forEach((pTag) => {
  //     if (pTag.textContent?.toLowerCase() === pageTitle.toLowerCase()) {
  //       if (siteId === SiteIds.superoffice) {
  //         pTag.innerText =
  //           formType === "login"
  //             ? "Log in to SuperOffice Data Sync."
  //             : "Sign Up to SuperOffice Data Sync.";
  //         pTag.className = "superofficeLogInTitle";
  //       } else {
  //         pTag.innerText = `${
  //           formType === "login" ? "Log in" : "Sign up"
  //         } to Making ${WixSites[siteId].title} Talk.`;
  //       }
  //     }
  //   });
};
