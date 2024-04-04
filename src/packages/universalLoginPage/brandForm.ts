import { BASE_LOGO_URL, WixSites } from "./constants";
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

export const insertElementAfter = (
  referenceNode: HTMLImageElement,
  newNode: HTMLDivElement
) => {
  referenceNode?.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
};

export const addPoweredBySesamImg = (imgElement: HTMLImageElement) => {
  const poweredBySesamWrapper = document.createElement("div");
  const poweredBySesamImg = document.createElement("img");

  poweredBySesamImg.src = `${BASE_LOGO_URL}/sesam/powered-by-sesam.svg`;
  poweredBySesamImg.className = "poweredBySesamImg";
  poweredBySesamWrapper.appendChild(poweredBySesamImg);
  poweredBySesamWrapper.className = "poweredBySesamWrapper";

  insertElementAfter(imgElement, poweredBySesamWrapper);
};

export const buildBrandedHorizontalLogo = async (
  imgElement: HTMLImageElement,
  htmlLogoUrl: string
) => {
  const poweredBySesamWrapper = document.createElement("div");

  fetch(htmlLogoUrl)
    .then((response) => response.text())
    .then((text) => {
      poweredBySesamWrapper.innerHTML = text;
      poweredBySesamWrapper.style.display = "flex";
      poweredBySesamWrapper.style.justifyContent = "center";
    });

  insertElementAfter(imgElement, poweredBySesamWrapper);
  imgElement.remove();
};
