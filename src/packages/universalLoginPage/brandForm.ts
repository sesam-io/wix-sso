import { SiteIds, WixSites } from "./constants";
import { FormType, Site, SiteId } from "./types";

export const getWixSite = (siteId: SiteId) => {
  const site = WixSites[siteId];

  if (!site) {
    return WixSites.sesam;
  }

  return site;
};

export const getDefaultPageTitle = (formType: FormType, siteId: SiteId) =>
  formType === "login"
    ? WixSites.sesam.loginSubTitle
    : WixSites.sesam.signupSubTitle;

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
};

export const brandLogo = () => {};

export const getBrandTitleFn =
  (pTags: HTMLCollectionOf<HTMLParagraphElement>, defaultPageTitle: string) =>
  (subTitle: string, titleClassName?: string) => {
    Array.from(pTags)?.forEach((pTag) => {
      if (pTag.textContent?.toLowerCase() === defaultPageTitle.toLowerCase()) {
        pTag.innerText = subTitle;

        if (titleClassName) {
          pTag.className = titleClassName;
        }
      }
    });
  };
