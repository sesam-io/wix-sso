import { log } from "./logger";
import type { RunSSOFlowArgs } from "./types";
import { LoginMessageType } from "./types";
import { pushToDataLayer, sha256 } from "./analytics";
import { updateHttpFunctions } from "./updateHttpFunctions";

export const runSSOFlow = async (args: RunSSOFlowArgs) => {
  const { auth0ClientOptions, siteId } = args;

  log("runSSOFlow start");

  if (!window?.auth0) {
    log("auth0 does not exist!");
    return;
  }

  let auth0Id = "";
  let zToken = "";

  const auth0Client = new window.auth0.Auth0Client(auth0ClientOptions);

  log('auth0client', auth0Client)


  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    log("user is authenticated");
    return;
  }

  const query = window.location.search;

  if (query.includes("code=") && query.includes("state=")) {
    log("found code and state in URL, handling redirect callback");

    const redirectLoginResult = await auth0Client.handleRedirectCallback<{
      target: string;
    }>();
    log(
      "handleRedirectCallback ~ appState:",
      redirectLoginResult.appState
    );
    await updateHttpFunctions(auth0Client, auth0Id);

    log("removing code and state from URL");
    window.history.replaceState({}, "", "/");
  }

  window.addEventListener("message", async (event) => {
    if (event.data.auth0Id) {
      log("message data", event.data);
      auth0Id = event.data.auth0Id;
      zToken = event.data.zendeskToken;

      // It looks like after we login, we do get this user object, and set the user-id
      // but then we refresh (maybe because of the redirect), and the message listener triggers again
      // but this time, the user we get from the next call is undefined
      try {
        const user = await auth0Client.getUser();
        log("user 2", user);
        
        if (user?.email) {
          const hashedEmail = await sha256(user.email);
          // @ts-ignore
          log("setting user_id onto the gtag object", hashedEmail, gtag);
          gtag("set", { user_id: hashedEmail });
        }

        
      } catch(e) {
        log("auth0 error", e)
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
        updateHttpFunctions(auth0Client, auth0Id);
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
