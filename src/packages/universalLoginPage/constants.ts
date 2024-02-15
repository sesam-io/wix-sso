import type { Sites } from "./types";

const SITE_LOGOS_VERSION_KEY = "_v_";
export const LOGO_IMG_ID = "prompt-logo-center";

export const SiteIds = {
  hubspot: "HubSpot",
  powerofficego: "PowerOfficeGo",
  sesam: "Sesam",
  superoffice: "SuperOffice",
  tripletex: "Tripletex",
  wave: "Wave",
};

const STABLE_VERSION = "latest";

const SITE_LOGOS_RELEASE_VERSION =
  localStorage.getItem(SITE_LOGOS_VERSION_KEY) ?? STABLE_VERSION;

export const BASE_LOGO_URL = `https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@${SITE_LOGOS_RELEASE_VERSION}/src/packages/siteLogos`;

const DEFAULT_LOGO_URL = `${BASE_LOGO_URL}/sesam/sesam-talk-rgb.png`;

export const WixSites: Sites = {
  hubspot: {
    id: "hubspot",
    logoUrl: `${BASE_LOGO_URL}/hubspot/making-hubspot-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making HubSpot Talk.",
    signupSubTitle: "Sign up to Making HubSpot Talk.",
  },
  powerofficego: {
    id: "powerofficego",
    logoUrl: `${BASE_LOGO_URL}/poweroffice/poweroffice-ulp-header-logo.svg`,
    loginSubTitle: "Log in to PowerOffice Data Sync.",
    signupSubTitle: "Sign up to PowerOffice Data Sync.",
  },
  sesam: {
    id: "sesam",
    logoUrl: DEFAULT_LOGO_URL,
    loginSubTitle: "Log in to Sesam Talk.",
    signupSubTitle: "Sign up to Sesam Talk to continue to Sesam Talk.",
  },
  superoffice: {
    id: "superoffice",
    logoUrl: `${BASE_LOGO_URL}/superoffice/superoffice-ulp-header-logo.svg`,
    loginSubTitle: "Log in to SuperOffice Data Sync.",
    signupSubTitle: "Sign up to SuperOffice Data Sync.",
    titleClassName: "superofficeLogInTitle",
  },
  tripletex: {
    id: "tripletex",
    logoUrl:
      "https://raw.githubusercontent.com/sesam-io/wix-sso/main/src/packages/siteLogos/tripletex/tripletex-mc-header-logo.svg",
    loginSubTitle: "Log in to Tripletex Data Sync.",
    signupSubTitle: "Sign up to Tripletex Data Sync.",
  },
  wave: {
    id: "wave",
    logoUrl: `${BASE_LOGO_URL}/wave/making-wave-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making Wave Talk.",
    signupSubTitle: "Sign up to Making Wave Talk.",
  },
};
