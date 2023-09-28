import { log } from "./logger";

const waitForDataLayer = (callback: Function, attempt = 0) => {
  log("Waiting for dataLayer", JSON.stringify(window.dataLayer), ". Attempt: ", attempt);
  const max_attempts = 10;
  if (attempt > max_attempts) {
    log("Waiting for dataLayer: Max attempts reached.")
    return;
  }
  if (window.dataLayer) {
    callback();
  } else {
    setTimeout(function () {
      waitForDataLayer(callback, attempt+1);
    }, 500);
  }
};

/**
 * Configure the GA object, set parameters or send events
 * This code is modified from the pure-js code given by Google Analytics that looks like this
 *   window.dataLayer = window.dataLayer || [];
 *   function gtag(){dataLayer.push(arguments);}
 *   gtag('js', new Date());
 *   gtag('config', '<id>');
 * @param args arbitrary arguments to the Google Analytics object (set, event, etc.
 */
export const pushToDataLayer = (...args: any[]) => {
  waitForDataLayer(() => {
    window.dataLayer.push(args);
  });
};
