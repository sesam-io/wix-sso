import { WixSites } from "./constants";
import { FormType, SiteId } from "./types";

export const getWixSite = (siteId: SiteId) => {
  const site = WixSites[siteId];

  if (!site) {
    return WixSites.sesam;
  }

  return site;
};

export const getDefaultPageTitle = (formType: FormType) =>
  formType === "login"
    ? WixSites.sesam.loginSubTitle
    : WixSites.sesam.signupSubTitle;

export const brandLogo = (imgElement: HTMLImageElement, logoUrl?: string) => {
  if (logoUrl) {
    imgElement.src = logoUrl;
  }
};

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
