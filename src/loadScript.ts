import { LoadScriptArgs } from "types";

export const loadScript = (args: LoadScriptArgs) => {
  const { url, idAttribute, callbackFn, name, log } = args;

  return new Promise<void>((resolve, _reject) => {
    const head = document.head;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.id = idAttribute ?? "";

    script.onload = () => {
      if (log) {
        console.log(
          `🚀 ~ ${name} script loaded`,
          new Date().toLocaleTimeString()
        );
      }

      callbackFn?.();

      resolve();
    };

    head.appendChild(script);
  });
};
