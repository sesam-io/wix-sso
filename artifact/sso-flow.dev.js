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
})({"5TZPo":[function(require,module,exports) {
var _runSSOFlow = require("./runSSOFlow");
var _constants = require("./constants");
var _loadScript = require("./loadScript");
var _logger = require("./logger");
var _readCurrentScriptSiteId = require("./readCurrentScriptSiteId");
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

},{"./runSSOFlow":"jBuTD","./constants":"3sN1i","./loadScript":"cRtuQ","./logger":"8XDxp","./readCurrentScriptSiteId":"8nDZf"}],"jBuTD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "runSSOFlow", ()=>runSSOFlow);
var _logger = require("./logger");
var _types = require("./types");
var _analytics = require("./analytics");
var _updateHttpFunctions = require("./updateHttpFunctions");
var _constants = require("./constants");
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

},{"./logger":"8XDxp","./types":"lvEar","./analytics":"96ivw","./updateHttpFunctions":"2P8Ph","./constants":"3sN1i","@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"8XDxp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "log", ()=>log);
var _constants = require("./constants");
const getLoggerFn = (enabled = false)=>(title, ...args)=>{
        if (!enabled) return;
        console.info(`SSO FLow - ${title}`, args.length ? args : "", new Date().toLocaleTimeString());
    };
const enabled = Boolean(localStorage.getItem((0, _constants.LOG_STORAGE_KEY)));
const log = getLoggerFn(enabled);

},{"./constants":"3sN1i","@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"3sN1i":[function(require,module,exports) {
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

},{}],"lvEar":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LoginMessageType", ()=>LoginMessageType);
var LoginMessageType;
(function(LoginMessageType) {
    LoginMessageType["Login"] = "auth0:login";
    LoginMessageType["Logout"] = "auth0:logout";
    LoginMessageType["Signup"] = "auth0:signup";
})(LoginMessageType || (LoginMessageType = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"96ivw":[function(require,module,exports) {
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

},{"./logger":"8XDxp","@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"2P8Ph":[function(require,module,exports) {
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

},{"./logger":"8XDxp","@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"cRtuQ":[function(require,module,exports) {
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

},{"./logger":"8XDxp","@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}],"8nDZf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "readCurrentScriptSiteId", ()=>readCurrentScriptSiteId);
const readCurrentScriptSiteId = ()=>document?.currentScript?.attributes.getNamedItem("data-siteid")?.value;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9EVjn"}]},["5TZPo"], "5TZPo", "parcelRequire7e83")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixJQUNyQyxVQUFVLGVBQWUsV0FBVyxhQUFhLGdCQUFnQiIsInNvdXJjZXMiOlsic3JjL2luZGV4LnRzIiwic3JjL3J1blNTT0Zsb3cudHMiLCJzcmMvbG9nZ2VyLnRzIiwic3JjL2NvbnN0YW50cy50cyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIiwic3JjL3R5cGVzLnRzIiwic3JjL2FuYWx5dGljcy50cyIsInNyYy91cGRhdGVIdHRwRnVuY3Rpb25zLnRzIiwic3JjL2xvYWRTY3JpcHQudHMiLCJzcmMvcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcnVuU1NPRmxvdyB9IGZyb20gXCIuL3J1blNTT0Zsb3dcIjtcbmltcG9ydCB7IEF1dGgwX1NQQV9KU19DRE4sIFpFTkRFU0tfV0lER0VUX0NETiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbG9hZFNjcmlwdCB9IGZyb20gXCIuL2xvYWRTY3JpcHRcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHsgcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWQgfSBmcm9tIFwiLi9yZWFkQ3VycmVudFNjcmlwdFNpdGVJZFwiO1xuXG5jb25zdCBzaXRlSWQgPSByZWFkQ3VycmVudFNjcmlwdFNpdGVJZCgpO1xubG9nKFwic2l0ZUlkXCIsIHNpdGVJZCk7XG5cbmNvbnN0IHByb21pc2UgPSBsb2FkU2NyaXB0KHtcbiAgdXJsOiBBdXRoMF9TUEFfSlNfQ0ROLFxuICBuYW1lOiBcIkF1dGgwIFNQQSBqc1wiLFxufSk7XG5cbnByb21pc2UudGhlbigoKSA9PiB7XG4gIGxvYWRTY3JpcHQoe1xuICAgIHVybDogWkVOREVTS19XSURHRVRfQ0ROLFxuICAgIG5hbWU6IFwiWmVuZGVzayB3aWRnZXRcIixcbiAgICBpZEF0dHJpYnV0ZTogXCJ6ZS1zbmlwcGV0XCIsXG4gIH0pLnRoZW4oKCkgPT4ge1xuICAgIHJ1blNTT0Zsb3coe1xuICAgICAgYXV0aDBDbGllbnRPcHRpb25zOiB7XG4gICAgICAgIGRvbWFpbjogXCJhY2NvdW50cy50YWxrLnNlc2FtLmlvXCIsXG4gICAgICAgIGNsaWVudElkOiBcImtKcFBPUzMwdjhkcEQ2OGlSSjdQTWRTMDNId3ZxMDZYXCIsXG4gICAgICB9LFxuICAgICAgc2l0ZUlkLFxuICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5pbXBvcnQgdHlwZSB7IFJ1blNTT0Zsb3dBcmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IExvZ2luTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgcHVzaFRvRGF0YUxheWVyLCBzaGEyNTYgfSBmcm9tIFwiLi9hbmFseXRpY3NcIjtcbmltcG9ydCB7IHVwZGF0ZUh0dHBGdW5jdGlvbnMgfSBmcm9tIFwiLi91cGRhdGVIdHRwRnVuY3Rpb25zXCI7XG5pbXBvcnQgeyBSRURJUkVDVF9VUkkgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IHJ1blNTT0Zsb3cgPSAoYXJnczogUnVuU1NPRmxvd0FyZ3MpID0+IHtcbiAgY29uc3QgeyBhdXRoMENsaWVudE9wdGlvbnMsIHNpdGVJZCB9ID0gYXJncztcblxuICBsb2coXCJydW5TU09GbG93IHN0YXJ0XCIpO1xuXG4gIGlmICghd2luZG93Py5hdXRoMCkge1xuICAgIGxvZyhcImF1dGgwIGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgYXV0aDBJZCA9IFwiXCI7XG4gIGxvZyhcInJ1blNTT0Zsb3cgfiBhdXRoMElkOlwiLCBhdXRoMElkKTtcbiAgbGV0IHpUb2tlbiA9IFwiXCI7XG5cbiAgY29uc3QgYXV0aDBDbGllbnQgPSBuZXcgd2luZG93LmF1dGgwLkF1dGgwQ2xpZW50KGF1dGgwQ2xpZW50T3B0aW9ucyk7XG5cbiAgY29uc3QgYWZ0ZXJBdXRoZW50aWNhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgICBsb2coXCJhZnRlckF1dGhlbnRpY2F0aW9uIGludm9rZWQhXCIpO1xuXG4gICAgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gYXdhaXQgYXV0aDBDbGllbnQuaXNBdXRoZW50aWNhdGVkKCk7XG5cbiAgICBpZiAoaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICBsb2coXCJ1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuXG4gICAgaWYgKHF1ZXJ5LmluY2x1ZGVzKFwiY29kZT1cIikgJiYgcXVlcnkuaW5jbHVkZXMoXCJzdGF0ZT1cIikpIHtcbiAgICAgIGF3YWl0IGF1dGgwQ2xpZW50LmhhbmRsZVJlZGlyZWN0Q2FsbGJhY2soKTtcbiAgICAgIGF3YWl0IHVwZGF0ZUh0dHBGdW5jdGlvbnMoYXV0aDBDbGllbnQsIGF1dGgwSWQpO1xuXG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIFwiL1wiKTtcbiAgICB9XG4gIH07XG5cbiAgd2luZG93LnpFKFwibWVzc2VuZ2VyXCIsIFwiaGlkZVwiKTtcbiAgYWZ0ZXJBdXRoZW50aWNhdGlvbigpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQuZGF0YS5hdXRoMElkKSB7XG4gICAgICBsb2coXCJtZXNzYWdlIGRhdGFcIiwgZXZlbnQuZGF0YSk7XG4gICAgICBhdXRoMElkID0gZXZlbnQuZGF0YS5hdXRoMElkO1xuICAgICAgelRva2VuID0gZXZlbnQuZGF0YS56ZW5kZXNrVG9rZW47XG5cbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBhdXRoMENsaWVudC5nZXRVc2VyKCk7XG5cbiAgICAgIGlmICh1c2VyPy5lbWFpbCkge1xuICAgICAgICBjb25zdCBoYXNoZWRFbWFpbCA9IGF3YWl0IHNoYTI1Nih1c2VyLmVtYWlsKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwdXNoVG9EYXRhTGF5ZXIoXCJzZXRcIiwgeyB1c2VyX2lkOiBoYXNoZWRFbWFpbCB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHpUb2tlbikge1xuICAgICAgICBsb2coXCJtZXNzYWdlIC0gelRva2VuXCIsIHpUb2tlbik7XG5cbiAgICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoXCIvY2FsbGJhY2tcIikpIHtcbiAgICAgICAgICB3aW5kb3cuekUoXG4gICAgICAgICAgICBcIm1lc3NlbmdlclwiLFxuICAgICAgICAgICAgXCJsb2dpblVzZXJcIixcbiAgICAgICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjazogWmVuZGVza0NhbGxiYWNrRm4pIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soelRva2VuKTtcbiAgICAgICAgICAgICAgd2luZG93LnpFKFwibWVzc2VuZ2VyXCIsIFwic2hvd1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB1cGRhdGVIdHRwRnVuY3Rpb25zKGF1dGgwQ2xpZW50LCBhdXRoMElkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuZGF0YSA9PT0gTG9naW5NZXNzYWdlVHlwZS5Mb2dpbikge1xuICAgICAgbG9nKFwibWVzc2FnZSAtIFwiLCBMb2dpbk1lc3NhZ2VUeXBlLkxvZ2luKTtcblxuICAgICAgYXdhaXQgYXV0aDBDbGllbnQubG9naW5XaXRoUmVkaXJlY3Qoe1xuICAgICAgICBhdXRob3JpemF0aW9uUGFyYW1zOiB7XG4gICAgICAgICAgcmVkaXJlY3RfdXJpOiBSRURJUkVDVF9VUkksXG4gICAgICAgICAgXCJleHQtc2l0ZV9pZFwiOiBzaXRlSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuZGF0YSA9PT0gTG9naW5NZXNzYWdlVHlwZS5Mb2dvdXQpIHtcbiAgICAgIGxvZyhcIm1lc3NhZ2UgLSBcIiwgTG9naW5NZXNzYWdlVHlwZS5Mb2dvdXQpO1xuXG4gICAgICBhdXRoMENsaWVudC5sb2dvdXQoe1xuICAgICAgICBsb2dvdXRQYXJhbXM6IHtcbiAgICAgICAgICByZXR1cm5Ubzogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChldmVudC5kYXRhID09PSBMb2dpbk1lc3NhZ2VUeXBlLlNpZ251cCkge1xuICAgICAgbG9nKFwibWVzc2FnZSAtIFwiLCBMb2dpbk1lc3NhZ2VUeXBlLlNpZ251cCk7XG5cbiAgICAgIGF1dGgwQ2xpZW50LmxvZ2luV2l0aFJlZGlyZWN0KHtcbiAgICAgICAgYXV0aG9yaXphdGlvblBhcmFtczoge1xuICAgICAgICAgIHJlZGlyZWN0X3VyaTogUkVESVJFQ1RfVVJJLFxuICAgICAgICAgIHNjcmVlbl9oaW50OiBcInNpZ251cFwiLFxuICAgICAgICAgIFwiZXh0LXNpdGVfaWRcIjogc2l0ZUlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBMT0dfU1RPUkFHRV9LRVkgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuY29uc3QgZ2V0TG9nZ2VyRm4gPVxuICAoZW5hYmxlZCA9IGZhbHNlKSA9PlxuICAodGl0bGU6IHN0cmluZywgLi4uYXJnczogYW55W10pID0+IHtcbiAgICBpZiAoIWVuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmluZm8oXG4gICAgICBgU1NPIEZMb3cgLSAke3RpdGxlfWAsXG4gICAgICBhcmdzLmxlbmd0aCA/IGFyZ3MgOiBcIlwiLFxuICAgICAgbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKVxuICAgICk7XG4gIH07XG5cbmNvbnN0IGVuYWJsZWQgPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPR19TVE9SQUdFX0tFWSkpO1xuXG5leHBvcnQgY29uc3QgbG9nID0gZ2V0TG9nZ2VyRm4oZW5hYmxlZCk7XG4iLCJleHBvcnQgY29uc3QgQXV0aDBfU1BBX0pTX0NETiA9XG4gIFwiaHR0cHM6Ly9jZG4uYXV0aDAuY29tL2pzL2F1dGgwLXNwYS1qcy8yLjAvYXV0aDAtc3BhLWpzLnByb2R1Y3Rpb24uanNcIjtcblxuZXhwb3J0IGNvbnN0IFpFTkRFU0tfV0lER0VUX0NETiA9XG4gIFwiaHR0cHM6Ly9zdGF0aWMuemRhc3NldHMuY29tL2Vrci9zbmlwcGV0LmpzP2tleT1lYjdmNTU1Mi1iZTMzLTRiMGYtYTU1ZC1jZTlhOGE3YWE5NzVcIjtcblxuZXhwb3J0IGNvbnN0IExPR19TVE9SQUdFX0tFWSA9IFwiX2xvZ1NTT0Zsb3dfXCI7XG5cbmV4cG9ydCBjb25zdCBSRURJUkVDVF9VUkkgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9jYWxsYmFja2A7XG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iLCJpbXBvcnQgdHlwZSB7IEF1dGgwQ2xpZW50T3B0aW9ucyB9IGZyb20gXCJAYXV0aDAvYXV0aDAtc3BhLWpzXCI7XG5cbmV4cG9ydCBlbnVtIExvZ2luTWVzc2FnZVR5cGUge1xuICBMb2dpbiA9IFwiYXV0aDA6bG9naW5cIixcbiAgTG9nb3V0ID0gXCJhdXRoMDpsb2dvdXRcIixcbiAgU2lnbnVwID0gXCJhdXRoMDpzaWdudXBcIixcbn1cblxuZXhwb3J0IHR5cGUgUnVuU1NPRmxvd0FyZ3MgPSB7XG4gIGF1dGgwQ2xpZW50T3B0aW9uczogQXV0aDBDbGllbnRPcHRpb25zO1xuICBzaXRlSWQ/OiBzdHJpbmcgfCBcIlwiO1xufTtcblxuZXhwb3J0IHR5cGUgTG9hZFNjcmlwdEFyZ3MgPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgaWRBdHRyaWJ1dGU/OiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xufTtcblxuLy8gVGhlIGRhdGFsYXllciBvYmplY3QgaXMgc2V0IG9uIHRoZSB3aW5kb3cgb2JqZWN0IGJ5IHRoZSBHb29nbGUgQW5hbHl0aWNzIHNjcmlwdFxuLy8gaXQgY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIEdBLCBzZXQgb3B0aW9ucyBvciBzZW5kIHNwZWNpZmljIGV2ZW50c1xuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBkYXRhTGF5ZXI6IGFueVtdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXJcIjtcblxuY29uc3Qgd2FpdEZvckRhdGFMYXllciA9IChjYWxsYmFjazogRnVuY3Rpb24sIGF0dGVtcHQgPSAwKSA9PiB7XG4gIGxvZyhcIldhaXRpbmcgZm9yIEdBIGRhdGFMYXllclwiLCBKU09OLnN0cmluZ2lmeSh3aW5kb3cuZGF0YUxheWVyKSwgXCIuIEF0dGVtcHQ6IFwiLCBhdHRlbXB0KTtcbiAgY29uc3QgbWF4X2F0dGVtcHRzID0gMTA7XG4gIGlmIChhdHRlbXB0ID4gbWF4X2F0dGVtcHRzKSB7XG4gICAgbG9nKFwiV2FpdGluZyBmb3IgR0EgZGF0YUxheWVyOiBNYXggYXR0ZW1wdHMgcmVhY2hlZC5cIilcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHdpbmRvdy5kYXRhTGF5ZXIpIHtcbiAgICBsb2coXCJHQSBkYXRhTGF5ZXIgZm91bmRcIik7XG4gICAgY2FsbGJhY2soKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhaXRGb3JEYXRhTGF5ZXIoY2FsbGJhY2ssIGF0dGVtcHQgKyAxKTtcbiAgICB9LCA1MDApO1xuICB9XG59O1xuXG4vKipcbiAqIENvbmZpZ3VyZSB0aGUgR0Egb2JqZWN0LCBzZXQgcGFyYW1ldGVycyBvciBzZW5kIGV2ZW50c1xuICogVGhpcyBjb2RlIGlzIG1vZGlmaWVkIGZyb20gdGhlIHB1cmUtanMgY29kZSBnaXZlbiBieSBHb29nbGUgQW5hbHl0aWNzIHRoYXQgbG9va3MgbGlrZSB0aGlzXG4gKiAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuICogICBmdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9XG4gKiAgIGd0YWcoJ2pzJywgbmV3IERhdGUoKSk7XG4gKiAgIGd0YWcoJ2NvbmZpZycsICc8aWQ+Jyk7XG4gKiBAcGFyYW0gYXJncyBhcmJpdHJhcnkgYXJndW1lbnRzIHRvIHRoZSBHb29nbGUgQW5hbHl0aWNzIG9iamVjdCAoc2V0LCBldmVudCwgZXRjLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVzaFRvRGF0YUxheWVyKCkge1xuICBsb2coXCJBdHRlbXB0aW5nIHRvIHB1c2ggdXNlcl9pZCB0byBHQSBkYXRhTGF5ZXIuXCIpXG4gIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gIHdhaXRGb3JEYXRhTGF5ZXIoKCkgPT4ge1xuICAgIGxvZyhcIlNldHRpbmcgdGhlIHVzZXItaWRcIik7XG4gICAgd2luZG93LmRhdGFMYXllci5wdXNoKGFyZ3MpO1xuICAgIGxvZyhcIndpbmRvdy5kYXRhTGF5ZXIgYWZ0ZXIgcHVzaGluZ1wiLCB3aW5kb3cuZGF0YUxheWVyKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2hhMjU2KG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIC8vIGVuY29kZSBhcyBVVEYtOFxuICBjb25zdCBtc2dCdWZmZXIgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUobWVzc2FnZSk7XG5cbiAgLy8gaGFzaCB0aGUgbWVzc2FnZVxuICBjb25zdCBoYXNoQnVmZmVyID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoJ1NIQS0yNTYnLCBtc2dCdWZmZXIpO1xuXG4gIC8vIGNvbnZlcnQgQXJyYXlCdWZmZXIgdG8gQXJyYXlcbiAgY29uc3QgaGFzaEFycmF5ID0gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShoYXNoQnVmZmVyKSk7XG5cbiAgLy8gY29udmVydCBieXRlcyB0byBoZXggc3RyaW5nICAgICAgICAgICAgICAgICAgXG4gIGNvbnN0IGhhc2hIZXggPSBoYXNoQXJyYXkubWFwKGIgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSkuam9pbignJyk7XG4gIHJldHVybiBoYXNoSGV4O1xufVxuIiwiaW1wb3J0IHR5cGUgeyBBdXRoMENsaWVudCB9IGZyb20gXCJAYXV0aDAvYXV0aDAtc3BhLWpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXJcIjtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUh0dHBGdW5jdGlvbnMgPSAoXG4gIGF1dGgwQ2xpZW50OiBBdXRoMENsaWVudCxcbiAgYXV0aDBJZDogc3RyaW5nXG4pID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgbG9nKFwidXBkYXRlSHR0cEZ1bmN0aW9ucyBjYWxsZWRcIik7XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgYXV0aDBDbGllbnQuZ2V0VXNlcigpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICBsb2coXCJ1cGRhdGVIdHRwRnVuY3Rpb25zIC0+IHVzZXIgbm90IGxvZ2dlZC1pbiFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFhdXRoMElkKSB7XG4gICAgICBsb2coXCJ1cGRhdGVIdHRwRnVuY3Rpb25zIC0+IGF1dGgwSWQgaXMgbm90IGRlZmluZWQhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBmZXRjaCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgXCIvX2Z1bmN0aW9ucy9hdXRoMC9cIiArIGF1dGgwSWQsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHVzZXIgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBhdXRoMENsaWVudC5nZXRUb2tlblNpbGVudGx5KCk7XG5cbiAgICAgIGF3YWl0IGZldGNoKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBcIi9fZnVuY3Rpb25zL2F1dGgwL1wiICsgYXV0aDBJZCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdG9rZW4gfSksXG4gICAgICB9KTtcblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcImZldGNoIGVycm9yOiBcIiwgZXJyKTtcbiAgICAgIF9yZWplY3QoKTtcbiAgICB9XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHsgTG9hZFNjcmlwdEFyZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgbG9hZFNjcmlwdCA9IChhcmdzOiBMb2FkU2NyaXB0QXJncykgPT4ge1xuICBjb25zdCB7IHVybCwgaWRBdHRyaWJ1dGUsIG5hbWUgfSA9IGFyZ3M7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmhlYWQ7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gICAgc2NyaXB0LnNyYyA9IHVybDtcbiAgICBzY3JpcHQuaWQgPSBpZEF0dHJpYnV0ZSA/PyBcIlwiO1xuXG4gICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxvZyhgJHtuYW1lfSBzY3JpcHQgbG9hZGVkYCk7XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9O1xuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9KTtcbn07XG4iLCJleHBvcnQgY29uc3QgcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWQgPSAoKSA9PlxuICBkb2N1bWVudD8uY3VycmVudFNjcmlwdD8uYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oXCJkYXRhLXNpdGVpZFwiKT8udmFsdWU7XG4iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoic3NvLWZsb3cuZGV2LmpzLm1hcCJ9
