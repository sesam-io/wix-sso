export const LOGO_IMG_ID = "prompt-logo-center";
export const MAKING_SERVICE_TALK_HTML_TEMPLATE =
  "making-service-talk-logo.html";

const STABLE_VERSION = "v1.0.127-site-logos";

export const CONNECTOR_LOGO_BASE_URL =
  "https://raw.githubusercontent.com/sesam-io";
export const BASE_LOGO_URL = `https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@${STABLE_VERSION}/src/packages/siteLogos`;

export const DEFAULT_LOGO_URL = `${BASE_LOGO_URL}/sesam/sesam-talk-rgb.png`;

export const SiteIds = {
  hubspot: "hubspot",
  powerofficego: "powerofficego",
  "powerofficego-test": "powerofficego-test",
  sesam: "sesam",
  superoffice: "superoffice",
  "superoffice-test": "superoffice-test",
  tripletex: "tripletex",
  "tripletex-test": "tripletex-test",
  wave: "wave",
} as const;
