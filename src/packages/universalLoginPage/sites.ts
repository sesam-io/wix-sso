import {
  BASE_LOGO_URL,
  CONNECTOR_LOGO_BASE_URL,
  DEFAULT_LOGO_URL,
} from "./constants";
import { Site, Sites } from "./types";

const tripletexSite: Site = {
  id: "tripletex",
  baseId: "tripletex",
  name: "",
  logoUrl: `${CONNECTOR_LOGO_BASE_URL}/tripletex-connector/main/assets/tripletex-logo-horizontal-complete.svg`,
  loginSubTitle: "Log in to Tripletex DataSync.",
  signupSubTitle: "Sign up to Tripletex DataSync.",
  html: "html/tripletex-logo.html",
} as const;

const superofficeSite: Site = {
  id: "superoffice",
  baseId: "superoffice",
  name: "",
  logoUrl: `${BASE_LOGO_URL}/superoffice/superoffice-ulp-header-logo.svg`,
  loginSubTitle: "Log in to SuperOffice DataSync.",
  signupSubTitle: "Sign up to SuperOffice DataSync.",
  titleClassName: "superofficeLogInTitle",
} as const;

const powerofficego: Site = {
  id: "powerofficego",
  baseId: "powerofficego",
  name: "PowerOffice",
  logoUrl: `${BASE_LOGO_URL}/poweroffice/poweroffice-new-logo.png`,
  loginSubTitle: "Log in to PowerOffice DataSync.",
  signupSubTitle: "Sign up to PowerOffice DataSync.",
  html: "html/powerofficego-logo.html",
} as const;

export const WixSites: Sites = {
  hubspot: {
    id: "hubspot",
    name: "Hubspot",
    logoUrl: `${BASE_LOGO_URL}/hubspot/making-hubspot-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making HubSpot Talk.",
    signupSubTitle: "Sign up to Making HubSpot Talk.",
  },
  powerofficego: {
    ...powerofficego,
  },
  "powerofficego-test": {
    ...powerofficego,
    id: "powerofficego-test",
  },
  sesam: {
    id: "sesam",
    name: "Sesam",
    logoUrl: DEFAULT_LOGO_URL,
    loginSubTitle: "Log in to Sesam Talk.",
    signupSubTitle: "Sign up to Sesam Talk to continue to Sesam Talk.",
  },
  superoffice: {
    id: "superoffice",
    baseId: "superoffice",
    name: "Superoffice",
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
    name: "Wave",
    logoUrl: `${BASE_LOGO_URL}/wave/making-wave-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making Wave Talk.",
    signupSubTitle: "Sign up to Making Wave Talk.",
  },
} as const;
