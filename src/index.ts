import { runSSOFlow } from "./runSSOFlow";
import { Auth0_SPA_JS_CDN, ZENDESK_WIDGET_CDN } from "./constants";
import { loadScript } from "./loadScript";

loadScript({
  url: Auth0_SPA_JS_CDN,
  name: "Auth0 SPA js",
  log: true,
}).then(() => {
  loadScript({
    url: ZENDESK_WIDGET_CDN,
    name: "Zendesk widget",
    log: true,
  }).then(() => {
    runSSOFlow();
  });
});
