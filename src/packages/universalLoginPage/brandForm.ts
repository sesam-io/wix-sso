import { SiteIds } from "./constants";
import { FormType, SiteId } from "./types";

export const brandForm = (formType: FormType, siteId: SiteId) => {
  console.info(`SSO Flow - ULP - site_id: ${siteId}`);
  console.info(`SSO Flow - ULP - form type: ${formType}`);

  if (siteId !== SiteIds.sesam) {
    let pageTitle =
      formType === "login"
        ? "Log in to Sesam Talk."
        : "Sign Up to Sesam Talk to continue to Sesam Talk.";

    const pTags = document.getElementsByTagName("p") ?? {};

    Array.from(pTags)?.forEach((pTag) => {
      if (pTag.textContent?.toLowerCase() === pageTitle.toLowerCase()) {
        if (siteId === "superoffice") {
          pTag.innerText =
            formType === "login"
              ? "Log in to SuperOffice DATA SYNC."
              : "Sign Up to SuperOffice DATA SYNC.";
          pTag.className = "superofficeLogInTitle";
        } else {
          pTag.innerText = `${
            formType === "login" ? "Log in" : "Sign up"
          } to Making ${SiteIds[siteId]} Talk.`;
        }
      }
    });
  }
};
