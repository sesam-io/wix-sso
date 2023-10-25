import type { FormType, SiteId } from "./types";

declare global {
  interface Window {
    ulpState: {
      siteId: SiteId;
      formType: FormType;
    };
  }
}
