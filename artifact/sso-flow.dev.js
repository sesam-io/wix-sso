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
const getLoggerFn = (enabled = false, prefix = "SSO Flow")=>(title, ...args)=>{
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
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
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
    return new Promise((resolve, _reject)=>{
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBLEtBQUssV0FBVyxDQUFDO0lBQ25CO0FBQ0Y7Ozs7OzZEQ3JCYTtBQUFOLE1BQU0sMEJBQTBCLElBQ3JDLFVBQVUsZUFBZSxXQUFXLGFBQWEsZ0JBQWdCIiwic291cmNlcyI6WyJzcmMvcGFja2FnZXMvc3NvRmxvdy9pbmRleC50cyIsInNyYy9wYWNrYWdlcy9zc29GbG93L3J1blNTT0Zsb3cudHMiLCJzcmMvcGFja2FnZXMvc3NvRmxvdy90eXBlcy50cyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvYW5hbHl0aWNzLnRzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvbG9nZ2VyLnRzIiwic3JjL3BhY2thZ2VzL2xvZ2dlci9sb2dnZXIudHMiLCJzcmMvcGFja2FnZXMvc3NvRmxvdy9jb25zdGFudHMudHMiLCJzcmMvcGFja2FnZXMvc3NvRmxvdy91cGRhdGVIdHRwRnVuY3Rpb25zLnRzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvbG9hZFNjcmlwdC50cyIsInNyYy9wYWNrYWdlcy9zc29GbG93L3JlYWRDdXJyZW50U2NyaXB0U2l0ZUlkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJ1blNTT0Zsb3cgfSBmcm9tIFwiLi9ydW5TU09GbG93XCI7XG5pbXBvcnQgeyBBdXRoMF9TUEFfSlNfQ0ROLCBaRU5ERVNLX1dJREdFVF9DRE4gfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGxvYWRTY3JpcHQgfSBmcm9tIFwiLi9sb2FkU2NyaXB0XCI7XG5pbXBvcnQgeyByZWFkQ3VycmVudFNjcmlwdFNpdGVJZCB9IGZyb20gXCIuL3JlYWRDdXJyZW50U2NyaXB0U2l0ZUlkXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXJcIjtcblxuY29uc3Qgc2l0ZUlkID0gcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWQoKTtcbmxvZyhcInNpdGVJZFwiLCBzaXRlSWQpO1xuXG5jb25zdCBwcm9taXNlID0gbG9hZFNjcmlwdCh7XG4gIHVybDogQXV0aDBfU1BBX0pTX0NETixcbiAgbmFtZTogXCJBdXRoMCBTUEEganNcIixcbn0pO1xuXG5wcm9taXNlLnRoZW4oKCkgPT4ge1xuICBsb2FkU2NyaXB0KHtcbiAgICB1cmw6IFpFTkRFU0tfV0lER0VUX0NETixcbiAgICBuYW1lOiBcIlplbmRlc2sgd2lkZ2V0XCIsXG4gICAgaWRBdHRyaWJ1dGU6IFwiemUtc25pcHBldFwiLFxuICB9KS50aGVuKCgpID0+IHtcbiAgICBydW5TU09GbG93KHtcbiAgICAgIGF1dGgwQ2xpZW50T3B0aW9uczoge1xuICAgICAgICBkb21haW46IFwiYWNjb3VudHMudGFsay5zZXNhbS5pb1wiLFxuICAgICAgICBjbGllbnRJZDogXCJrSnBQT1MzMHY4ZHBENjhpUko3UE1kUzAzSHd2cTA2WFwiLFxuICAgICAgfSxcbiAgICAgIHNpdGVJZCxcbiAgICB9KTtcbiAgfSk7XG59KTtcbiIsImltcG9ydCB0eXBlIHsgUnVuU1NPRmxvd0FyZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgTG9naW5NZXNzYWdlVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBwdXNoVG9EYXRhTGF5ZXIsIHNoYTI1NiB9IGZyb20gXCIuL2FuYWx5dGljc1wiO1xuaW1wb3J0IHsgdXBkYXRlSHR0cEZ1bmN0aW9ucyB9IGZyb20gXCIuL3VwZGF0ZUh0dHBGdW5jdGlvbnNcIjtcbmltcG9ydCB7IFJFRElSRUNUX1VSSSB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCBydW5TU09GbG93ID0gKGFyZ3M6IFJ1blNTT0Zsb3dBcmdzKSA9PiB7XG4gIGNvbnN0IHsgYXV0aDBDbGllbnRPcHRpb25zLCBzaXRlSWQgfSA9IGFyZ3M7XG5cbiAgbG9nKFwicnVuU1NPRmxvdyBzdGFydFwiKTtcblxuICBpZiAoIXdpbmRvdz8uYXV0aDApIHtcbiAgICBsb2coXCJhdXRoMCBkb2VzIG5vdCBleGlzdCFcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGF1dGgwSWQgPSBcIlwiO1xuICBsb2coXCJydW5TU09GbG93IH4gYXV0aDBJZDpcIiwgYXV0aDBJZCk7XG4gIGxldCB6VG9rZW4gPSBcIlwiO1xuXG4gIGNvbnN0IGF1dGgwQ2xpZW50ID0gbmV3IHdpbmRvdy5hdXRoMC5BdXRoMENsaWVudChhdXRoMENsaWVudE9wdGlvbnMpO1xuXG4gIGNvbnN0IGFmdGVyQXV0aGVudGljYXRpb24gPSBhc3luYyAoKSA9PiB7XG4gICAgbG9nKFwiYWZ0ZXJBdXRoZW50aWNhdGlvbiBpbnZva2VkIVwiKTtcblxuICAgIGNvbnN0IGlzQXV0aGVudGljYXRlZCA9IGF3YWl0IGF1dGgwQ2xpZW50LmlzQXV0aGVudGljYXRlZCgpO1xuXG4gICAgaWYgKGlzQXV0aGVudGljYXRlZCkge1xuICAgICAgbG9nKFwidXNlciBpcyBhdXRoZW50aWNhdGVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcblxuICAgIGlmIChxdWVyeS5pbmNsdWRlcyhcImNvZGU9XCIpICYmIHF1ZXJ5LmluY2x1ZGVzKFwic3RhdGU9XCIpKSB7XG4gICAgICBhd2FpdCBhdXRoMENsaWVudC5oYW5kbGVSZWRpcmVjdENhbGxiYWNrKCk7XG4gICAgICBhd2FpdCB1cGRhdGVIdHRwRnVuY3Rpb25zKGF1dGgwQ2xpZW50LCBhdXRoMElkKTtcblxuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBcIi9cIik7XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy56RShcIm1lc3NlbmdlclwiLCBcImhpZGVcIik7XG4gIGFmdGVyQXV0aGVudGljYXRpb24oKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LmRhdGEuYXV0aDBJZCkge1xuICAgICAgbG9nKFwibWVzc2FnZSBkYXRhXCIsIGV2ZW50LmRhdGEpO1xuICAgICAgYXV0aDBJZCA9IGV2ZW50LmRhdGEuYXV0aDBJZDtcbiAgICAgIHpUb2tlbiA9IGV2ZW50LmRhdGEuemVuZGVza1Rva2VuO1xuXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgYXV0aDBDbGllbnQuZ2V0VXNlcigpO1xuXG4gICAgICBpZiAodXNlcj8uZW1haWwpIHtcbiAgICAgICAgY29uc3QgaGFzaGVkRW1haWwgPSBhd2FpdCBzaGEyNTYodXNlci5lbWFpbCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcHVzaFRvRGF0YUxheWVyKFwic2V0XCIsIHsgdXNlcl9pZDogaGFzaGVkRW1haWwgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh6VG9rZW4pIHtcbiAgICAgICAgbG9nKFwibWVzc2FnZSAtIHpUb2tlblwiLCB6VG9rZW4pO1xuXG4gICAgICAgIGlmICghd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKFwiL2NhbGxiYWNrXCIpKSB7XG4gICAgICAgICAgd2luZG93LnpFKFxuICAgICAgICAgICAgXCJtZXNzZW5nZXJcIixcbiAgICAgICAgICAgIFwibG9naW5Vc2VyXCIsXG4gICAgICAgICAgICBmdW5jdGlvbiAoY2FsbGJhY2s6IFplbmRlc2tDYWxsYmFja0ZuKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHpUb2tlbik7XG4gICAgICAgICAgICAgIHdpbmRvdy56RShcIm1lc3NlbmdlclwiLCBcInNob3dcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdXBkYXRlSHR0cEZ1bmN0aW9ucyhhdXRoMENsaWVudCwgYXV0aDBJZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmRhdGEgPT09IExvZ2luTWVzc2FnZVR5cGUuTG9naW4pIHtcbiAgICAgIGxvZyhcIm1lc3NhZ2UgLSBcIiwgTG9naW5NZXNzYWdlVHlwZS5Mb2dpbik7XG5cbiAgICAgIGF3YWl0IGF1dGgwQ2xpZW50LmxvZ2luV2l0aFJlZGlyZWN0KHtcbiAgICAgICAgYXV0aG9yaXphdGlvblBhcmFtczoge1xuICAgICAgICAgIHJlZGlyZWN0X3VyaTogUkVESVJFQ1RfVVJJLFxuICAgICAgICAgIFwiZXh0LXNpdGVfaWRcIjogc2l0ZUlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmRhdGEgPT09IExvZ2luTWVzc2FnZVR5cGUuTG9nb3V0KSB7XG4gICAgICBsb2coXCJtZXNzYWdlIC0gXCIsIExvZ2luTWVzc2FnZVR5cGUuTG9nb3V0KTtcblxuICAgICAgYXV0aDBDbGllbnQubG9nb3V0KHtcbiAgICAgICAgbG9nb3V0UGFyYW1zOiB7XG4gICAgICAgICAgcmV0dXJuVG86IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuZGF0YSA9PT0gTG9naW5NZXNzYWdlVHlwZS5TaWdudXApIHtcbiAgICAgIGxvZyhcIm1lc3NhZ2UgLSBcIiwgTG9naW5NZXNzYWdlVHlwZS5TaWdudXApO1xuXG4gICAgICBhdXRoMENsaWVudC5sb2dpbldpdGhSZWRpcmVjdCh7XG4gICAgICAgIGF1dGhvcml6YXRpb25QYXJhbXM6IHtcbiAgICAgICAgICByZWRpcmVjdF91cmk6IFJFRElSRUNUX1VSSSxcbiAgICAgICAgICBzY3JlZW5faGludDogXCJzaWdudXBcIixcbiAgICAgICAgICBcImV4dC1zaXRlX2lkXCI6IHNpdGVJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiaW1wb3J0IHR5cGUgeyBBdXRoMENsaWVudE9wdGlvbnMgfSBmcm9tIFwiQGF1dGgwL2F1dGgwLXNwYS1qc1wiO1xuXG5leHBvcnQgZW51bSBMb2dpbk1lc3NhZ2VUeXBlIHtcbiAgTG9naW4gPSBcImF1dGgwOmxvZ2luXCIsXG4gIExvZ291dCA9IFwiYXV0aDA6bG9nb3V0XCIsXG4gIFNpZ251cCA9IFwiYXV0aDA6c2lnbnVwXCIsXG59XG5cbmV4cG9ydCB0eXBlIFJ1blNTT0Zsb3dBcmdzID0ge1xuICBhdXRoMENsaWVudE9wdGlvbnM6IEF1dGgwQ2xpZW50T3B0aW9ucztcbiAgc2l0ZUlkPzogc3RyaW5nIHwgXCJcIjtcbn07XG5cbmV4cG9ydCB0eXBlIExvYWRTY3JpcHRBcmdzID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGlkQXR0cmlidXRlPzogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbn07XG5cbi8vIFRoZSBkYXRhbGF5ZXIgb2JqZWN0IGlzIHNldCBvbiB0aGUgd2luZG93IG9iamVjdCBieSB0aGUgR29vZ2xlIEFuYWx5dGljcyBzY3JpcHRcbi8vIGl0IGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSBHQSwgc2V0IG9wdGlvbnMgb3Igc2VuZCBzcGVjaWZpYyBldmVudHNcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgZGF0YUxheWVyOiBhbnlbXTtcbiAgfVxufVxuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IHdhaXRGb3JEYXRhTGF5ZXIgPSAoY2FsbGJhY2s6IEZ1bmN0aW9uLCBhdHRlbXB0ID0gMCkgPT4ge1xuICBsb2coXG4gICAgXCJXYWl0aW5nIGZvciBHQSBkYXRhTGF5ZXJcIixcbiAgICBKU09OLnN0cmluZ2lmeSh3aW5kb3cuZGF0YUxheWVyKSxcbiAgICBcIi4gQXR0ZW1wdDogXCIsXG4gICAgYXR0ZW1wdFxuICApO1xuICBjb25zdCBtYXhfYXR0ZW1wdHMgPSAxMDtcbiAgaWYgKGF0dGVtcHQgPiBtYXhfYXR0ZW1wdHMpIHtcbiAgICBsb2coXCJXYWl0aW5nIGZvciBHQSBkYXRhTGF5ZXI6IE1heCBhdHRlbXB0cyByZWFjaGVkLlwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHdpbmRvdy5kYXRhTGF5ZXIpIHtcbiAgICBsb2coXCJHQSBkYXRhTGF5ZXIgZm91bmRcIik7XG4gICAgY2FsbGJhY2soKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhaXRGb3JEYXRhTGF5ZXIoY2FsbGJhY2ssIGF0dGVtcHQgKyAxKTtcbiAgICB9LCA1MDApO1xuICB9XG59O1xuXG4vKipcbiAqIENvbmZpZ3VyZSB0aGUgR0Egb2JqZWN0LCBzZXQgcGFyYW1ldGVycyBvciBzZW5kIGV2ZW50c1xuICogVGhpcyBjb2RlIGlzIG1vZGlmaWVkIGZyb20gdGhlIHB1cmUtanMgY29kZSBnaXZlbiBieSBHb29nbGUgQW5hbHl0aWNzIHRoYXQgbG9va3MgbGlrZSB0aGlzXG4gKiAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuICogICBmdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9XG4gKiAgIGd0YWcoJ2pzJywgbmV3IERhdGUoKSk7XG4gKiAgIGd0YWcoJ2NvbmZpZycsICc8aWQ+Jyk7XG4gKiBAcGFyYW0gYXJncyBhcmJpdHJhcnkgYXJndW1lbnRzIHRvIHRoZSBHb29nbGUgQW5hbHl0aWNzIG9iamVjdCAoc2V0LCBldmVudCwgZXRjLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVzaFRvRGF0YUxheWVyKCkge1xuICBsb2coXCJBdHRlbXB0aW5nIHRvIHB1c2ggdXNlcl9pZCB0byBHQSBkYXRhTGF5ZXIuXCIpO1xuICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICB3YWl0Rm9yRGF0YUxheWVyKCgpID0+IHtcbiAgICBsb2coXCJTZXR0aW5nIHRoZSB1c2VyLWlkXCIpO1xuICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaChhcmdzKTtcbiAgICBsb2coXCJ3aW5kb3cuZGF0YUxheWVyIGFmdGVyIHB1c2hpbmdcIiwgd2luZG93LmRhdGFMYXllcik7XG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2hhMjU2KG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIC8vIGVuY29kZSBhcyBVVEYtOFxuICBjb25zdCBtc2dCdWZmZXIgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUobWVzc2FnZSk7XG5cbiAgLy8gaGFzaCB0aGUgbWVzc2FnZVxuICBjb25zdCBoYXNoQnVmZmVyID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoXCJTSEEtMjU2XCIsIG1zZ0J1ZmZlcik7XG5cbiAgLy8gY29udmVydCBBcnJheUJ1ZmZlciB0byBBcnJheVxuICBjb25zdCBoYXNoQXJyYXkgPSBBcnJheS5mcm9tKG5ldyBVaW50OEFycmF5KGhhc2hCdWZmZXIpKTtcblxuICAvLyBjb252ZXJ0IGJ5dGVzIHRvIGhleCBzdHJpbmdcbiAgY29uc3QgaGFzaEhleCA9IGhhc2hBcnJheVxuICAgIC5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAuam9pbihcIlwiKTtcbiAgcmV0dXJuIGhhc2hIZXg7XG59XG4iLCJpbXBvcnQgeyBnZXRMb2dnZXJGbiB9IGZyb20gXCJwYWNrYWdlcy9sb2dnZXIvbG9nZ2VyXCI7XG5pbXBvcnQgeyBMT0dfU1RPUkFHRV9LRVkgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuY29uc3QgZW5hYmxlZCA9IEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9HX1NUT1JBR0VfS0VZKSk7XG5cbmV4cG9ydCBjb25zdCBsb2cgPSBnZXRMb2dnZXJGbihlbmFibGVkKTtcbiIsImV4cG9ydCBjb25zdCBnZXRMb2dnZXJGbiA9XG4gIChlbmFibGVkID0gZmFsc2UsIHByZWZpeCA9IFwiU1NPIEZsb3dcIikgPT5cbiAgKHRpdGxlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgaWYgKCFlbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5pbmZvKFxuICAgICAgYCR7cHJlZml4fSAtICR7dGl0bGV9YCxcbiAgICAgIGFyZ3MubGVuZ3RoID8gYXJncyA6IFwiXCIsXG4gICAgICBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpXG4gICAgKTtcbiAgfTtcbiIsImV4cG9ydCBjb25zdCBBdXRoMF9TUEFfSlNfQ0ROID1cbiAgXCJodHRwczovL2Nkbi5hdXRoMC5jb20vanMvYXV0aDAtc3BhLWpzLzIuMC9hdXRoMC1zcGEtanMucHJvZHVjdGlvbi5qc1wiO1xuXG5leHBvcnQgY29uc3QgWkVOREVTS19XSURHRVRfQ0ROID1cbiAgXCJodHRwczovL3N0YXRpYy56ZGFzc2V0cy5jb20vZWtyL3NuaXBwZXQuanM/a2V5PWViN2Y1NTUyLWJlMzMtNGIwZi1hNTVkLWNlOWE4YTdhYTk3NVwiO1xuXG5leHBvcnQgY29uc3QgTE9HX1NUT1JBR0VfS0VZID0gXCJfbG9nU1NPRmxvd19cIjtcblxuZXhwb3J0IGNvbnN0IFJFRElSRUNUX1VSSSA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2NhbGxiYWNrYDtcbiIsImltcG9ydCB0eXBlIHsgQXV0aDBDbGllbnQgfSBmcm9tIFwiQGF1dGgwL2F1dGgwLXNwYS1qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVIdHRwRnVuY3Rpb25zID0gKFxuICBhdXRoMENsaWVudDogQXV0aDBDbGllbnQsXG4gIGF1dGgwSWQ6IHN0cmluZ1xuKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgIGxvZyhcInVwZGF0ZUh0dHBGdW5jdGlvbnMgY2FsbGVkXCIpO1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGF1dGgwQ2xpZW50LmdldFVzZXIoKTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgbG9nKFwidXBkYXRlSHR0cEZ1bmN0aW9ucyAtPiB1c2VyIG5vdCBsb2dnZWQtaW4hXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghYXV0aDBJZCkge1xuICAgICAgbG9nKFwidXBkYXRlSHR0cEZ1bmN0aW9ucyAtPiBhdXRoMElkIGlzIG5vdCBkZWZpbmVkIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZmV0Y2god2luZG93LmxvY2F0aW9uLm9yaWdpbiArIFwiL19mdW5jdGlvbnMvYXV0aDAvXCIgKyBhdXRoMElkLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1c2VyIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgYXV0aDBDbGllbnQuZ2V0VG9rZW5TaWxlbnRseSgpO1xuXG4gICAgICBhd2FpdCBmZXRjaCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgXCIvX2Z1bmN0aW9ucy9hdXRoMC9cIiArIGF1dGgwSWQsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHRva2VuIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJmZXRjaCBlcnJvcjogXCIsIGVycik7XG4gICAgICBfcmVqZWN0KCk7XG4gICAgfVxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXJcIjtcbmltcG9ydCB7IExvYWRTY3JpcHRBcmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IGxvYWRTY3JpcHQgPSAoYXJnczogTG9hZFNjcmlwdEFyZ3MpID0+IHtcbiAgY29uc3QgeyB1cmwsIGlkQXR0cmlidXRlLCBuYW1lIH0gPSBhcmdzO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5oZWFkO1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgc2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgIHNjcmlwdC5zcmMgPSB1cmw7XG4gICAgc2NyaXB0LmlkID0gaWRBdHRyaWJ1dGUgPz8gXCJcIjtcblxuICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsb2coYCR7bmFtZX0gc2NyaXB0IGxvYWRlZGApO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IHJlYWRDdXJyZW50U2NyaXB0U2l0ZUlkID0gKCkgPT5cbiAgZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQ/LmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKFwiZGF0YS1zaXRlaWRcIik/LnZhbHVlO1xuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6InNzby1mbG93LmRldi5qcy5tYXAifQ==
