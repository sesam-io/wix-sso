import { log } from "./logger";
import type { RunSSOFlowArgs } from "./types";
import { LoginMessageType } from "./enums";
import { pushToDataLayer, sha256 } from "./analytics";
import { updateHttpFunctions } from "./updateHttpFunctions";
import { calculateSSOFlowStatus } from "./utils/calculateSSOFlowStatus";

export const runSSOFlow = async (args: RunSSOFlowArgs) => {
  const { auth0ClientOptions, siteId } = args;

  log("runSSOFlow start");

  if (!window?.auth0) {
    log("auth0 does not exist!");
    return;
  }

  let auth0Id = "";
  log("runSSOFlow ~ auth0Id:", auth0Id);
  let zToken = "";

  const auth0Client = new window.auth0.Auth0Client(auth0ClientOptions);

  const isAuthenticated = await auth0Client.isAuthenticated();
  const query = window.location.search;

  const status = calculateSSOFlowStatus({
    isAuthenticated: isAuthenticated,
    query,
  });
  console.log("🚀 ~ runSSOFlow ~ status:", status, isAuthenticated);

  const afterAuthentication = async () => {
    log("afterAuthentication invoked!");

    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      log("user is authenticated");
    } else {
      const query = window.location.search;

      if (query.includes("code=") && query.includes("state=")) {
        await auth0Client.handleRedirectCallback();
        await updateHttpFunctions(auth0Client, auth0Id);

        window.history.replaceState({}, "", "/");
      }
    }
  };

  // I'm not quite sure how Wix works but it's important to note that this window.onload only runs
  // when we refresh the page - not when going through the pages within the Wix site, In that sense, Wix is SPA-ish
  window.onload = async () => {
    log("window has loaded");

    window.zE("messenger", "hide");

    afterAuthentication();
  };

  window.addEventListener("message", async (event) => {
    if (event.data.auth0Id) {
      log("message data", event.data);
      auth0Id = event.data.auth0Id;
      zToken = event.data.zendeskToken;

      const user = await auth0Client.getUser();
      console.log("🚀 ~ window.addEventListener ~ user:", user);

      if (user?.email) {
        const hashedEmail = await sha256(user.email);
        // @ts-ignore
        pushToDataLayer("set", { user_id: hashedEmail });
      }

      if (zToken) {
        log("message - zToken", zToken);

        window.zE(
          "messenger",
          "loginUser",
          function (callback: ZendeskCallbackFn) {
            callback(zToken);
            window.zE("messenger", "show");
          }
        );
      }

      await updateHttpFunctions(auth0Client, auth0Id);
    }

    if (event.data === LoginMessageType.Login) {
      log("message - ", LoginMessageType.Login);

      await auth0Client.loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin,
          "ext-site_id": siteId,
        },
      });
    }

    if (event.data === LoginMessageType.Logout) {
      log("message - ", LoginMessageType.Logout);

      auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    }

    if (event.data === LoginMessageType.Signup) {
      log("message - ", LoginMessageType.Signup);

      auth0Client.loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.href,
          screen_hint: "signup",
          "ext-site_id": siteId,
        },
      });
    }
  });
};
