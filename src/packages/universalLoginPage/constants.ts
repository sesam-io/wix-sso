import type { Sites } from "./types";

export const SiteIds = {
  hubspot: "HubSpot",
  poweroffice: "PowerOffice",
  sesam: "Sesam",
  superoffice: "SuperOffice",
  wave: "Wave",
};

export const WixSites: Sites = {
  hubspot: {
    id: "hubspot",
    logoUrl: "",
    loginSubTitle: "Log in to Making HubSpot Talk.",
    signupSubTitle: "Sign up to Making HubSpot Talk.",
  },
  poweroffice: {
    id: "poweroffice",
    logoUrl: "",
    loginSubTitle: " to Sesam Talk to continue to Sesam Talk.",
    signupSubTitle: " to Sesam Talk to continue to Sesam Talk.",
  },
  sesam: {
    id: "sesam",
    logoUrl:
      "https://raw.githubusercontent.com/datanav/docs/master/icons/logos/Sesam_Talk_RGB.png",
    loginSubTitle: "Log in to Sesam Talk.",
    signupSubTitle: "Sign Up to Sesam Talk to continue to Sesam Talk.",
  },
  superoffice: {
    id: "superoffice",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@v1.0.71-stable-site-logos/src/assets/site-logos/superoffice-logo.svg",
    loginSubTitle: "Log in to SuperOffice Data Sync.",
    signupSubTitle: "Sign Up to SuperOffice Data Sync.",
  },
  wave: {
    id: "wave",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@v1.0.71-stable-site-logos/src/assets/site-logos/making-wave-talk-logo-centered.svg",
    loginSubTitle: "Log in to Making Wave Talk.",
    signupSubTitle: "Sign up to Making Wave Talk.",
  },
};
