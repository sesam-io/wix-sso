// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"K85Hk":[function(require,module,exports) {
var _runSSOFlow = require("./runSSOFlow");
var _constants = require("./constants");
var _loadScript = require("./loadScript");
var _readCurrentScriptSiteId = require("./readCurrentScriptSiteId");
var _logger = require("./logger");
const siteId = (0, _readCurrentScriptSiteId.readCurrentScriptSiteId)();
(0, _logger.log)("siteId", siteId);
const promise = (0, _loadScript.loadScript)({
    url: (0, _constants.Auth0_SPA_JS_CDN),
    name: "Auth0 SPA js"
});
promise.then(()=>{
    (0, _loadScript.loadScript)({
        url: (0, _constants.ZENDESK_WIDGET_CDN),
        name: "Zendesk widget",
        idAttribute: "ze-snippet"
    }).then(()=>{
        (0, _runSSOFlow.runSSOFlow)({
            auth0ClientOptions: {
                domain: "accounts.talk.sesam.io",
                clientId: "kJpPOS30v8dpD68iRJ7PMdS03Hwvq06X"
            },
            siteId
        });
    });
});

},{"./runSSOFlow":"2GG49","./constants":"auSYE","./loadScript":"2j3yz","./readCurrentScriptSiteId":"b2FnG","./logger":"gC0HY"}],"2GG49":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "runSSOFlow", ()=>runSSOFlow);
var _types = require("./types");
var _analytics = require("./analytics");
var _updateHttpFunctions = require("./updateHttpFunctions");
var _constants = require("./constants");
var _logger = require("./logger");
const runSSOFlow = (args)=>{
    const { auth0ClientOptions, siteId } = args;
    (0, _logger.log)("runSSOFlow start");
    if (!window?.auth0) {
        (0, _logger.log)("auth0 does not exist!");
        return;
    }
    let auth0Id = "";
    (0, _logger.log)("runSSOFlow ~ auth0Id:", auth0Id);
    let zToken = "";
    const auth0Client = new window.auth0.Auth0Client(auth0ClientOptions);
    const afterAuthentication = async ()=>{
        (0, _logger.log)("afterAuthentication invoked!");
        const isAuthenticated = await auth0Client.isAuthenticated();
        if (isAuthenticated) {
            (0, _logger.log)("user is authenticated");
            return;
        }
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            await auth0Client.handleRedirectCallback();
            await (0, _updateHttpFunctions.updateHttpFunctions)(auth0Client, auth0Id);
            window.history.replaceState({}, "", "/");
        }
    };
    window.zE("messenger", "hide");
    afterAuthentication();
    window.addEventListener("message", async (event)=>{
        if (event.data.auth0Id) {
            (0, _logger.log)("message data", event.data);
            auth0Id = event.data.auth0Id;
            zToken = event.data.zendeskToken;
            const user = await auth0Client.getUser();
            if (user?.email) {
                const hashedEmail = await (0, _analytics.sha256)(user.email);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (0, _analytics.pushToDataLayer)("set", {
                    user_id: hashedEmail
                });
            }
            if (zToken) {
                (0, _logger.log)("message - zToken", zToken);
                if (!window.location.pathname.includes("/callback")) window.zE("messenger", "loginUser", function(callback) {
                    callback(zToken);
                    window.zE("messenger", "show");
                });
            } else await (0, _updateHttpFunctions.updateHttpFunctions)(auth0Client, auth0Id);
        }
        if (event.data === (0, _types.LoginMessageType).Login) {
            (0, _logger.log)("message - ", (0, _types.LoginMessageType).Login);
            await auth0Client.loginWithRedirect({
                authorizationParams: {
                    redirect_uri: (0, _constants.REDIRECT_URI),
                    "ext-site_id": siteId
                }
            });
        }
        if (event.data === (0, _types.LoginMessageType).Logout) {
            (0, _logger.log)("message - ", (0, _types.LoginMessageType).Logout);
            auth0Client.logout({
                logoutParams: {
                    returnTo: window.location.origin
                }
            });
        }
        if (event.data === (0, _types.LoginMessageType).Signup) {
            (0, _logger.log)("message - ", (0, _types.LoginMessageType).Signup);
            auth0Client.loginWithRedirect({
                authorizationParams: {
                    redirect_uri: (0, _constants.REDIRECT_URI),
                    screen_hint: "signup",
                    "ext-site_id": siteId
                }
            });
        }
    });
};

},{"./types":"7pkf5","./analytics":"5pXtu","./updateHttpFunctions":"3v2qh","./constants":"auSYE","./logger":"gC0HY","@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"7pkf5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LoginMessageType", ()=>LoginMessageType);
var LoginMessageType;
(function(LoginMessageType) {
    LoginMessageType["Login"] = "auth0:login";
    LoginMessageType["Logout"] = "auth0:logout";
    LoginMessageType["Signup"] = "auth0:signup";
})(LoginMessageType || (LoginMessageType = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"9EVjn":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"5pXtu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Configure the GA object, set parameters or send events
 * This code is modified from the pure-js code given by Google Analytics that looks like this
 *   window.dataLayer = window.dataLayer || [];
 *   function gtag(){dataLayer.push(arguments);}
 *   gtag('js', new Date());
 *   gtag('config', '<id>');
 * @param args arbitrary arguments to the Google Analytics object (set, event, etc.
 */ parcelHelpers.export(exports, "pushToDataLayer", ()=>pushToDataLayer);
parcelHelpers.export(exports, "sha256", ()=>sha256);
var _logger = require("./logger");
// GA script is loaded in Wix site and not by `loadScript`, therefore `window.dataLayer` loading might be delayed.
//TODO: Worth to try https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
// eslint-disable-next-line @typescript-eslint/ban-types
const waitForDataLayer = (callback, attempt = 0)=>{
    (0, _logger.log)("Waiting for GA dataLayer", JSON.stringify(window.dataLayer), ". Attempt: ", attempt);
    const max_attempts = 10;
    if (attempt > max_attempts) {
        (0, _logger.log)("Waiting for GA dataLayer: Max attempts reached.");
        return;
    }
    if (window.dataLayer) {
        (0, _logger.log)("GA dataLayer found");
        callback();
    } else setTimeout(function() {
        waitForDataLayer(callback, attempt + 1);
    }, 500);
};
function pushToDataLayer() {
    (0, _logger.log)("Attempting to push user_id to GA dataLayer.");
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    waitForDataLayer(()=>{
        (0, _logger.log)("Setting the user-id");
        window.dataLayer.push(args);
        (0, _logger.log)("window.dataLayer after pushing", window.dataLayer);
    });
}
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map((b)=>b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}

},{"./logger":"gC0HY","@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"gC0HY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "log", ()=>log);
var _logger = require("packages/logger/logger");
var _constants = require("./constants");
const enabled = Boolean(localStorage.getItem((0, _constants.LOG_STORAGE_KEY)));
const log = (0, _logger.getLoggerFn)(enabled);

},{"packages/logger/logger":"9hJU1","./constants":"auSYE","@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"9hJU1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getLoggerFn", ()=>getLoggerFn);
const getLoggerFn = (enabled = false, prefix = "SSO Flow")=>// eslint-disable-next-line @typescript-eslint/no-explicit-any
    (title, ...args)=>{
        if (!enabled) return;
        console.info(`${prefix} - ${title}`, args.length ? args : "", new Date().toLocaleTimeString());
    };

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"auSYE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Auth0_SPA_JS_CDN", ()=>Auth0_SPA_JS_CDN);
parcelHelpers.export(exports, "ZENDESK_WIDGET_CDN", ()=>ZENDESK_WIDGET_CDN);
parcelHelpers.export(exports, "LOG_STORAGE_KEY", ()=>LOG_STORAGE_KEY);
parcelHelpers.export(exports, "REDIRECT_URI", ()=>REDIRECT_URI);
const Auth0_SPA_JS_CDN = "https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js";
const ZENDESK_WIDGET_CDN = "https://static.zdassets.com/ekr/snippet.js?key=eb7f5552-be33-4b0f-a55d-ce9a8a7aa975";
const LOG_STORAGE_KEY = "_logSSOFlow_";
const REDIRECT_URI = `${window.location.origin}/callback`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"3v2qh":[function(require,module,exports) {
/* eslint-disable no-async-promise-executor */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateHttpFunctions", ()=>updateHttpFunctions);
var _logger = require("./logger");
const updateHttpFunctions = (auth0Client, auth0Id)=>{
    return new Promise(async (resolve, _reject)=>{
        (0, _logger.log)("updateHttpFunctions called");
        const user = await auth0Client.getUser();
        if (!user) {
            (0, _logger.log)("updateHttpFunctions -> user not logged-in!");
            return;
        }
        if (!auth0Id) {
            (0, _logger.log)("updateHttpFunctions -> auth0Id is not defined!");
            return;
        }
        try {
            await fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user
                })
            });
            const token = await auth0Client.getTokenSilently();
            await fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token
                })
            });
            resolve();
        } catch (err) {
            console.error("fetch error: ", err);
            _reject();
        }
    });
};

},{"./logger":"gC0HY","@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"2j3yz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadScript", ()=>loadScript);
var _logger = require("./logger");
const loadScript = (args)=>{
    const { url, idAttribute, name } = args;
    return new Promise((resolve)=>{
        const head = document.head;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = idAttribute ?? "";
        script.onload = ()=>{
            (0, _logger.log)(`${name} script loaded`);
            resolve();
        };
        head.appendChild(script);
    });
};

},{"./logger":"gC0HY","@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"b2FnG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "readCurrentScriptSiteId", ()=>readCurrentScriptSiteId);
const readCurrentScriptSiteId = ()=>document?.currentScript?.attributes.getNamedItem("data-siteid")?.value;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}]},["K85Hk"], "K85Hk", "parcelRequire7e83")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RTNCLE9BQU8sTUFBTSxHQUFHO1lBQ2QsQ0FBQSxHQUFBLFdBQUcsQUFBRCxFQUFFLENBQUMsRUFBRSxLQUFLLGNBQWMsQ0FBQztZQUUzQjtRQUNGO1FBRUEsS0FBSyxXQUFXLENBQUM7SUFDbkI7QUFDRjs7Ozs7NkRDckJhO0FBQU4sTUFBTSwwQkFBMEIsSUFDckMsVUFBVSxlQUFlLFdBQVcsYUFBYSxnQkFBZ0IiLCJzb3VyY2VzIjpbInNyYy9wYWNrYWdlcy9zc29GbG93L2luZGV4LnRzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvcnVuU1NPRmxvdy50cyIsInNyYy9wYWNrYWdlcy9zc29GbG93L3R5cGVzLnRzIiwibm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiLCJzcmMvcGFja2FnZXMvc3NvRmxvdy9hbmFseXRpY3MudHMiLCJzcmMvcGFja2FnZXMvc3NvRmxvdy9sb2dnZXIudHMiLCJzcmMvcGFja2FnZXMvbG9nZ2VyL2xvZ2dlci50cyIsInNyYy9wYWNrYWdlcy9zc29GbG93L2NvbnN0YW50cy50cyIsInNyYy9wYWNrYWdlcy9zc29GbG93L3VwZGF0ZUh0dHBGdW5jdGlvbnMudHMiLCJzcmMvcGFja2FnZXMvc3NvRmxvdy9sb2FkU2NyaXB0LnRzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcnVuU1NPRmxvdyB9IGZyb20gXCIuL3J1blNTT0Zsb3dcIjtcbmltcG9ydCB7IEF1dGgwX1NQQV9KU19DRE4sIFpFTkRFU0tfV0lER0VUX0NETiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbG9hZFNjcmlwdCB9IGZyb20gXCIuL2xvYWRTY3JpcHRcIjtcbmltcG9ydCB7IHJlYWRDdXJyZW50U2NyaXB0U2l0ZUlkIH0gZnJvbSBcIi4vcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWRcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlclwiO1xuXG5jb25zdCBzaXRlSWQgPSByZWFkQ3VycmVudFNjcmlwdFNpdGVJZCgpO1xubG9nKFwic2l0ZUlkXCIsIHNpdGVJZCk7XG5cbmNvbnN0IHByb21pc2UgPSBsb2FkU2NyaXB0KHtcbiAgdXJsOiBBdXRoMF9TUEFfSlNfQ0ROLFxuICBuYW1lOiBcIkF1dGgwIFNQQSBqc1wiLFxufSk7XG5cbnByb21pc2UudGhlbigoKSA9PiB7XG4gIGxvYWRTY3JpcHQoe1xuICAgIHVybDogWkVOREVTS19XSURHRVRfQ0ROLFxuICAgIG5hbWU6IFwiWmVuZGVzayB3aWRnZXRcIixcbiAgICBpZEF0dHJpYnV0ZTogXCJ6ZS1zbmlwcGV0XCIsXG4gIH0pLnRoZW4oKCkgPT4ge1xuICAgIHJ1blNTT0Zsb3coe1xuICAgICAgYXV0aDBDbGllbnRPcHRpb25zOiB7XG4gICAgICAgIGRvbWFpbjogXCJhY2NvdW50cy50YWxrLnNlc2FtLmlvXCIsXG4gICAgICAgIGNsaWVudElkOiBcImtKcFBPUzMwdjhkcEQ2OGlSSjdQTWRTMDNId3ZxMDZYXCIsXG4gICAgICB9LFxuICAgICAgc2l0ZUlkLFxuICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiaW1wb3J0IHR5cGUgeyBSdW5TU09GbG93QXJncyB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBMb2dpbk1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IHB1c2hUb0RhdGFMYXllciwgc2hhMjU2IH0gZnJvbSBcIi4vYW5hbHl0aWNzXCI7XG5pbXBvcnQgeyB1cGRhdGVIdHRwRnVuY3Rpb25zIH0gZnJvbSBcIi4vdXBkYXRlSHR0cEZ1bmN0aW9uc1wiO1xuaW1wb3J0IHsgUkVESVJFQ1RfVVJJIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXJcIjtcblxuZXhwb3J0IGNvbnN0IHJ1blNTT0Zsb3cgPSAoYXJnczogUnVuU1NPRmxvd0FyZ3MpID0+IHtcbiAgY29uc3QgeyBhdXRoMENsaWVudE9wdGlvbnMsIHNpdGVJZCB9ID0gYXJncztcblxuICBsb2coXCJydW5TU09GbG93IHN0YXJ0XCIpO1xuXG4gIGlmICghd2luZG93Py5hdXRoMCkge1xuICAgIGxvZyhcImF1dGgwIGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgYXV0aDBJZCA9IFwiXCI7XG4gIGxvZyhcInJ1blNTT0Zsb3cgfiBhdXRoMElkOlwiLCBhdXRoMElkKTtcbiAgbGV0IHpUb2tlbiA9IFwiXCI7XG5cbiAgY29uc3QgYXV0aDBDbGllbnQgPSBuZXcgd2luZG93LmF1dGgwLkF1dGgwQ2xpZW50KGF1dGgwQ2xpZW50T3B0aW9ucyk7XG5cbiAgY29uc3QgYWZ0ZXJBdXRoZW50aWNhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgICBsb2coXCJhZnRlckF1dGhlbnRpY2F0aW9uIGludm9rZWQhXCIpO1xuXG4gICAgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gYXdhaXQgYXV0aDBDbGllbnQuaXNBdXRoZW50aWNhdGVkKCk7XG5cbiAgICBpZiAoaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICBsb2coXCJ1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuXG4gICAgaWYgKHF1ZXJ5LmluY2x1ZGVzKFwiY29kZT1cIikgJiYgcXVlcnkuaW5jbHVkZXMoXCJzdGF0ZT1cIikpIHtcbiAgICAgIGF3YWl0IGF1dGgwQ2xpZW50LmhhbmRsZVJlZGlyZWN0Q2FsbGJhY2soKTtcbiAgICAgIGF3YWl0IHVwZGF0ZUh0dHBGdW5jdGlvbnMoYXV0aDBDbGllbnQsIGF1dGgwSWQpO1xuXG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIFwiL1wiKTtcbiAgICB9XG4gIH07XG5cbiAgd2luZG93LnpFKFwibWVzc2VuZ2VyXCIsIFwiaGlkZVwiKTtcbiAgYWZ0ZXJBdXRoZW50aWNhdGlvbigpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQuZGF0YS5hdXRoMElkKSB7XG4gICAgICBsb2coXCJtZXNzYWdlIGRhdGFcIiwgZXZlbnQuZGF0YSk7XG4gICAgICBhdXRoMElkID0gZXZlbnQuZGF0YS5hdXRoMElkO1xuICAgICAgelRva2VuID0gZXZlbnQuZGF0YS56ZW5kZXNrVG9rZW47XG5cbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBhdXRoMENsaWVudC5nZXRVc2VyKCk7XG5cbiAgICAgIGlmICh1c2VyPy5lbWFpbCkge1xuICAgICAgICBjb25zdCBoYXNoZWRFbWFpbCA9IGF3YWl0IHNoYTI1Nih1c2VyLmVtYWlsKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHB1c2hUb0RhdGFMYXllcihcInNldFwiLCB7IHVzZXJfaWQ6IGhhc2hlZEVtYWlsIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoelRva2VuKSB7XG4gICAgICAgIGxvZyhcIm1lc3NhZ2UgLSB6VG9rZW5cIiwgelRva2VuKTtcblxuICAgICAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcyhcIi9jYWxsYmFja1wiKSkge1xuICAgICAgICAgIHdpbmRvdy56RShcbiAgICAgICAgICAgIFwibWVzc2VuZ2VyXCIsXG4gICAgICAgICAgICBcImxvZ2luVXNlclwiLFxuICAgICAgICAgICAgZnVuY3Rpb24gKGNhbGxiYWNrOiBaZW5kZXNrQ2FsbGJhY2tGbikge1xuICAgICAgICAgICAgICBjYWxsYmFjayh6VG9rZW4pO1xuICAgICAgICAgICAgICB3aW5kb3cuekUoXCJtZXNzZW5nZXJcIiwgXCJzaG93XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHVwZGF0ZUh0dHBGdW5jdGlvbnMoYXV0aDBDbGllbnQsIGF1dGgwSWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChldmVudC5kYXRhID09PSBMb2dpbk1lc3NhZ2VUeXBlLkxvZ2luKSB7XG4gICAgICBsb2coXCJtZXNzYWdlIC0gXCIsIExvZ2luTWVzc2FnZVR5cGUuTG9naW4pO1xuXG4gICAgICBhd2FpdCBhdXRoMENsaWVudC5sb2dpbldpdGhSZWRpcmVjdCh7XG4gICAgICAgIGF1dGhvcml6YXRpb25QYXJhbXM6IHtcbiAgICAgICAgICByZWRpcmVjdF91cmk6IFJFRElSRUNUX1VSSSxcbiAgICAgICAgICBcImV4dC1zaXRlX2lkXCI6IHNpdGVJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChldmVudC5kYXRhID09PSBMb2dpbk1lc3NhZ2VUeXBlLkxvZ291dCkge1xuICAgICAgbG9nKFwibWVzc2FnZSAtIFwiLCBMb2dpbk1lc3NhZ2VUeXBlLkxvZ291dCk7XG5cbiAgICAgIGF1dGgwQ2xpZW50LmxvZ291dCh7XG4gICAgICAgIGxvZ291dFBhcmFtczoge1xuICAgICAgICAgIHJldHVyblRvOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmRhdGEgPT09IExvZ2luTWVzc2FnZVR5cGUuU2lnbnVwKSB7XG4gICAgICBsb2coXCJtZXNzYWdlIC0gXCIsIExvZ2luTWVzc2FnZVR5cGUuU2lnbnVwKTtcblxuICAgICAgYXV0aDBDbGllbnQubG9naW5XaXRoUmVkaXJlY3Qoe1xuICAgICAgICBhdXRob3JpemF0aW9uUGFyYW1zOiB7XG4gICAgICAgICAgcmVkaXJlY3RfdXJpOiBSRURJUkVDVF9VUkksXG4gICAgICAgICAgc2NyZWVuX2hpbnQ6IFwic2lnbnVwXCIsXG4gICAgICAgICAgXCJleHQtc2l0ZV9pZFwiOiBzaXRlSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcbiIsImltcG9ydCB0eXBlIHsgQXV0aDBDbGllbnRPcHRpb25zIH0gZnJvbSBcIkBhdXRoMC9hdXRoMC1zcGEtanNcIjtcblxuZXhwb3J0IGVudW0gTG9naW5NZXNzYWdlVHlwZSB7XG4gIExvZ2luID0gXCJhdXRoMDpsb2dpblwiLFxuICBMb2dvdXQgPSBcImF1dGgwOmxvZ291dFwiLFxuICBTaWdudXAgPSBcImF1dGgwOnNpZ251cFwiLFxufVxuXG5leHBvcnQgdHlwZSBSdW5TU09GbG93QXJncyA9IHtcbiAgYXV0aDBDbGllbnRPcHRpb25zOiBBdXRoMENsaWVudE9wdGlvbnM7XG4gIHNpdGVJZD86IHN0cmluZyB8IFwiXCI7XG59O1xuXG5leHBvcnQgdHlwZSBMb2FkU2NyaXB0QXJncyA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBpZEF0dHJpYnV0ZT86IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG59O1xuXG4vLyBUaGUgZGF0YWxheWVyIG9iamVjdCBpcyBzZXQgb24gdGhlIHdpbmRvdyBvYmplY3QgYnkgdGhlIEdvb2dsZSBBbmFseXRpY3Mgc2NyaXB0XG4vLyBpdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgR0EsIHNldCBvcHRpb25zIG9yIHNlbmQgc3BlY2lmaWMgZXZlbnRzXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIGRhdGFMYXllcjogdW5rbm93bltdO1xuICB9XG59XG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXJcIjtcblxuLy8gR0Egc2NyaXB0IGlzIGxvYWRlZCBpbiBXaXggc2l0ZSBhbmQgbm90IGJ5IGBsb2FkU2NyaXB0YCwgdGhlcmVmb3JlIGB3aW5kb3cuZGF0YUxheWVyYCBsb2FkaW5nIG1pZ2h0IGJlIGRlbGF5ZWQuXG4vL1RPRE86IFdvcnRoIHRvIHRyeSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93L2xvYWRfZXZlbnRcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG5jb25zdCB3YWl0Rm9yRGF0YUxheWVyID0gKGNhbGxiYWNrOiBGdW5jdGlvbiwgYXR0ZW1wdCA9IDApID0+IHtcbiAgbG9nKFxuICAgIFwiV2FpdGluZyBmb3IgR0EgZGF0YUxheWVyXCIsXG4gICAgSlNPTi5zdHJpbmdpZnkod2luZG93LmRhdGFMYXllciksXG4gICAgXCIuIEF0dGVtcHQ6IFwiLFxuICAgIGF0dGVtcHRcbiAgKTtcbiAgY29uc3QgbWF4X2F0dGVtcHRzID0gMTA7XG4gIGlmIChhdHRlbXB0ID4gbWF4X2F0dGVtcHRzKSB7XG4gICAgbG9nKFwiV2FpdGluZyBmb3IgR0EgZGF0YUxheWVyOiBNYXggYXR0ZW1wdHMgcmVhY2hlZC5cIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh3aW5kb3cuZGF0YUxheWVyKSB7XG4gICAgbG9nKFwiR0EgZGF0YUxheWVyIGZvdW5kXCIpO1xuICAgIGNhbGxiYWNrKCk7XG4gIH0gZWxzZSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB3YWl0Rm9yRGF0YUxheWVyKGNhbGxiYWNrLCBhdHRlbXB0ICsgMSk7XG4gICAgfSwgNTAwKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDb25maWd1cmUgdGhlIEdBIG9iamVjdCwgc2V0IHBhcmFtZXRlcnMgb3Igc2VuZCBldmVudHNcbiAqIFRoaXMgY29kZSBpcyBtb2RpZmllZCBmcm9tIHRoZSBwdXJlLWpzIGNvZGUgZ2l2ZW4gYnkgR29vZ2xlIEFuYWx5dGljcyB0aGF0IGxvb2tzIGxpa2UgdGhpc1xuICogICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcbiAqICAgZnVuY3Rpb24gZ3RhZygpe2RhdGFMYXllci5wdXNoKGFyZ3VtZW50cyk7fVxuICogICBndGFnKCdqcycsIG5ldyBEYXRlKCkpO1xuICogICBndGFnKCdjb25maWcnLCAnPGlkPicpO1xuICogQHBhcmFtIGFyZ3MgYXJiaXRyYXJ5IGFyZ3VtZW50cyB0byB0aGUgR29vZ2xlIEFuYWx5dGljcyBvYmplY3QgKHNldCwgZXZlbnQsIGV0Yy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1c2hUb0RhdGFMYXllcigpIHtcbiAgbG9nKFwiQXR0ZW1wdGluZyB0byBwdXNoIHVzZXJfaWQgdG8gR0EgZGF0YUxheWVyLlwiKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xuICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICB3YWl0Rm9yRGF0YUxheWVyKCgpID0+IHtcbiAgICBsb2coXCJTZXR0aW5nIHRoZSB1c2VyLWlkXCIpO1xuICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaChhcmdzKTtcbiAgICBsb2coXCJ3aW5kb3cuZGF0YUxheWVyIGFmdGVyIHB1c2hpbmdcIiwgd2luZG93LmRhdGFMYXllcik7XG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2hhMjU2KG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIC8vIGVuY29kZSBhcyBVVEYtOFxuICBjb25zdCBtc2dCdWZmZXIgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUobWVzc2FnZSk7XG5cbiAgLy8gaGFzaCB0aGUgbWVzc2FnZVxuICBjb25zdCBoYXNoQnVmZmVyID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoXCJTSEEtMjU2XCIsIG1zZ0J1ZmZlcik7XG5cbiAgLy8gY29udmVydCBBcnJheUJ1ZmZlciB0byBBcnJheVxuICBjb25zdCBoYXNoQXJyYXkgPSBBcnJheS5mcm9tKG5ldyBVaW50OEFycmF5KGhhc2hCdWZmZXIpKTtcblxuICAvLyBjb252ZXJ0IGJ5dGVzIHRvIGhleCBzdHJpbmdcbiAgY29uc3QgaGFzaEhleCA9IGhhc2hBcnJheVxuICAgIC5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAuam9pbihcIlwiKTtcbiAgcmV0dXJuIGhhc2hIZXg7XG59XG4iLCJpbXBvcnQgeyBnZXRMb2dnZXJGbiB9IGZyb20gXCJwYWNrYWdlcy9sb2dnZXIvbG9nZ2VyXCI7XG5pbXBvcnQgeyBMT0dfU1RPUkFHRV9LRVkgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuY29uc3QgZW5hYmxlZCA9IEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9HX1NUT1JBR0VfS0VZKSk7XG5cbmV4cG9ydCBjb25zdCBsb2cgPSBnZXRMb2dnZXJGbihlbmFibGVkKTtcbiIsImV4cG9ydCBjb25zdCBnZXRMb2dnZXJGbiA9XG4gIChlbmFibGVkID0gZmFsc2UsIHByZWZpeCA9IFwiU1NPIEZsb3dcIikgPT5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgKHRpdGxlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgaWYgKCFlbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5pbmZvKFxuICAgICAgYCR7cHJlZml4fSAtICR7dGl0bGV9YCxcbiAgICAgIGFyZ3MubGVuZ3RoID8gYXJncyA6IFwiXCIsXG4gICAgICBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpXG4gICAgKTtcbiAgfTtcbiIsImV4cG9ydCBjb25zdCBBdXRoMF9TUEFfSlNfQ0ROID1cbiAgXCJodHRwczovL2Nkbi5hdXRoMC5jb20vanMvYXV0aDAtc3BhLWpzLzIuMC9hdXRoMC1zcGEtanMucHJvZHVjdGlvbi5qc1wiO1xuXG5leHBvcnQgY29uc3QgWkVOREVTS19XSURHRVRfQ0ROID1cbiAgXCJodHRwczovL3N0YXRpYy56ZGFzc2V0cy5jb20vZWtyL3NuaXBwZXQuanM/a2V5PWViN2Y1NTUyLWJlMzMtNGIwZi1hNTVkLWNlOWE4YTdhYTk3NVwiO1xuXG5leHBvcnQgY29uc3QgTE9HX1NUT1JBR0VfS0VZID0gXCJfbG9nU1NPRmxvd19cIjtcblxuZXhwb3J0IGNvbnN0IFJFRElSRUNUX1VSSSA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2NhbGxiYWNrYDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWFzeW5jLXByb21pc2UtZXhlY3V0b3IgKi9cbmltcG9ydCB0eXBlIHsgQXV0aDBDbGllbnQgfSBmcm9tIFwiQGF1dGgwL2F1dGgwLXNwYS1qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVIdHRwRnVuY3Rpb25zID0gKFxuICBhdXRoMENsaWVudDogQXV0aDBDbGllbnQsXG4gIGF1dGgwSWQ6IHN0cmluZ1xuKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgIGxvZyhcInVwZGF0ZUh0dHBGdW5jdGlvbnMgY2FsbGVkXCIpO1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGF1dGgwQ2xpZW50LmdldFVzZXIoKTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgbG9nKFwidXBkYXRlSHR0cEZ1bmN0aW9ucyAtPiB1c2VyIG5vdCBsb2dnZWQtaW4hXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghYXV0aDBJZCkge1xuICAgICAgbG9nKFwidXBkYXRlSHR0cEZ1bmN0aW9ucyAtPiBhdXRoMElkIGlzIG5vdCBkZWZpbmVkIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZmV0Y2god2luZG93LmxvY2F0aW9uLm9yaWdpbiArIFwiL19mdW5jdGlvbnMvYXV0aDAvXCIgKyBhdXRoMElkLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1c2VyIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgYXV0aDBDbGllbnQuZ2V0VG9rZW5TaWxlbnRseSgpO1xuXG4gICAgICBhd2FpdCBmZXRjaCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgXCIvX2Z1bmN0aW9ucy9hdXRoMC9cIiArIGF1dGgwSWQsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHRva2VuIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJmZXRjaCBlcnJvcjogXCIsIGVycik7XG4gICAgICBfcmVqZWN0KCk7XG4gICAgfVxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXJcIjtcbmltcG9ydCB7IExvYWRTY3JpcHRBcmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IGxvYWRTY3JpcHQgPSAoYXJnczogTG9hZFNjcmlwdEFyZ3MpID0+IHtcbiAgY29uc3QgeyB1cmwsIGlkQXR0cmlidXRlLCBuYW1lIH0gPSBhcmdzO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5oZWFkO1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgc2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgIHNjcmlwdC5zcmMgPSB1cmw7XG4gICAgc2NyaXB0LmlkID0gaWRBdHRyaWJ1dGUgPz8gXCJcIjtcblxuICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsb2coYCR7bmFtZX0gc2NyaXB0IGxvYWRlZGApO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IHJlYWRDdXJyZW50U2NyaXB0U2l0ZUlkID0gKCkgPT5cbiAgZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQ/LmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKFwiZGF0YS1zaXRlaWRcIik/LnZhbHVlO1xuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6InNzby1mbG93LmRldi5qcy5tYXAifQ==
