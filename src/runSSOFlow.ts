import { log } from "./logger";
import { LoginMessageType } from "./types";
import { pushToDataLayer } from "./analytics";

export const runSSOFlow = () => {
  log("runSSOFlow start");

  if (!window?.auth0) {
    log("auth0 is not exist!");
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

    if (user?.email) {
      pushToDataLayer("set", { user_id: user.email });
    }

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
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
      updateHttpFunctions();
    }
  };

  window.addEventListener("message", async (event) => {
    if (event.data.auth0Id) {
      auth0Id = event.data.auth0Id;
      zToken = event.data.zendeskToken;

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
        authorizationParams: {
          redirect_uri: window.location.origin,
          siteId: "wave",
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
  });
};
