import type { RunSSOFlowArgs } from "./types";
import { LoginMessageType } from "./types";
import { pushToDataLayer, sha256 } from "./analytics";
import { updateHttpFunctions } from "./updateHttpFunctions";
import { REDIRECT_URI } from "./constants";
import { log } from "./logger";

export const runSSOFlow = (args: RunSSOFlowArgs) => {
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

  const afterAuthentication = async () => {
    log("afterAuthentication invoked!");

    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      log("user is authenticated");
      return;
    }

    const query = window.location.search;

    if (query.includes("code=") && query.includes("state=")) {
      await auth0Client.handleRedirectCallback();
      await updateHttpFunctions(auth0Client, auth0Id);

      window.history.replaceState({}, "", "/");
    }
  };

  window.zE("messenger", "hide");
  afterAuthentication();

  window.addEventListener("message", async (event) => {
    if (event.data.auth0Id) {
      log("message data", event.data);
      auth0Id = event.data.auth0Id;
      zToken = event.data.zendeskToken;

      const user = await auth0Client.getUser();

      if (user?.email) {
        const hashedEmail = await sha256(user.email);
        // @ts-ignore
        pushToDataLayer("set", { user_id: hashedEmail });
      }

      if (zToken) {
        log("message - zToken", zToken);

        if (!window.location.pathname.includes("/callback")) {
          window.zE(
            "messenger",
            "loginUser",
            function (callback: ZendeskCallbackFn) {
              callback(zToken);
              window.zE("messenger", "show");
            }
          );
        }
      } else {
        await updateHttpFunctions(auth0Client, auth0Id);
      }
    }

    if (event.data === LoginMessageType.Login) {
      log("message - ", LoginMessageType.Login);

      await auth0Client.loginWithRedirect({
        authorizationParams: {
          redirect_uri: REDIRECT_URI,
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
          redirect_uri: REDIRECT_URI,
          screen_hint: "signup",
          "ext-site_id": siteId,
        },
      });
    }
  });
};
