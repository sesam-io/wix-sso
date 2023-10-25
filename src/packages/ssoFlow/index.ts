import { runSSOFlow } from "./runSSOFlow";
import { Auth0_SPA_JS_CDN, ZENDESK_WIDGET_CDN } from "./constants";
import { loadScript } from "./loadScript";
import { readCurrentScriptSiteId } from "./readCurrentScriptSiteId";
import { log } from "./logger";

const siteId = readCurrentScriptSiteId();
log("siteId", siteId);

const promise = loadScript({
  url: Auth0_SPA_JS_CDN,
  name: "Auth0 SPA js",
});

promise.then(() => {
  loadScript({
    url: ZENDESK_WIDGET_CDN,
    name: "Zendesk widget",
    idAttribute: "ze-snippet",
  }).then(() => {
    runSSOFlow({
      auth0ClientOptions: {
        domain: "accounts.talk.sesam.io",
        clientId: "kJpPOS30v8dpD68iRJ7PMdS03Hwvq06X",
      },
      siteId,
    });
  });
});
