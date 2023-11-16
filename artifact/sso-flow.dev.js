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
    const redirectUri = isSafari ? window.location.hostname : (0, _constants.REDIRECT_URI);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7UUFDdEMsT0FBTyxJQUFJLEdBQUc7UUFDZCxPQUFPLEdBQUcsR0FBRztRQUNiLE9BQU8sRUFBRSxHQUFHLGVBQWU7UUFFM0IsT0FBTyxNQUFNLEdBQUc7WUFDZCxDQUFBLEdBQUEsV0FBRyxBQUFELEVBQUUsQ0FBQyxFQUFFLEtBQUssY0FBYyxDQUFDO1lBRTNCO1FBQ0Y7UUFFQSxLQUFLLFdBQVcsQ0FBQztJQUNuQjtBQUNGOzs7Ozs2RENyQmE7QUFBTixNQUFNLDBCQUEwQixJQUNyQyxVQUFVLGVBQWUsV0FBVyxhQUFhLGdCQUFnQiIsInNvdXJjZXMiOlsic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvaW5kZXgudHMiLCJzcmMvcGFja2FnZXMvc3NvRmxvdy9ydW5TU09GbG93LnRzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvdHlwZXMudHMiLCJub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsInNyYy9wYWNrYWdlcy9zc29GbG93L2FuYWx5dGljcy50cyIsInNyYy9wYWNrYWdlcy9zc29GbG93L2xvZ2dlci50cyIsInNyYy9wYWNrYWdlcy9sb2dnZXIvbG9nZ2VyLnRzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvY29uc3RhbnRzLnRzIiwic3JjL3BhY2thZ2VzL3Nzb0Zsb3cvdXBkYXRlSHR0cEZ1bmN0aW9ucy50cyIsInNyYy9wYWNrYWdlcy9zc29GbG93L2xvYWRTY3JpcHQudHMiLCJzcmMvcGFja2FnZXMvc3NvRmxvdy9yZWFkQ3VycmVudFNjcmlwdFNpdGVJZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBydW5TU09GbG93IH0gZnJvbSBcIi4vcnVuU1NPRmxvd1wiO1xuaW1wb3J0IHsgQXV0aDBfU1BBX0pTX0NETiwgWkVOREVTS19XSURHRVRfQ0ROIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBsb2FkU2NyaXB0IH0gZnJvbSBcIi4vbG9hZFNjcmlwdFwiO1xuaW1wb3J0IHsgcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWQgfSBmcm9tIFwiLi9yZWFkQ3VycmVudFNjcmlwdFNpdGVJZFwiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IHNpdGVJZCA9IHJlYWRDdXJyZW50U2NyaXB0U2l0ZUlkKCk7XG5sb2coXCJzaXRlSWRcIiwgc2l0ZUlkKTtcblxuY29uc3QgcHJvbWlzZSA9IGxvYWRTY3JpcHQoe1xuICB1cmw6IEF1dGgwX1NQQV9KU19DRE4sXG4gIG5hbWU6IFwiQXV0aDAgU1BBIGpzXCIsXG59KTtcblxucHJvbWlzZS50aGVuKCgpID0+IHtcbiAgbG9hZFNjcmlwdCh7XG4gICAgdXJsOiBaRU5ERVNLX1dJREdFVF9DRE4sXG4gICAgbmFtZTogXCJaZW5kZXNrIHdpZGdldFwiLFxuICAgIGlkQXR0cmlidXRlOiBcInplLXNuaXBwZXRcIixcbiAgfSkudGhlbigoKSA9PiB7XG4gICAgcnVuU1NPRmxvdyh7XG4gICAgICBhdXRoMENsaWVudE9wdGlvbnM6IHtcbiAgICAgICAgZG9tYWluOiBcImFjY291bnRzLnRhbGsuc2VzYW0uaW9cIixcbiAgICAgICAgY2xpZW50SWQ6IFwia0pwUE9TMzB2OGRwRDY4aVJKN1BNZFMwM0h3dnEwNlhcIixcbiAgICAgIH0sXG4gICAgICBzaXRlSWQsXG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgdHlwZSB7IFJ1blNTT0Zsb3dBcmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IExvZ2luTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgcHVzaFRvRGF0YUxheWVyLCBzaGEyNTYgfSBmcm9tIFwiLi9hbmFseXRpY3NcIjtcbmltcG9ydCB7IHVwZGF0ZUh0dHBGdW5jdGlvbnMgfSBmcm9tIFwiLi91cGRhdGVIdHRwRnVuY3Rpb25zXCI7XG5pbXBvcnQgeyBSRURJUkVDVF9VUkkgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlclwiO1xuXG5leHBvcnQgY29uc3QgcnVuU1NPRmxvdyA9IChhcmdzOiBSdW5TU09GbG93QXJncykgPT4ge1xuICBjb25zdCB7IGF1dGgwQ2xpZW50T3B0aW9ucywgc2l0ZUlkIH0gPSBhcmdzO1xuICBjb25zdCBpc1NhZmFyaSA9XG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIlNhZmFyaVwiKSAmJlxuICAgICFuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiQ2hyb21lXCIpO1xuXG4gIGNvbnN0IHJlZGlyZWN0VXJpID0gaXNTYWZhcmkgPyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgOiBSRURJUkVDVF9VUkk7XG5cbiAgbG9nKFwicnVuU1NPRmxvdyBzdGFydFwiKTtcblxuICBpZiAoIXdpbmRvdz8uYXV0aDApIHtcbiAgICBsb2coXCJhdXRoMCBkb2VzIG5vdCBleGlzdCFcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGF1dGgwSWQgPSBcIlwiO1xuICBsb2coXCJydW5TU09GbG93IH4gYXV0aDBJZDpcIiwgYXV0aDBJZCk7XG4gIGxldCB6VG9rZW4gPSBcIlwiO1xuXG4gIGNvbnN0IGF1dGgwQ2xpZW50ID0gbmV3IHdpbmRvdy5hdXRoMC5BdXRoMENsaWVudChhdXRoMENsaWVudE9wdGlvbnMpO1xuXG4gIGNvbnN0IGFmdGVyQXV0aGVudGljYXRpb24gPSBhc3luYyAoKSA9PiB7XG4gICAgbG9nKFwiYWZ0ZXJBdXRoZW50aWNhdGlvbiBpbnZva2VkIVwiKTtcblxuICAgIGNvbnN0IGlzQXV0aGVudGljYXRlZCA9IGF3YWl0IGF1dGgwQ2xpZW50LmlzQXV0aGVudGljYXRlZCgpO1xuXG4gICAgaWYgKGlzQXV0aGVudGljYXRlZCkge1xuICAgICAgbG9nKFwidXNlciBpcyBhdXRoZW50aWNhdGVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcblxuICAgIGlmIChxdWVyeS5pbmNsdWRlcyhcImNvZGU9XCIpICYmIHF1ZXJ5LmluY2x1ZGVzKFwic3RhdGU9XCIpKSB7XG4gICAgICBhd2FpdCBhdXRoMENsaWVudC5oYW5kbGVSZWRpcmVjdENhbGxiYWNrKCk7XG4gICAgICBhd2FpdCB1cGRhdGVIdHRwRnVuY3Rpb25zKGF1dGgwQ2xpZW50LCBhdXRoMElkKTtcblxuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBcIi9cIik7XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy56RShcIm1lc3NlbmdlclwiLCBcImhpZGVcIik7XG4gIGFmdGVyQXV0aGVudGljYXRpb24oKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LmRhdGEuYXV0aDBJZCkge1xuICAgICAgbG9nKFwibWVzc2FnZSBkYXRhXCIsIGV2ZW50LmRhdGEpO1xuICAgICAgYXV0aDBJZCA9IGV2ZW50LmRhdGEuYXV0aDBJZDtcbiAgICAgIHpUb2tlbiA9IGV2ZW50LmRhdGEuemVuZGVza1Rva2VuO1xuXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgYXV0aDBDbGllbnQuZ2V0VXNlcigpO1xuXG4gICAgICBpZiAodXNlcj8uZW1haWwpIHtcbiAgICAgICAgY29uc3QgaGFzaGVkRW1haWwgPSBhd2FpdCBzaGEyNTYodXNlci5lbWFpbCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwdXNoVG9EYXRhTGF5ZXIoXCJzZXRcIiwgeyB1c2VyX2lkOiBoYXNoZWRFbWFpbCB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHpUb2tlbikge1xuICAgICAgICBsb2coXCJtZXNzYWdlIC0gelRva2VuXCIsIHpUb2tlbik7XG5cbiAgICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoXCIvY2FsbGJhY2tcIikpIHtcbiAgICAgICAgICB3aW5kb3cuekUoXG4gICAgICAgICAgICBcIm1lc3NlbmdlclwiLFxuICAgICAgICAgICAgXCJsb2dpblVzZXJcIixcbiAgICAgICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjazogWmVuZGVza0NhbGxiYWNrRm4pIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soelRva2VuKTtcbiAgICAgICAgICAgICAgd2luZG93LnpFKFwibWVzc2VuZ2VyXCIsIFwic2hvd1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB1cGRhdGVIdHRwRnVuY3Rpb25zKGF1dGgwQ2xpZW50LCBhdXRoMElkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuZGF0YSA9PT0gTG9naW5NZXNzYWdlVHlwZS5Mb2dpbikge1xuICAgICAgbG9nKFwibWVzc2FnZSAtIFwiLCBMb2dpbk1lc3NhZ2VUeXBlLkxvZ2luKTtcblxuICAgICAgYXdhaXQgYXV0aDBDbGllbnQubG9naW5XaXRoUmVkaXJlY3Qoe1xuICAgICAgICBhdXRob3JpemF0aW9uUGFyYW1zOiB7XG4gICAgICAgICAgcmVkaXJlY3RfdXJpOiByZWRpcmVjdFVyaSxcbiAgICAgICAgICBcImV4dC1zaXRlX2lkXCI6IHNpdGVJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChldmVudC5kYXRhID09PSBMb2dpbk1lc3NhZ2VUeXBlLkxvZ291dCkge1xuICAgICAgbG9nKFwibWVzc2FnZSAtIFwiLCBMb2dpbk1lc3NhZ2VUeXBlLkxvZ291dCk7XG5cbiAgICAgIGF1dGgwQ2xpZW50LmxvZ291dCh7XG4gICAgICAgIGxvZ291dFBhcmFtczoge1xuICAgICAgICAgIHJldHVyblRvOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmRhdGEgPT09IExvZ2luTWVzc2FnZVR5cGUuU2lnbnVwKSB7XG4gICAgICBsb2coXCJtZXNzYWdlIC0gXCIsIExvZ2luTWVzc2FnZVR5cGUuU2lnbnVwKTtcblxuICAgICAgYXV0aDBDbGllbnQubG9naW5XaXRoUmVkaXJlY3Qoe1xuICAgICAgICBhdXRob3JpemF0aW9uUGFyYW1zOiB7XG4gICAgICAgICAgcmVkaXJlY3RfdXJpOiByZWRpcmVjdFVyaSxcbiAgICAgICAgICBzY3JlZW5faGludDogXCJzaWdudXBcIixcbiAgICAgICAgICBcImV4dC1zaXRlX2lkXCI6IHNpdGVJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiaW1wb3J0IHR5cGUgeyBBdXRoMENsaWVudE9wdGlvbnMgfSBmcm9tIFwiQGF1dGgwL2F1dGgwLXNwYS1qc1wiO1xuXG5leHBvcnQgZW51bSBMb2dpbk1lc3NhZ2VUeXBlIHtcbiAgTG9naW4gPSBcImF1dGgwOmxvZ2luXCIsXG4gIExvZ291dCA9IFwiYXV0aDA6bG9nb3V0XCIsXG4gIFNpZ251cCA9IFwiYXV0aDA6c2lnbnVwXCIsXG59XG5cbmV4cG9ydCB0eXBlIFJ1blNTT0Zsb3dBcmdzID0ge1xuICBhdXRoMENsaWVudE9wdGlvbnM6IEF1dGgwQ2xpZW50T3B0aW9ucztcbiAgc2l0ZUlkPzogc3RyaW5nIHwgXCJcIjtcbn07XG5cbmV4cG9ydCB0eXBlIExvYWRTY3JpcHRBcmdzID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGlkQXR0cmlidXRlPzogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbn07XG5cbi8vIFRoZSBkYXRhbGF5ZXIgb2JqZWN0IGlzIHNldCBvbiB0aGUgd2luZG93IG9iamVjdCBieSB0aGUgR29vZ2xlIEFuYWx5dGljcyBzY3JpcHRcbi8vIGl0IGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSBHQSwgc2V0IG9wdGlvbnMgb3Igc2VuZCBzcGVjaWZpYyBldmVudHNcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgZGF0YUxheWVyOiB1bmtub3duW107XG4gIH1cbn1cbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiIsImltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlclwiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuY29uc3Qgd2FpdEZvckRhdGFMYXllciA9IChjYWxsYmFjazogRnVuY3Rpb24sIGF0dGVtcHQgPSAwKSA9PiB7XG4gIGxvZyhcbiAgICBcIldhaXRpbmcgZm9yIEdBIGRhdGFMYXllclwiLFxuICAgIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5kYXRhTGF5ZXIpLFxuICAgIFwiLiBBdHRlbXB0OiBcIixcbiAgICBhdHRlbXB0XG4gICk7XG4gIGNvbnN0IG1heF9hdHRlbXB0cyA9IDEwO1xuICBpZiAoYXR0ZW1wdCA+IG1heF9hdHRlbXB0cykge1xuICAgIGxvZyhcIldhaXRpbmcgZm9yIEdBIGRhdGFMYXllcjogTWF4IGF0dGVtcHRzIHJlYWNoZWQuXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAod2luZG93LmRhdGFMYXllcikge1xuICAgIGxvZyhcIkdBIGRhdGFMYXllciBmb3VuZFwiKTtcbiAgICBjYWxsYmFjaygpO1xuICB9IGVsc2Uge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgd2FpdEZvckRhdGFMYXllcihjYWxsYmFjaywgYXR0ZW1wdCArIDEpO1xuICAgIH0sIDUwMCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ29uZmlndXJlIHRoZSBHQSBvYmplY3QsIHNldCBwYXJhbWV0ZXJzIG9yIHNlbmQgZXZlbnRzXG4gKiBUaGlzIGNvZGUgaXMgbW9kaWZpZWQgZnJvbSB0aGUgcHVyZS1qcyBjb2RlIGdpdmVuIGJ5IEdvb2dsZSBBbmFseXRpY3MgdGhhdCBsb29rcyBsaWtlIHRoaXNcbiAqICAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG4gKiAgIGZ1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO31cbiAqICAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcbiAqICAgZ3RhZygnY29uZmlnJywgJzxpZD4nKTtcbiAqIEBwYXJhbSBhcmdzIGFyYml0cmFyeSBhcmd1bWVudHMgdG8gdGhlIEdvb2dsZSBBbmFseXRpY3Mgb2JqZWN0IChzZXQsIGV2ZW50LCBldGMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdXNoVG9EYXRhTGF5ZXIoKSB7XG4gIGxvZyhcIkF0dGVtcHRpbmcgdG8gcHVzaCB1c2VyX2lkIHRvIEdBIGRhdGFMYXllci5cIik7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcbiAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcbiAgd2FpdEZvckRhdGFMYXllcigoKSA9PiB7XG4gICAgbG9nKFwiU2V0dGluZyB0aGUgdXNlci1pZFwiKTtcbiAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goYXJncyk7XG4gICAgbG9nKFwid2luZG93LmRhdGFMYXllciBhZnRlciBwdXNoaW5nXCIsIHdpbmRvdy5kYXRhTGF5ZXIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNoYTI1NihtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAvLyBlbmNvZGUgYXMgVVRGLThcbiAgY29uc3QgbXNnQnVmZmVyID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKG1lc3NhZ2UpO1xuXG4gIC8vIGhhc2ggdGhlIG1lc3NhZ2VcbiAgY29uc3QgaGFzaEJ1ZmZlciA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KFwiU0hBLTI1NlwiLCBtc2dCdWZmZXIpO1xuXG4gIC8vIGNvbnZlcnQgQXJyYXlCdWZmZXIgdG8gQXJyYXlcbiAgY29uc3QgaGFzaEFycmF5ID0gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShoYXNoQnVmZmVyKSk7XG5cbiAgLy8gY29udmVydCBieXRlcyB0byBoZXggc3RyaW5nXG4gIGNvbnN0IGhhc2hIZXggPSBoYXNoQXJyYXlcbiAgICAubWFwKChiKSA9PiBiLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIikpXG4gICAgLmpvaW4oXCJcIik7XG4gIHJldHVybiBoYXNoSGV4O1xufVxuIiwiaW1wb3J0IHsgZ2V0TG9nZ2VyRm4gfSBmcm9tIFwicGFja2FnZXMvbG9nZ2VyL2xvZ2dlclwiO1xuaW1wb3J0IHsgTE9HX1NUT1JBR0VfS0VZIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmNvbnN0IGVuYWJsZWQgPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPR19TVE9SQUdFX0tFWSkpO1xuXG5leHBvcnQgY29uc3QgbG9nID0gZ2V0TG9nZ2VyRm4oZW5hYmxlZCk7XG4iLCJleHBvcnQgY29uc3QgZ2V0TG9nZ2VyRm4gPVxuICAoZW5hYmxlZCA9IGZhbHNlLCBwcmVmaXggPSBcIlNTTyBGbG93XCIpID0+XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICh0aXRsZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGlmICghZW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgIGAke3ByZWZpeH0gLSAke3RpdGxlfWAsXG4gICAgICBhcmdzLmxlbmd0aCA/IGFyZ3MgOiBcIlwiLFxuICAgICAgbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKVxuICAgICk7XG4gIH07XG4iLCJleHBvcnQgY29uc3QgQXV0aDBfU1BBX0pTX0NETiA9XG4gIFwiaHR0cHM6Ly9jZG4uYXV0aDAuY29tL2pzL2F1dGgwLXNwYS1qcy8yLjAvYXV0aDAtc3BhLWpzLnByb2R1Y3Rpb24uanNcIjtcblxuZXhwb3J0IGNvbnN0IFpFTkRFU0tfV0lER0VUX0NETiA9XG4gIFwiaHR0cHM6Ly9zdGF0aWMuemRhc3NldHMuY29tL2Vrci9zbmlwcGV0LmpzP2tleT1lYjdmNTU1Mi1iZTMzLTRiMGYtYTU1ZC1jZTlhOGE3YWE5NzVcIjtcblxuZXhwb3J0IGNvbnN0IExPR19TVE9SQUdFX0tFWSA9IFwiX2xvZ1NTT0Zsb3dfXCI7XG5cbmV4cG9ydCBjb25zdCBSRURJUkVDVF9VUkkgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9jYWxsYmFja2A7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1hc3luYy1wcm9taXNlLWV4ZWN1dG9yICovXG5pbXBvcnQgdHlwZSB7IEF1dGgwQ2xpZW50IH0gZnJvbSBcIkBhdXRoMC9hdXRoMC1zcGEtanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlclwiO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlSHR0cEZ1bmN0aW9ucyA9IChcbiAgYXV0aDBDbGllbnQ6IEF1dGgwQ2xpZW50LFxuICBhdXRoMElkOiBzdHJpbmdcbikgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUsIF9yZWplY3QpID0+IHtcbiAgICBsb2coXCJ1cGRhdGVIdHRwRnVuY3Rpb25zIGNhbGxlZFwiKTtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBhdXRoMENsaWVudC5nZXRVc2VyKCk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIGxvZyhcInVwZGF0ZUh0dHBGdW5jdGlvbnMgLT4gdXNlciBub3QgbG9nZ2VkLWluIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWF1dGgwSWQpIHtcbiAgICAgIGxvZyhcInVwZGF0ZUh0dHBGdW5jdGlvbnMgLT4gYXV0aDBJZCBpcyBub3QgZGVmaW5lZCFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZldGNoKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBcIi9fZnVuY3Rpb25zL2F1dGgwL1wiICsgYXV0aDBJZCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXNlciB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGF1dGgwQ2xpZW50LmdldFRva2VuU2lsZW50bHkoKTtcblxuICAgICAgYXdhaXQgZmV0Y2god2luZG93LmxvY2F0aW9uLm9yaWdpbiArIFwiL19mdW5jdGlvbnMvYXV0aDAvXCIgKyBhdXRoMElkLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0b2tlbiB9KSxcbiAgICAgIH0pO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiZmV0Y2ggZXJyb3I6IFwiLCBlcnIpO1xuICAgICAgX3JlamVjdCgpO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5pbXBvcnQgeyBMb2FkU2NyaXB0QXJncyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBsb2FkU2NyaXB0ID0gKGFyZ3M6IExvYWRTY3JpcHRBcmdzKSA9PiB7XG4gIGNvbnN0IHsgdXJsLCBpZEF0dHJpYnV0ZSwgbmFtZSB9ID0gYXJncztcblxuICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuaGVhZDtcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICBzY3JpcHQuc3JjID0gdXJsO1xuICAgIHNjcmlwdC5pZCA9IGlkQXR0cmlidXRlID8/IFwiXCI7XG5cbiAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgbG9nKGAke25hbWV9IHNjcmlwdCBsb2FkZWRgKTtcblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH07XG5cbiAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH0pO1xufTtcbiIsImV4cG9ydCBjb25zdCByZWFkQ3VycmVudFNjcmlwdFNpdGVJZCA9ICgpID0+XG4gIGRvY3VtZW50Py5jdXJyZW50U2NyaXB0Py5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbShcImRhdGEtc2l0ZWlkXCIpPy52YWx1ZTtcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJzc28tZmxvdy5kZXYuanMubWFwIn0=
