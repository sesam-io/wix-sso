import { runSSOFlow } from "./runSSOFlow";
import { Auth0_SPA_JS_CDN, ZENDESK_WIDGET_CDN } from "./constants";
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
  loadScript({
    url: ZENDESK_WIDGET_CDN,
    name: "Zendesk widget",
    idAttribute: "ze-snippet",
  }).then(() => {
    runSSOFlow(siteId);
  });
});
