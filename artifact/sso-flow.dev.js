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
    const isSafari = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
    const redirectUri = isSafari ? window.location.origin : (0, _constants.REDIRECT_URI);
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
                    redirect_uri: redirectUri,
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
                    redirect_uri: redirectUri,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7UUFDdEMsT0FBTyxJQUFJLEdBQUc7UUFDZCxPQUFPLEdBQUcsR0FBRztRQUNiLE9BQU8sRUFBRSxHQUFHLGVBQWU7UUFFM0IsT0FBTyxNQUFNLEdBQUc7WUFDZCxDQUFBLEdBQUEsV0FBRyxBQUFELEVBQUUsQ0FBQyxFQUFFLEtBQUssY0FBYyxDQUFDO1lBRTNCO1FBQ0Y7UUFFQSxLQUFLLFdBQVcsQ0FBQztJQUNuQjtBQUNGOzs7Ozs2RENyQmE7QUFBTixNQUFNLDBCQUEwQixJQUNyQyxVQUFVLGVBQWUsV0FBVyxhQUFhLGdCQUFnQiIsInNvdXJjZXMiOlsic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvaW5kZXgudHMiLCJzcmMvcGFja2FnZXMvc3NvRmxvdy9ydW5TU09GbG93LnRzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvdHlwZXMudHMiLCJub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsInNyYy9wYWNrYWdlcy9zc29GbG93L2FuYWx5dGljcy50cyIsInNyYy9wYWNrYWdlcy9zc29GbG93L2xvZ2dlci50cyIsInNyYy9wYWNrYWdlcy9sb2dnZXIvbG9nZ2VyLnRzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvY29uc3RhbnRzLnRzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvdXBkYXRlSHR0cEZ1bmN0aW9ucy50cyIsInNyYy9wYWNrYWdlcy9zc29GbG93L2xvYWRTY3JpcHQudHMiLCJzcmMvcGFja2FnZXMvc3NvRmxvdy9yZWFkQ3VycmVudFNjcmlwdFNpdGVJZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBydW5TU09GbG93IH0gZnJvbSBcIi4vcnVuU1NPRmxvd1wiO1xuaW1wb3J0IHsgQXV0aDBfU1BBX0pTX0NETiwgWkVOREVTS19XSURHRVRfQ0ROIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBsb2FkU2NyaXB0IH0gZnJvbSBcIi4vbG9hZFNjcmlwdFwiO1xuaW1wb3J0IHsgcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWQgfSBmcm9tIFwiLi9yZWFkQ3VycmVudFNjcmlwdFNpdGVJZFwiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IHNpdGVJZCA9IHJlYWRDdXJyZW50U2NyaXB0U2l0ZUlkKCk7XG5sb2coXCJzaXRlSWRcIiwgc2l0ZUlkKTtcblxuY29uc3QgcHJvbWlzZSA9IGxvYWRTY3JpcHQoe1xuICB1cmw6IEF1dGgwX1NQQV9KU19DRE4sXG4gIG5hbWU6IFwiQXV0aDAgU1BBIGpzXCIsXG59KTtcblxucHJvbWlzZS50aGVuKCgpID0+IHtcbiAgbG9hZFNjcmlwdCh7XG4gICAgdXJsOiBaRU5ERVNLX1dJREdFVF9DRE4sXG4gICAgbmFtZTogXCJaZW5kZXNrIHdpZGdldFwiLFxuICAgIGlkQXR0cmlidXRlOiBcInplLXNuaXBwZXRcIixcbiAgfSkudGhlbigoKSA9PiB7XG4gICAgcnVuU1NPRmxvdyh7XG4gICAgICBhdXRoMENsaWVudE9wdGlvbnM6IHtcbiAgICAgICAgZG9tYWluOiBcImFjY291bnRzLnRhbGsuc2VzYW0uaW9cIixcbiAgICAgICAgY2xpZW50SWQ6IFwia0pwUE9TMzB2OGRwRDY4aVJKN1BNZFMwM0h3dnEwNlhcIixcbiAgICAgIH0sXG4gICAgICBzaXRlSWQsXG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgdHlwZSB7IFJ1blNTT0Zsb3dBcmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IExvZ2luTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgcHVzaFRvRGF0YUxheWVyLCBzaGEyNTYgfSBmcm9tIFwiLi9hbmFseXRpY3NcIjtcbmltcG9ydCB7IHVwZGF0ZUh0dHBGdW5jdGlvbnMgfSBmcm9tIFwiLi91cGRhdGVIdHRwRnVuY3Rpb25zXCI7XG5pbXBvcnQgeyBSRURJUkVDVF9VUkkgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlclwiO1xuXG5leHBvcnQgY29uc3QgcnVuU1NPRmxvdyA9IChhcmdzOiBSdW5TU09GbG93QXJncykgPT4ge1xuICBjb25zdCB7IGF1dGgwQ2xpZW50T3B0aW9ucywgc2l0ZUlkIH0gPSBhcmdzO1xuICBjb25zdCBpc1NhZmFyaSA9XG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIlNhZmFyaVwiKSAmJlxuICAgICFuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiQ2hyb21lXCIpO1xuXG4gIGNvbnN0IHJlZGlyZWN0VXJpID0gaXNTYWZhcmkgPyB3aW5kb3cubG9jYXRpb24ub3JpZ2luIDogUkVESVJFQ1RfVVJJO1xuXG4gIGxvZyhcInJ1blNTT0Zsb3cgc3RhcnRcIik7XG5cbiAgaWYgKCF3aW5kb3c/LmF1dGgwKSB7XG4gICAgbG9nKFwiYXV0aDAgZG9lcyBub3QgZXhpc3QhXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBhdXRoMElkID0gXCJcIjtcbiAgbG9nKFwicnVuU1NPRmxvdyB+IGF1dGgwSWQ6XCIsIGF1dGgwSWQpO1xuICBsZXQgelRva2VuID0gXCJcIjtcblxuICBjb25zdCBhdXRoMENsaWVudCA9IG5ldyB3aW5kb3cuYXV0aDAuQXV0aDBDbGllbnQoYXV0aDBDbGllbnRPcHRpb25zKTtcblxuICBjb25zdCBhZnRlckF1dGhlbnRpY2F0aW9uID0gYXN5bmMgKCkgPT4ge1xuICAgIGxvZyhcImFmdGVyQXV0aGVudGljYXRpb24gaW52b2tlZCFcIik7XG5cbiAgICBjb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSBhd2FpdCBhdXRoMENsaWVudC5pc0F1dGhlbnRpY2F0ZWQoKTtcblxuICAgIGlmIChpc0F1dGhlbnRpY2F0ZWQpIHtcbiAgICAgIGxvZyhcInVzZXIgaXMgYXV0aGVudGljYXRlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG5cbiAgICBpZiAocXVlcnkuaW5jbHVkZXMoXCJjb2RlPVwiKSAmJiBxdWVyeS5pbmNsdWRlcyhcInN0YXRlPVwiKSkge1xuICAgICAgYXdhaXQgYXV0aDBDbGllbnQuaGFuZGxlUmVkaXJlY3RDYWxsYmFjaygpO1xuICAgICAgYXdhaXQgdXBkYXRlSHR0cEZ1bmN0aW9ucyhhdXRoMENsaWVudCwgYXV0aDBJZCk7XG5cbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgXCIvXCIpO1xuICAgIH1cbiAgfTtcblxuICB3aW5kb3cuekUoXCJtZXNzZW5nZXJcIiwgXCJoaWRlXCIpO1xuICBhZnRlckF1dGhlbnRpY2F0aW9uKCk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGFzeW5jIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC5kYXRhLmF1dGgwSWQpIHtcbiAgICAgIGxvZyhcIm1lc3NhZ2UgZGF0YVwiLCBldmVudC5kYXRhKTtcbiAgICAgIGF1dGgwSWQgPSBldmVudC5kYXRhLmF1dGgwSWQ7XG4gICAgICB6VG9rZW4gPSBldmVudC5kYXRhLnplbmRlc2tUb2tlbjtcblxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGF1dGgwQ2xpZW50LmdldFVzZXIoKTtcblxuICAgICAgaWYgKHVzZXI/LmVtYWlsKSB7XG4gICAgICAgIGNvbnN0IGhhc2hlZEVtYWlsID0gYXdhaXQgc2hhMjU2KHVzZXIuZW1haWwpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcHVzaFRvRGF0YUxheWVyKFwic2V0XCIsIHsgdXNlcl9pZDogaGFzaGVkRW1haWwgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh6VG9rZW4pIHtcbiAgICAgICAgbG9nKFwibWVzc2FnZSAtIHpUb2tlblwiLCB6VG9rZW4pO1xuXG4gICAgICAgIGlmICghd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKFwiL2NhbGxiYWNrXCIpKSB7XG4gICAgICAgICAgd2luZG93LnpFKFxuICAgICAgICAgICAgXCJtZXNzZW5nZXJcIixcbiAgICAgICAgICAgIFwibG9naW5Vc2VyXCIsXG4gICAgICAgICAgICBmdW5jdGlvbiAoY2FsbGJhY2s6IFplbmRlc2tDYWxsYmFja0ZuKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHpUb2tlbik7XG4gICAgICAgICAgICAgIHdpbmRvdy56RShcIm1lc3NlbmdlclwiLCBcInNob3dcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdXBkYXRlSHR0cEZ1bmN0aW9ucyhhdXRoMENsaWVudCwgYXV0aDBJZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmRhdGEgPT09IExvZ2luTWVzc2FnZVR5cGUuTG9naW4pIHtcbiAgICAgIGxvZyhcIm1lc3NhZ2UgLSBcIiwgTG9naW5NZXNzYWdlVHlwZS5Mb2dpbik7XG5cbiAgICAgIGF3YWl0IGF1dGgwQ2xpZW50LmxvZ2luV2l0aFJlZGlyZWN0KHtcbiAgICAgICAgYXV0aG9yaXphdGlvblBhcmFtczoge1xuICAgICAgICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmksXG4gICAgICAgICAgXCJleHQtc2l0ZV9pZFwiOiBzaXRlSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuZGF0YSA9PT0gTG9naW5NZXNzYWdlVHlwZS5Mb2dvdXQpIHtcbiAgICAgIGxvZyhcIm1lc3NhZ2UgLSBcIiwgTG9naW5NZXNzYWdlVHlwZS5Mb2dvdXQpO1xuXG4gICAgICBhdXRoMENsaWVudC5sb2dvdXQoe1xuICAgICAgICBsb2dvdXRQYXJhbXM6IHtcbiAgICAgICAgICByZXR1cm5Ubzogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChldmVudC5kYXRhID09PSBMb2dpbk1lc3NhZ2VUeXBlLlNpZ251cCkge1xuICAgICAgbG9nKFwibWVzc2FnZSAtIFwiLCBMb2dpbk1lc3NhZ2VUeXBlLlNpZ251cCk7XG5cbiAgICAgIGF1dGgwQ2xpZW50LmxvZ2luV2l0aFJlZGlyZWN0KHtcbiAgICAgICAgYXV0aG9yaXphdGlvblBhcmFtczoge1xuICAgICAgICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmksXG4gICAgICAgICAgc2NyZWVuX2hpbnQ6IFwic2lnbnVwXCIsXG4gICAgICAgICAgXCJleHQtc2l0ZV9pZFwiOiBzaXRlSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcbiIsImltcG9ydCB0eXBlIHsgQXV0aDBDbGllbnRPcHRpb25zIH0gZnJvbSBcIkBhdXRoMC9hdXRoMC1zcGEtanNcIjtcblxuZXhwb3J0IGVudW0gTG9naW5NZXNzYWdlVHlwZSB7XG4gIExvZ2luID0gXCJhdXRoMDpsb2dpblwiLFxuICBMb2dvdXQgPSBcImF1dGgwOmxvZ291dFwiLFxuICBTaWdudXAgPSBcImF1dGgwOnNpZ251cFwiLFxufVxuXG5leHBvcnQgdHlwZSBSdW5TU09GbG93QXJncyA9IHtcbiAgYXV0aDBDbGllbnRPcHRpb25zOiBBdXRoMENsaWVudE9wdGlvbnM7XG4gIHNpdGVJZD86IHN0cmluZyB8IFwiXCI7XG59O1xuXG5leHBvcnQgdHlwZSBMb2FkU2NyaXB0QXJncyA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBpZEF0dHJpYnV0ZT86IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG59O1xuXG4vLyBUaGUgZGF0YWxheWVyIG9iamVjdCBpcyBzZXQgb24gdGhlIHdpbmRvdyBvYmplY3QgYnkgdGhlIEdvb2dsZSBBbmFseXRpY3Mgc2NyaXB0XG4vLyBpdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgR0EsIHNldCBvcHRpb25zIG9yIHNlbmQgc3BlY2lmaWMgZXZlbnRzXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIGRhdGFMYXllcjogdW5rbm93bltdO1xuICB9XG59XG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXJcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbmNvbnN0IHdhaXRGb3JEYXRhTGF5ZXIgPSAoY2FsbGJhY2s6IEZ1bmN0aW9uLCBhdHRlbXB0ID0gMCkgPT4ge1xuICBsb2coXG4gICAgXCJXYWl0aW5nIGZvciBHQSBkYXRhTGF5ZXJcIixcbiAgICBKU09OLnN0cmluZ2lmeSh3aW5kb3cuZGF0YUxheWVyKSxcbiAgICBcIi4gQXR0ZW1wdDogXCIsXG4gICAgYXR0ZW1wdFxuICApO1xuICBjb25zdCBtYXhfYXR0ZW1wdHMgPSAxMDtcbiAgaWYgKGF0dGVtcHQgPiBtYXhfYXR0ZW1wdHMpIHtcbiAgICBsb2coXCJXYWl0aW5nIGZvciBHQSBkYXRhTGF5ZXI6IE1heCBhdHRlbXB0cyByZWFjaGVkLlwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHdpbmRvdy5kYXRhTGF5ZXIpIHtcbiAgICBsb2coXCJHQSBkYXRhTGF5ZXIgZm91bmRcIik7XG4gICAgY2FsbGJhY2soKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhaXRGb3JEYXRhTGF5ZXIoY2FsbGJhY2ssIGF0dGVtcHQgKyAxKTtcbiAgICB9LCA1MDApO1xuICB9XG59O1xuXG4vKipcbiAqIENvbmZpZ3VyZSB0aGUgR0Egb2JqZWN0LCBzZXQgcGFyYW1ldGVycyBvciBzZW5kIGV2ZW50c1xuICogVGhpcyBjb2RlIGlzIG1vZGlmaWVkIGZyb20gdGhlIHB1cmUtanMgY29kZSBnaXZlbiBieSBHb29nbGUgQW5hbHl0aWNzIHRoYXQgbG9va3MgbGlrZSB0aGlzXG4gKiAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuICogICBmdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9XG4gKiAgIGd0YWcoJ2pzJywgbmV3IERhdGUoKSk7XG4gKiAgIGd0YWcoJ2NvbmZpZycsICc8aWQ+Jyk7XG4gKiBAcGFyYW0gYXJncyBhcmJpdHJhcnkgYXJndW1lbnRzIHRvIHRoZSBHb29nbGUgQW5hbHl0aWNzIG9iamVjdCAoc2V0LCBldmVudCwgZXRjLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVzaFRvRGF0YUxheWVyKCkge1xuICBsb2coXCJBdHRlbXB0aW5nIHRvIHB1c2ggdXNlcl9pZCB0byBHQSBkYXRhTGF5ZXIuXCIpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gIHdhaXRGb3JEYXRhTGF5ZXIoKCkgPT4ge1xuICAgIGxvZyhcIlNldHRpbmcgdGhlIHVzZXItaWRcIik7XG4gICAgd2luZG93LmRhdGFMYXllci5wdXNoKGFyZ3MpO1xuICAgIGxvZyhcIndpbmRvdy5kYXRhTGF5ZXIgYWZ0ZXIgcHVzaGluZ1wiLCB3aW5kb3cuZGF0YUxheWVyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaGEyNTYobWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgLy8gZW5jb2RlIGFzIFVURi04XG4gIGNvbnN0IG1zZ0J1ZmZlciA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShtZXNzYWdlKTtcblxuICAvLyBoYXNoIHRoZSBtZXNzYWdlXG4gIGNvbnN0IGhhc2hCdWZmZXIgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChcIlNIQS0yNTZcIiwgbXNnQnVmZmVyKTtcblxuICAvLyBjb252ZXJ0IEFycmF5QnVmZmVyIHRvIEFycmF5XG4gIGNvbnN0IGhhc2hBcnJheSA9IEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoaGFzaEJ1ZmZlcikpO1xuXG4gIC8vIGNvbnZlcnQgYnl0ZXMgdG8gaGV4IHN0cmluZ1xuICBjb25zdCBoYXNoSGV4ID0gaGFzaEFycmF5XG4gICAgLm1hcCgoYikgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgIC5qb2luKFwiXCIpO1xuICByZXR1cm4gaGFzaEhleDtcbn1cbiIsImltcG9ydCB7IGdldExvZ2dlckZuIH0gZnJvbSBcInBhY2thZ2VzL2xvZ2dlci9sb2dnZXJcIjtcbmltcG9ydCB7IExPR19TVE9SQUdFX0tFWSB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5jb25zdCBlbmFibGVkID0gQm9vbGVhbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0dfU1RPUkFHRV9LRVkpKTtcblxuZXhwb3J0IGNvbnN0IGxvZyA9IGdldExvZ2dlckZuKGVuYWJsZWQpO1xuIiwiZXhwb3J0IGNvbnN0IGdldExvZ2dlckZuID1cbiAgKGVuYWJsZWQgPSBmYWxzZSwgcHJlZml4ID0gXCJTU08gRmxvd1wiKSA9PlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAodGl0bGU6IHN0cmluZywgLi4uYXJnczogYW55W10pID0+IHtcbiAgICBpZiAoIWVuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmluZm8oXG4gICAgICBgJHtwcmVmaXh9IC0gJHt0aXRsZX1gLFxuICAgICAgYXJncy5sZW5ndGggPyBhcmdzIDogXCJcIixcbiAgICAgIG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKClcbiAgICApO1xuICB9O1xuIiwiZXhwb3J0IGNvbnN0IEF1dGgwX1NQQV9KU19DRE4gPVxuICBcImh0dHBzOi8vY2RuLmF1dGgwLmNvbS9qcy9hdXRoMC1zcGEtanMvMi4wL2F1dGgwLXNwYS1qcy5wcm9kdWN0aW9uLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBaRU5ERVNLX1dJREdFVF9DRE4gPVxuICBcImh0dHBzOi8vc3RhdGljLnpkYXNzZXRzLmNvbS9la3Ivc25pcHBldC5qcz9rZXk9ZWI3ZjU1NTItYmUzMy00YjBmLWE1NWQtY2U5YThhN2FhOTc1XCI7XG5cbmV4cG9ydCBjb25zdCBMT0dfU1RPUkFHRV9LRVkgPSBcIl9sb2dTU09GbG93X1wiO1xuXG5leHBvcnQgY29uc3QgUkVESVJFQ1RfVVJJID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vY2FsbGJhY2tgO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tYXN5bmMtcHJvbWlzZS1leGVjdXRvciAqL1xuaW1wb3J0IHR5cGUgeyBBdXRoMENsaWVudCB9IGZyb20gXCJAYXV0aDAvYXV0aDAtc3BhLWpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXJcIjtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUh0dHBGdW5jdGlvbnMgPSAoXG4gIGF1dGgwQ2xpZW50OiBBdXRoMENsaWVudCxcbiAgYXV0aDBJZDogc3RyaW5nXG4pID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgbG9nKFwidXBkYXRlSHR0cEZ1bmN0aW9ucyBjYWxsZWRcIik7XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgYXV0aDBDbGllbnQuZ2V0VXNlcigpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICBsb2coXCJ1cGRhdGVIdHRwRnVuY3Rpb25zIC0+IHVzZXIgbm90IGxvZ2dlZC1pbiFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFhdXRoMElkKSB7XG4gICAgICBsb2coXCJ1cGRhdGVIdHRwRnVuY3Rpb25zIC0+IGF1dGgwSWQgaXMgbm90IGRlZmluZWQhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBmZXRjaCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgXCIvX2Z1bmN0aW9ucy9hdXRoMC9cIiArIGF1dGgwSWQsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHVzZXIgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBhdXRoMENsaWVudC5nZXRUb2tlblNpbGVudGx5KCk7XG5cbiAgICAgIGF3YWl0IGZldGNoKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBcIi9fZnVuY3Rpb25zL2F1dGgwL1wiICsgYXV0aDBJZCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdG9rZW4gfSksXG4gICAgICB9KTtcblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcImZldGNoIGVycm9yOiBcIiwgZXJyKTtcbiAgICAgIF9yZWplY3QoKTtcbiAgICB9XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHsgTG9hZFNjcmlwdEFyZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgbG9hZFNjcmlwdCA9IChhcmdzOiBMb2FkU2NyaXB0QXJncykgPT4ge1xuICBjb25zdCB7IHVybCwgaWRBdHRyaWJ1dGUsIG5hbWUgfSA9IGFyZ3M7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmhlYWQ7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gICAgc2NyaXB0LnNyYyA9IHVybDtcbiAgICBzY3JpcHQuaWQgPSBpZEF0dHJpYnV0ZSA/PyBcIlwiO1xuXG4gICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxvZyhgJHtuYW1lfSBzY3JpcHQgbG9hZGVkYCk7XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9O1xuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9KTtcbn07XG4iLCJleHBvcnQgY29uc3QgcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWQgPSAoKSA9PlxuICBkb2N1bWVudD8uY3VycmVudFNjcmlwdD8uYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oXCJkYXRhLXNpdGVpZFwiKT8udmFsdWU7XG4iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoic3NvLWZsb3cuZGV2LmpzLm1hcCJ9
