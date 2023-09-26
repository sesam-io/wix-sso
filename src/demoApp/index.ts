import { Auth0_SPA_JS_CDN, ZENDESK_WIDGET_CDN } from "../constants";
import { loadScript } from "../loadScript";
import { log } from "../logger";
import { LoginMessageType } from "../types";

const promise = loadScript({
  url: Auth0_SPA_JS_CDN,
  name: "Auth0 SPA js",
});

promise.then(() => {
  loadScript({
    url: ZENDESK_WIDGET_CDN,
    name: "Zendesk widget",
    idAttribute: "ze-snippet",
  }).then(async () => {
    let auth0Id = "";

    const auth0Client = new window.auth0.Auth0Client({
      domain: "accounts.talk.sesam.io",
      clientId: "kJpPOS30v8dpD68iRJ7PMdS03Hwvq06X",
    });

    const btnLogin = document.getElementById("btnLogin") as HTMLButtonElement;
    const spnUsername = document.getElementById(
      "spnUsername"
    ) as HTMLSpanElement;

    const isAuthenticated = await auth0Client.isAuthenticated();

    console.log("🚀 ~ ssoFlow ~ isAuthenticated:", isAuthenticated);

    window.onload = async () => {
      log("window has loaded");

      const isAuthenticated = await auth0Client.isAuthenticated();

      if (isAuthenticated) {
        log("user is authenticated");
        return;
      }

      const query = window.location.search;

      if (query.includes("code=") && query.includes("state=")) {
        await auth0Client.handleRedirectCallback();
        log("handleRedirectCallback");
        window.history.replaceState({}, document.title, "/");
      }

      const user = await auth0Client.getUser();

      log("user", user);

      if (user) {
        spnUsername.innerText = `Hi ${user.name}!` ?? "";
      } else {
        console.info("🚀 ~ window.onload= ~ user:", user);
        spnUsername.innerText = "Hi! click Login";
      }

      if (user) {
        btnLogin.innerText = "Logout";
      } else {
        btnLogin.innerText = "Login";
      }
    };

    window.addEventListener("message", async (event) => {
      log("🚀 ~ window.addEventListener ~ event:", event);
      if (event.data.auth0Id) {
        auth0Id = event.data.auth0Id;
      }

      if (event.data === LoginMessageType.Login) {
        log("message - ", LoginMessageType.Login);

        await auth0Client.loginWithRedirect({
          authorizationParams: {
            redirect_uri: window.location.origin,
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

    btnLogin?.addEventListener("click", async () => {
      const user = await auth0Client.getUser();

      if (user) {
        window.postMessage(LoginMessageType.Logout);
      } else {
        window.postMessage(LoginMessageType.Login);
      }
    });
  });
});
