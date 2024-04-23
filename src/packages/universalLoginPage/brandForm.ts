import { BASE_LOGO_URL, MAKING_SERVICE_TALK_HTML_TEMPLATE } from "./constants";

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
  htmlLogoUrl: string,
  htmlFileName?: string
) => {
  const poweredBySesamWrapper = document.createElement("div");

  await fetch(htmlLogoUrl)
    .then((response) => response.text())
    .then((text) => {
      poweredBySesamWrapper.innerHTML = text;
      poweredBySesamWrapper.style.display = "flex";
      poweredBySesamWrapper.style.justifyContent = "center";

      if (htmlFileName === MAKING_SERVICE_TALK_HTML_TEMPLATE) {
        const span = document.getElementById(
          "spanServiceName"
        ) as HTMLSpanElement;
        span ? (span.innerHTML = `Making ${text} `) : undefined;
      }
    });

  insertElementAfter(imgElement, poweredBySesamWrapper);
  imgElement.remove();
};
