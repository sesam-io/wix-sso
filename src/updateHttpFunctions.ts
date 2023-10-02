import type { Auth0Client } from "@auth0/auth0-spa-js";
import { log } from "./logger";

export const updateHttpFunctions = async (
  auth0Client: Auth0Client,
  auth0Id: string
) => {
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
