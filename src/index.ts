import { loadScript } from "./loadScript";

enum LoginMessageType {
  Login = "auth0:login",
  Logout = "auth0:logout",
}

const callback = () => {
  console.log("🚀 ~ callback ~ auth0Client:", window?.auth0);

  if (!window?.auth0) {
    return;
  }

  let auth0Id = "";
  let zToken = "";

  const auth0Client = new window.auth0.Auth0Client({
    domain: "accounts.talk.sesam.io",
    clientId: "kJpPOS30v8dpD68iRJ7PMdS03Hwvq06X",
  });

  window.onload = async () => {
    console.log("🚀 ~ window.onload= ~ window.onload:", window.onload);

    window.zE("messenger", "hide");

    const isAuthenticated = await auth0Client.isAuthenticated();
    if (isAuthenticated) {
      return;
    }

    const query = window.location.search;

    if (query.includes("code=") && query.includes("state=")) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
      updateUI();
    }
  };

  const updateUI = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = await auth0Client.getUser();
    fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    try {
      const token = await auth0Client.getTokenSilently();
      fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  window.addEventListener("message", async (event) => {
    console.log("🚀 ~ message ~ event:", event);

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
        updateUI();
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

loadScript(
  "https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js",
  callback
);
