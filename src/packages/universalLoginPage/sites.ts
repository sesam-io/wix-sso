import {
  BASE_LOGO_URL,
  CONNECTOR_LOGO_BASE_URL,
  DEFAULT_LOGO_URL,
} from "./constants";
import { Site, Sites } from "./types";

const tripletexSite: Site = {
  id: "tripletex",
  baseId: "tripletex",
  logoUrl: `${CONNECTOR_LOGO_BASE_URL}/tripletex-connector/main/assets/tripletex-logo-horizontal-complete.svg`,
  loginSubTitle: "Log in to Tripletex DataSync.",
  signupSubTitle: "Sign up to Tripletex DataSync.",
};

const superofficeSite: Site = {
  id: "superoffice",
  baseId: "superoffice",
  logoUrl: `${BASE_LOGO_URL}/superoffice/superoffice-ulp-header-logo.svg`,
  loginSubTitle: "Log in to SuperOffice DataSync.",
  signupSubTitle: "Sign up to SuperOffice DataSync.",
  titleClassName: "superofficeLogInTitle",
};

export const WixSites: Sites = {
  hubspot: {
    id: "hubspot",
    logoUrl: `${BASE_LOGO_URL}/hubspot/making-hubspot-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making HubSpot Talk.",
    signupSubTitle: "Sign up to Making HubSpot Talk.",
  },
  powerofficego: {
    id: "powerofficego",
    baseId: "powerofficego",
    logoUrl: `${BASE_LOGO_URL}/poweroffice/poweroffice-new-logo.png`,
    loginSubTitle: "Log in to PowerOffice DataSync.",
    signupSubTitle: "Sign up to PowerOffice DataSync.",
  },
  sesam: {
    id: "sesam",
    logoUrl: DEFAULT_LOGO_URL,
    loginSubTitle: "Log in to Sesam Talk.",
    signupSubTitle: "Sign up to Sesam Talk to continue to Sesam Talk.",
  },
  superoffice: {
    id: "superoffice",
    baseId: "superoffice",
    logoUrl: `${BASE_LOGO_URL}/superoffice/superoffice-ulp-header-logo.svg`,
    loginSubTitle: "Log in to SuperOffice DataSync.",
    signupSubTitle: "Sign up to SuperOffice DataSync.",
    titleClassName: "superofficeLogInTitle",
  },
  "superoffice-test": {
    ...superofficeSite,
    id: "superoffice-test",
  },
  tripletex: tripletexSite,
  "tripletex-test": {
    ...tripletexSite,
    id: "tripletex-test",
  },
  wave: {
    id: "wave",
    logoUrl: `${BASE_LOGO_URL}/wave/making-wave-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making Wave Talk.",
    signupSubTitle: "Sign up to Making Wave Talk.",
  },
};
