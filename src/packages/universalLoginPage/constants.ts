import type { Sites } from "./types";

export const LOGO_IMG_ID = "prompt-logo-center";

export const SiteIds = {
  hubspot: "HubSpot",
  poweroffice: "PowerOffice",
  sesam: "Sesam",
  superoffice: "SuperOffice",
  tripletex: "Tripletex",
  wave: "Wave",
};

const SITE_LOGOS_RELEASE_VERSION = "v1.0.94-site-logos";

export const BASE_LOGO_URL = `https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@${SITE_LOGOS_RELEASE_VERSION}/src/packages/siteLogos`;

const DEFAULT_LOGO_URL = `${BASE_LOGO_URL}/sesam-talk-rgb.png`;

export const WixSites: Sites = {
  hubspot: {
    id: "hubspot",
    logoUrl: `${BASE_LOGO_URL}/making-hubspot-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making HubSpot Talk.",
    signupSubTitle: "Sign up to Making HubSpot Talk.",
  },
  poweroffice: {
    id: "poweroffice",
    logoUrl: `${BASE_LOGO_URL}/powerofficego/powerofficego-mc-header-logo.svg`,
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
    logoUrl: `${BASE_LOGO_URL}/superoffice-mc-header-logo.svg`,
    loginSubTitle: "Log in to SuperOffice Data Sync.",
    signupSubTitle: "Sign up to SuperOffice Data Sync.",
    titleClassName: "superofficeLogInTitle",
  },
  tripletex: {
    id: "tripletex",
    logoUrl: DEFAULT_LOGO_URL,
    loginSubTitle: "Log in to Making Tripletex Talk.",
    signupSubTitle: "Sign up to Making Tripletex Talk.",
  },
  wave: {
    id: "wave",
    logoUrl: `${BASE_LOGO_URL}/making-wave-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making Wave Talk.",
    signupSubTitle: "Sign up to Making Wave Talk.",
  },
};
