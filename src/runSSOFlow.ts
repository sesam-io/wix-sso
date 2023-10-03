import { log } from "./logger";
import type { RunSSOFlowArgs } from "./types";
import { LoginMessageType } from "./types";
import { pushToDataLayer, sha256 } from "./analytics";
import { ssoFlowState } from "./state";

export const runSSOFlow = (args: RunSSOFlowArgs) => {
  const { auth0Client, siteId, updateServer } = args;

  log("runSSOFlow start");

  if (!window?.auth0) {
    log("auth0 does not exist!");
    return;
  }

  const afterAuthentication = async () => {
    log("afterAuthentication invoked!");

    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      log("user is authenticated");
      return;
    }

    const query = window.location.search;

    if (query.includes("code=") && query.includes("state=")) {
      const redirectLoginResult = await auth0Client.handleRedirectCallback<{
        target: string;
      }>();
      log(
        "handleRedirectCallback ~ appState:",
        redirectLoginResult.appState?.target
      );
      await updateServer?.();

      window.history.replaceState({}, "", "/");
    }
  };

  window.addEventListener("message", async (event) => {
    if (event.data.auth0Id) {
      log("message data", event.data);
      ssoFlowState.currentState.auth0Id = event.data.auth0Id;
      ssoFlowState.currentState.zToken = event.data.zendeskToken;

      const user = await auth0Client.getUser();

      if (user?.email) {
        const hashedEmail = await sha256(user.email);
        // @ts-ignore
        pushToDataLayer("set", { user_id: hashedEmail });
      }

      if (ssoFlowState.currentState.zToken) {
        log("message - zToken", ssoFlowState.currentState.zToken);

        window.zE(
          "messenger",
          "loginUser",
          function (callback: ZendeskCallbackFn) {
            callback(ssoFlowState.currentState.zToken);
            window.zE("messenger", "show");
          }
        );

        afterAuthentication();
      } else {
        await updateServer?.();
      }
    }

    if (event.data === LoginMessageType.Login) {
      log("message - ", LoginMessageType.Login);

      await auth0Client.loginWithRedirect({
        appState: { target: window.location.href },
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

// I'm not quite sure how Wix works but it's important to note that this window.onload only runs
// when we refresh the page - not when going through the pages within the Wix site, In that sense, Wix is SPA-ish
window.onload = async () => {
  log("window has loaded");

  window.zE("messenger", "hide");
};
