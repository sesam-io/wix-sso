import { LoginMessageType } from "./types";

export const runSSOFlow = (log = false) => {
  if (log) {
    console.info("🚀 ~ runSSOFlow start", new Date().toLocaleTimeString());
  }

  if (!window?.auth0) {
    console.warn("🚀 ~ auth0 is not exist!", new Date().toLocaleTimeString());
    return;
  }

  let auth0Id = "";
  let zToken = "";

  const auth0Client = new window.auth0.Auth0Client({
    domain: "accounts.talk.sesam.io",
    clientId: "kJpPOS30v8dpD68iRJ7PMdS03Hwvq06X",
  });

  const updateHttpFunctions = async () => {
    if (log) {
      console.info(
        "🚀 ~ updateHttpFunctions called",
        new Date().toLocaleTimeString()
      );
    }

    const user = await auth0Client.getUser();

    if (log) {
      console.info("🚀 ~ user", user, new Date().toLocaleTimeString());
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

      fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    } catch (err) {
      console.error("🚀 ~ fetch error: ", err);
    }
  };

  window.onload = async () => {
    if (log) {
      console.info("🚀 ~ window has loaded", new Date().toLocaleTimeString());
    }

    window.zE("messenger", "hide");

    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      if (log) {
        console.info(
          "🚀 ~ user is authenticated",
          new Date().toLocaleTimeString()
        );
      }

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
    if (log) {
      console.info("🚀 ~ message event: ", event);
    }

    if (event.data.auth0Id) {
      auth0Id = event.data.auth0Id;
      zToken = event.data.zendeskToken;

      if (zToken) {
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
      await auth0Client.loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      });
    }

    if (event.data === LoginMessageType.Logout) {
      auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    }
  });
};
