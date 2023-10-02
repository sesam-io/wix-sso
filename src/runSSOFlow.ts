import { log } from "./logger";
import { LoginMessageType } from "./types";
import { pushToDataLayer, sha256 } from "./analytics";

export const runSSOFlow = (siteId = "") => {
  log("runSSOFlow start");

  if (!window?.auth0) {
    log("auth0 does not exist!");
    return;
  }

  let auth0Id = "";
  let zToken = "";

  const auth0Client = new window.auth0.Auth0Client({
    domain: "accounts.talk.sesam.io",
    clientId: "kJpPOS30v8dpD68iRJ7PMdS03Hwvq06X",
  });

  const updateHttpFunctions = async () => {
    log("updateHttpFunctions called");

    const user = await auth0Client.getUser();

    log("user", user);

    try {
      await fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      const token = await auth0Client.getTokenSilently();

      await fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    } catch (err) {
      console.error("fetch error: ", err);
    }
  };

  // I'm not quite sure how Wix works but it's important to note that this window.onload only runs
  // when we refresh the page - not when going through the pages within the Wix site, In that sense, Wix is SPA-ish
  window.onload = async () => {
    log("window has loaded");

    window.zE("messenger", "hide");

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
      log("handleRedirectCallback ~ appState:", redirectLoginResult.appState);
      window.history.replaceState({}, document.title, "/");
      updateHttpFunctions();
      window.location.href =
        redirectLoginResult.appState?.target ?? window.location.href;
    }
  };

  window.addEventListener("message", async (event) => {
    if (event.data.auth0Id) {
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

        window.zE(
          "messenger",
          "loginUser",
          function (callback: ZendeskCallbackFn) {
            callback(zToken);
            window.zE("messenger", "show");
          }
        );
      } else {
        updateHttpFunctions();
      }
    }

    if (event.data === LoginMessageType.Login) {
      log("message - ", LoginMessageType.Login);

      await auth0Client.loginWithRedirect({
        appState: { target: `${window.location.origin}/callback` },
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
          redirect_uri: window.location.origin,
          screen_hint: "signup",
          "ext-site_id": siteId,
        },
      });
    }
  });
};
