import {
  BASE_LOGO_URL,
  CONNECTOR_LOGO_BASE_URL,
  DEFAULT_LOGO_URL,
} from "./constants";
import { Site, Sites } from "./types";

export const SesamDefaultSite: Site = {
  id: "sesam",
  name: "Sesam",
  logoUrl: DEFAULT_LOGO_URL,
  loginSubTitle: "Log in to Sesam Talk.",
  signupSubTitle: "Sign up to Sesam Talk to continue to Sesam Talk.",
  displayPoweredBySesam: true,
} as const;

const tripletexSite: Site = {
  id: "tripletex",
  baseId: "tripletex",
  name: "",
  logoUrl: `${CONNECTOR_LOGO_BASE_URL}/tripletex-connector/main/assets/tripletex-logo-horizontal-complete.svg`,
  loginSubTitle: "Log in to Tripletex DataSync.",
  signupSubTitle: "Sign up to Tripletex DataSync.",
  html: "tripletex-logo.html",
  displayPoweredBySesam: false,
} as const;

const superofficeSite: Site = {
  id: "superoffice",
  baseId: "superoffice",
  name: "",
  logoUrl: `${BASE_LOGO_URL}/superoffice/superoffice-ulp-header-logo.svg`,
  loginSubTitle: "Log in to SuperOffice DataSync.",
  signupSubTitle: "Sign up to SuperOffice DataSync.",
  titleClassName: "superofficeLogInTitle",
  displayPoweredBySesam: true,
  isBrandLogo: true,
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
  isBrandLogo: true,
} as const;

export const WixSites: Sites = [
  {
    id: "hubspot",
    name: "Hubspot",
    logoUrl: `${BASE_LOGO_URL}/hubspot/making-hubspot-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making HubSpot Talk.",
    signupSubTitle: "Sign up to Making HubSpot Talk.",
    displayPoweredBySesam: true,
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
