const SITE_LOGOS_VERSION_KEY = "_v_";
export const LOGO_IMG_ID = "prompt-logo-center";

const STABLE_VERSION = "v1.0.127-site-logos";

const SITE_LOGOS_RELEASE_VERSION =
  localStorage.getItem(SITE_LOGOS_VERSION_KEY) ?? STABLE_VERSION;

export const CONNECTOR_LOGO_BASE_URL =
  "https://raw.githubusercontent.com/sesam-io";
export const BASE_LOGO_URL = `https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@${SITE_LOGOS_RELEASE_VERSION}/src/packages/siteLogos`;

export const DEFAULT_LOGO_URL = `${BASE_LOGO_URL}/sesam/sesam-talk-rgb.png`;
