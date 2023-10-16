import { User } from "@auth0/auth0-spa-js";
import {
  Auth0_SPA_JS_CDN,
  LOG_STORAGE_KEY,
  ZENDESK_WIDGET_CDN,
} from "../constants";
import { loadScript } from "../loadScript";
import { log } from "../logger";
import { LoginMessageType } from "../types";

const USER_STORAGE_KEY = "_user_";

localStorage.setItem(LOG_STORAGE_KEY, "true");

const promise = loadScript({
  url: Auth0_SPA_JS_CDN,
  name: "Auth0 SPA js",
});

/**
 * @see https://manage.auth0.com/dashboard/eu/sesamtalk/applications/MkuAQeoLQjnYzx5BfgmXfDyXn5IdhKwa/settings
 */
const WixSsoDemoAppConfig = {
  domain: "accounts.talk.sesam.io",
  clientId: "MkuAQeoLQjnYzx5BfgmXfDyXn5IdhKwa",
};

const btnLogin = document.getElementById("btnLogin") as HTMLButtonElement;
const spnUsername = document.getElementById("spnUsername") as HTMLSpanElement;

promise.then(() => {
  loadScript({
    url: ZENDESK_WIDGET_CDN,
    name: "Zendesk widget",
    idAttribute: "ze-snippet",
  }).then(async () => {
    let currentUser: User;
    const auth0Client = new window.auth0.Auth0Client(WixSsoDemoAppConfig);

    window.onload = async () => {
      log("window has loaded");

      if (localStorage.getItem(USER_STORAGE_KEY)) {
        currentUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "");
        console.log("🚀 ~ window.onload ~ currentUser:", currentUser);
      }

      if (currentUser) {
        log("user is authenticated");

        spnUsername.innerText = `Hi ${currentUser.name}!` ?? "";
        btnLogin.innerText = "Logout";

        return;
      }

      const query = window.location.search;

      if (query.includes("code=") && query.includes("state=")) {
        const redirectLoginResult = await auth0Client.handleRedirectCallback<{
          target: string;
        }>();
        log("handleRedirectCallback ~ appState:", redirectLoginResult.appState);
        window.history.replaceState(
          {},
          document.title,
          redirectLoginResult.appState?.target ?? "/"
        );
      }

      const user = await auth0Client.getUser();

      log("user", user);

      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }

      if (user) {
        spnUsername.innerText = `Hi ${user.name}!` ?? "";
      } else {
        spnUsername.innerText = "Hi! click Login";
      }

      if (user) {
        btnLogin.innerText = "Logout";
      } else {
        btnLogin.innerText = "Login";
      }
    };

    const loginUser = async () => {
      log("message - ", LoginMessageType.Login);

      await auth0Client.loginWithRedirect({
        appState: { target: `${window.location.origin}/success` },
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      });
    };

    const logoutUser = async () => {
      log("message - ", LoginMessageType.Logout);

      localStorage.removeItem(USER_STORAGE_KEY);

      await auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };

    btnLogin?.addEventListener("click", async () => {
      if (currentUser) {
        logoutUser();
      } else {
        loginUser();
      }
    });
  });
});
