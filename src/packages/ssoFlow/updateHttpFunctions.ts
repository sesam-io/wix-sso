/* eslint-disable no-async-promise-executor */
import type { Auth0Client } from "@auth0/auth0-spa-js";
import { log } from "./logger";

export const updateHttpFunctions = (
  auth0Client: Auth0Client,
  auth0Id: string
) => {
  return new Promise<void>(async (resolve, _reject) => {
    log("updateHttpFunctions called");

    const user = await auth0Client.getUser();

    if (!user) {
      log("updateHttpFunctions -> user not logged-in!");
      return;
    }

    if (!auth0Id) {
      log("updateHttpFunctions -> auth0Id is not defined!");
      return;
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

      resolve();
    } catch (err) {
      console.error("fetch error: ", err);
      _reject();
    }
  });
};
