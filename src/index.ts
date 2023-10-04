import { runSSOFlow } from "./runSSOFlow";
import { setupGtag } from "./analytics";
import { Auth0_SPA_JS_CDN, ZENDESK_WIDGET_CDN, GOOGLE_ANALYTICS_CDN } from "./constants";
import { loadScript } from "./loadScript";
import { log } from "./logger";
import { readCurrentScriptSiteId } from "./readCurrentScriptSiteId";

const siteId = readCurrentScriptSiteId();
log("siteId", siteId);

const promise = loadScript({
  url: Auth0_SPA_JS_CDN,
  name: "Auth0 SPA js",
});

promise.then(() => {
  return loadScript({
    url: ZENDESK_WIDGET_CDN,
    name: "Zendesk widget",
    idAttribute: "ze-snippet",
  })
}).then(() => {
  return loadScript({
    url: GOOGLE_ANALYTICS_CDN,
    name: "Google Analytics",
  }).then(() => {
    setupGtag();
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
