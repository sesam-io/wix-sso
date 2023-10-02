import type { Auth0Client } from "@auth0/auth0-spa-js";
import { log } from "./logger";

export const updateHttpFunctions = (
  auth0Client: Auth0Client,
  auth0Id: string,
  redirectURL?: string
) => {
  return new Promise<void>(async (resolve, _reject) => {
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

      if (redirectURL) {
        await fetch(
          window.location.origin + "/_functions/redirect/" + auth0Id,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: redirectURL,
            }),
          }
        );
      }

      resolve();
    } catch (err) {
      console.error("fetch error: ", err);
      _reject();
    }
  });
};
