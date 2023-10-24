import { log } from "./logger";
import { LoadScriptArgs } from "./types";

export const loadScript = (args: LoadScriptArgs) => {
  const { url, idAttribute, name } = args;

  return new Promise<void>((resolve, _reject) => {
    const head = document.head;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.id = idAttribute ?? "";

    script.onload = () => {
      log(`${name} script loaded`);

      resolve();
    };

    head.appendChild(script);
  });
};
