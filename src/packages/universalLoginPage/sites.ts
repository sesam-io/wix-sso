import {
  BASE_LOGO_URL,
  CONNECTOR_LOGO_BASE_URL,
  DEFAULT_LOGO_URL,
  MAKING_SERVICE_TALK_HTML_TEMPLATE,
} from "./constants";
import { Site, Sites } from "./types";

export const SesamDefaultSite: Site = {
  id: "sesam",
  name: "Sesam",
  logoUrl: DEFAULT_LOGO_URL,
  loginSubTitle: "Log in to Talk.",
  signupSubTitle: "Sign up to Talk to continue to Talk.",
  displayPoweredBySesam: true,
} as const;

const tripletexSite: Site = {
  id: "tripletex",
  baseId: "tripletex",
  name: "Tripletex",
  logoUrl: `${CONNECTOR_LOGO_BASE_URL}/tripletex-connector/main/assets/tripletex-logo-horizontal-complete.svg`,
  loginSubTitle: "Log in to Making Tripletex Talk.",
  signupSubTitle: "Sign up to Making Tripletex Talk.",
  displayPoweredBySesam: false,
  html: MAKING_SERVICE_TALK_HTML_TEMPLATE,
  isBrandLogo: false,
} as const;

const superofficeSite: Site = {
  id: "superoffice",
  baseId: "superoffice",
  name: "SuperOffice",
  logoUrl: `${BASE_LOGO_URL}/superoffice/superoffice-ulp-header-logo.svg`,
  loginSubTitle: "Log in to Making SuperOffice Talk.",
  signupSubTitle: "Sign up Making to SuperOffice Talk.",
  displayPoweredBySesam: false,
  html: MAKING_SERVICE_TALK_HTML_TEMPLATE,
  isBrandLogo: false,
} as const;

const powerofficego: Site = {
  id: "powerofficego",
  baseId: "powerofficego",
  name: "PowerOffice",
  logoUrl: `${BASE_LOGO_URL}/poweroffice/poweroffice-new-logo.png`,
  loginSubTitle: "Log in to PowerOffice DataSync.",
  signupSubTitle: "Sign up to PowerOffice DataSync.",
  html: "powerofficego-logo.html",
  displayPoweredBySesam: false,
} as const;

export const Wave: Site = {
  id: "wave",
  name: "Wave",
  logoUrl: `${BASE_LOGO_URL}/wave/making-wave-talk-logo-centered.svg`,
  loginSubTitle: "Log in to Making Wave Talk.",
  signupSubTitle: "Sign up to Making Wave Talk.",
  displayPoweredBySesam: false,
  html: MAKING_SERVICE_TALK_HTML_TEMPLATE,
  isBrandLogo: false,
} as const;

export const WixSites: Sites = [
  {
    id: "hubspot",
    name: "HubSpot",
    logoUrl: `${BASE_LOGO_URL}/hubspot/making-hubspot-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making HubSpot Talk.",
    signupSubTitle: "Sign up to Making HubSpot Talk.",
    displayPoweredBySesam: false,
    html: MAKING_SERVICE_TALK_HTML_TEMPLATE,
    isBrandLogo: false,
  },
  {
    ...powerofficego,
  },
  {
    ...powerofficego,
    id: "powerofficego-test",
  },
  SesamDefaultSite,
  superofficeSite,
  {
    ...superofficeSite,
    id: "superoffice-test",
  },
  tripletexSite,
  {
    ...tripletexSite,
    id: "tripletex-test",
  },
  Wave,
];
