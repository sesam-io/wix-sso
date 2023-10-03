import { runSSOFlow } from "./runSSOFlow";
import { Auth0_SPA_JS_CDN, ZENDESK_WIDGET_CDN } from "./constants";
import { loadScript } from "./loadScript";
import { log } from "./logger";
import { readCurrentScriptSiteId } from "./readCurrentScriptSiteId";
import { updateWixServer } from "./updateWixServer";
import { ssoFlowState } from "./state";

const siteId = readCurrentScriptSiteId();
log("siteId", siteId);

const promise = loadScript({
  url: Auth0_SPA_JS_CDN,
  name: "Auth0 SPA js",
});

const auth0Client = new window.auth0.Auth0Client({
  domain: "accounts.talk.sesam.io",
  clientId: "kJpPOS30v8dpD68iRJ7PMdS03Hwvq06X",
});

const updateServer = () =>
  updateWixServer(auth0Client, ssoFlowState.currentState.auth0Id);

promise.then(() => {
  loadScript({
    url: ZENDESK_WIDGET_CDN,
    name: "Zendesk widget",
    idAttribute: "ze-snippet",
  }).then(() => {
    runSSOFlow({
      auth0Client,
      siteId,
      updateServer,
    });
  });
});
