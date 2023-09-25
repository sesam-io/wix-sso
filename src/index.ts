import { runSSOFlow } from "./runSSOFlow";
import { Auth0_SPA_JS_CDN, ZENDESK_WIDGET_CDN } from "./constants";
import { loadScript } from "./loadScript";

await loadScript(Auth0_SPA_JS_CDN, () => {
  console.log("🚀 ~ auth0 loaded");
});

await loadScript(
  ZENDESK_WIDGET_CDN,
  () => {
    console.log("🚀 ~ window.zE", window.zE);
    runSSOFlow();
  },
  "ze-snippet"
);
