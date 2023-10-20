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
    // I'm not quite sure how Wix works but it's important to note that this window.onload only runs
    // when we refresh the page - not when going through the pages within the Wix site, In that sense, Wix is SPA-ish
    window.onload = async ()=>{
        (0, _logger.log)("window has loaded");
        window.zE("messenger", "hide");
    };
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
                window.zE("messenger", "loginUser", function(callback) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNGOzs7Ozs2RENyQmE7QUFBTixNQUFNLDBCQUEwQixJQUNyQyxVQUFVLGVBQWUsV0FBVyxhQUFhLGdCQUFnQiIsInNvdXJjZXMiOlsic3JjL2luZGV4LnRzIiwic3JjL3J1blNTT0Zsb3cudHMiLCJzcmMvbG9nZ2VyLnRzIiwic3JjL2NvbnN0YW50cy50cyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIiwic3JjL3R5cGVzLnRzIiwic3JjL2FuYWx5dGljcy50cyIsInNyYy91cGRhdGVIdHRwRnVuY3Rpb25zLnRzIiwic3JjL2xvYWRTY3JpcHQudHMiLCJzcmMvcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcnVuU1NPRmxvdyB9IGZyb20gXCIuL3J1blNTT0Zsb3dcIjtcbmltcG9ydCB7IEF1dGgwX1NQQV9KU19DRE4sIFpFTkRFU0tfV0lER0VUX0NETiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbG9hZFNjcmlwdCB9IGZyb20gXCIuL2xvYWRTY3JpcHRcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHsgcmVhZEN1cnJlbnRTY3JpcHRTaXRlSWQgfSBmcm9tIFwiLi9yZWFkQ3VycmVudFNjcmlwdFNpdGVJZFwiO1xuXG5jb25zdCBzaXRlSWQgPSByZWFkQ3VycmVudFNjcmlwdFNpdGVJZCgpO1xubG9nKFwic2l0ZUlkXCIsIHNpdGVJZCk7XG5cbmNvbnN0IHByb21pc2UgPSBsb2FkU2NyaXB0KHtcbiAgdXJsOiBBdXRoMF9TUEFfSlNfQ0ROLFxuICBuYW1lOiBcIkF1dGgwIFNQQSBqc1wiLFxufSk7XG5cbnByb21pc2UudGhlbigoKSA9PiB7XG4gIGxvYWRTY3JpcHQoe1xuICAgIHVybDogWkVOREVTS19XSURHRVRfQ0ROLFxuICAgIG5hbWU6IFwiWmVuZGVzayB3aWRnZXRcIixcbiAgICBpZEF0dHJpYnV0ZTogXCJ6ZS1zbmlwcGV0XCIsXG4gIH0pLnRoZW4oKCkgPT4ge1xuICAgIHJ1blNTT0Zsb3coe1xuICAgICAgYXV0aDBDbGllbnRPcHRpb25zOiB7XG4gICAgICAgIGRvbWFpbjogXCJhY2NvdW50cy50YWxrLnNlc2FtLmlvXCIsXG4gICAgICAgIGNsaWVudElkOiBcImtKcFBPUzMwdjhkcEQ2OGlSSjdQTWRTMDNId3ZxMDZYXCIsXG4gICAgICB9LFxuICAgICAgc2l0ZUlkLFxuICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5pbXBvcnQgdHlwZSB7IFJ1blNTT0Zsb3dBcmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IExvZ2luTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgcHVzaFRvRGF0YUxheWVyLCBzaGEyNTYgfSBmcm9tIFwiLi9hbmFseXRpY3NcIjtcbmltcG9ydCB7IHVwZGF0ZUh0dHBGdW5jdGlvbnMgfSBmcm9tIFwiLi91cGRhdGVIdHRwRnVuY3Rpb25zXCI7XG5pbXBvcnQgeyBSRURJUkVDVF9VUkkgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IHJ1blNTT0Zsb3cgPSAoYXJnczogUnVuU1NPRmxvd0FyZ3MpID0+IHtcbiAgY29uc3QgeyBhdXRoMENsaWVudE9wdGlvbnMsIHNpdGVJZCB9ID0gYXJncztcblxuICBsb2coXCJydW5TU09GbG93IHN0YXJ0XCIpO1xuXG4gIGlmICghd2luZG93Py5hdXRoMCkge1xuICAgIGxvZyhcImF1dGgwIGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgYXV0aDBJZCA9IFwiXCI7XG4gIGxvZyhcInJ1blNTT0Zsb3cgfiBhdXRoMElkOlwiLCBhdXRoMElkKTtcbiAgbGV0IHpUb2tlbiA9IFwiXCI7XG5cbiAgY29uc3QgYXV0aDBDbGllbnQgPSBuZXcgd2luZG93LmF1dGgwLkF1dGgwQ2xpZW50KGF1dGgwQ2xpZW50T3B0aW9ucyk7XG5cbiAgY29uc3QgYWZ0ZXJBdXRoZW50aWNhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgICBsb2coXCJhZnRlckF1dGhlbnRpY2F0aW9uIGludm9rZWQhXCIpO1xuXG4gICAgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gYXdhaXQgYXV0aDBDbGllbnQuaXNBdXRoZW50aWNhdGVkKCk7XG5cbiAgICBpZiAoaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICBsb2coXCJ1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuXG4gICAgaWYgKHF1ZXJ5LmluY2x1ZGVzKFwiY29kZT1cIikgJiYgcXVlcnkuaW5jbHVkZXMoXCJzdGF0ZT1cIikpIHtcbiAgICAgIGF3YWl0IGF1dGgwQ2xpZW50LmhhbmRsZVJlZGlyZWN0Q2FsbGJhY2soKTtcbiAgICAgIGF3YWl0IHVwZGF0ZUh0dHBGdW5jdGlvbnMoYXV0aDBDbGllbnQsIGF1dGgwSWQpO1xuXG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIFwiL1wiKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSSdtIG5vdCBxdWl0ZSBzdXJlIGhvdyBXaXggd29ya3MgYnV0IGl0J3MgaW1wb3J0YW50IHRvIG5vdGUgdGhhdCB0aGlzIHdpbmRvdy5vbmxvYWQgb25seSBydW5zXG4gIC8vIHdoZW4gd2UgcmVmcmVzaCB0aGUgcGFnZSAtIG5vdCB3aGVuIGdvaW5nIHRocm91Z2ggdGhlIHBhZ2VzIHdpdGhpbiB0aGUgV2l4IHNpdGUsIEluIHRoYXQgc2Vuc2UsIFdpeCBpcyBTUEEtaXNoXG4gIHdpbmRvdy5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgbG9nKFwid2luZG93IGhhcyBsb2FkZWRcIik7XG5cbiAgICB3aW5kb3cuekUoXCJtZXNzZW5nZXJcIiwgXCJoaWRlXCIpO1xuICB9O1xuXG4gIGFmdGVyQXV0aGVudGljYXRpb24oKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LmRhdGEuYXV0aDBJZCkge1xuICAgICAgbG9nKFwibWVzc2FnZSBkYXRhXCIsIGV2ZW50LmRhdGEpO1xuICAgICAgYXV0aDBJZCA9IGV2ZW50LmRhdGEuYXV0aDBJZDtcbiAgICAgIHpUb2tlbiA9IGV2ZW50LmRhdGEuemVuZGVza1Rva2VuO1xuXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgYXV0aDBDbGllbnQuZ2V0VXNlcigpO1xuXG4gICAgICBpZiAodXNlcj8uZW1haWwpIHtcbiAgICAgICAgY29uc3QgaGFzaGVkRW1haWwgPSBhd2FpdCBzaGEyNTYodXNlci5lbWFpbCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcHVzaFRvRGF0YUxheWVyKFwic2V0XCIsIHsgdXNlcl9pZDogaGFzaGVkRW1haWwgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh6VG9rZW4pIHtcbiAgICAgICAgbG9nKFwibWVzc2FnZSAtIHpUb2tlblwiLCB6VG9rZW4pO1xuXG4gICAgICAgIHdpbmRvdy56RShcbiAgICAgICAgICBcIm1lc3NlbmdlclwiLFxuICAgICAgICAgIFwibG9naW5Vc2VyXCIsXG4gICAgICAgICAgZnVuY3Rpb24gKGNhbGxiYWNrOiBaZW5kZXNrQ2FsbGJhY2tGbikge1xuICAgICAgICAgICAgY2FsbGJhY2soelRva2VuKTtcbiAgICAgICAgICAgIHdpbmRvdy56RShcIm1lc3NlbmdlclwiLCBcInNob3dcIik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdXBkYXRlSHR0cEZ1bmN0aW9ucyhhdXRoMENsaWVudCwgYXV0aDBJZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmRhdGEgPT09IExvZ2luTWVzc2FnZVR5cGUuTG9naW4pIHtcbiAgICAgIGxvZyhcIm1lc3NhZ2UgLSBcIiwgTG9naW5NZXNzYWdlVHlwZS5Mb2dpbik7XG5cbiAgICAgIGF3YWl0IGF1dGgwQ2xpZW50LmxvZ2luV2l0aFJlZGlyZWN0KHtcbiAgICAgICAgYXV0aG9yaXphdGlvblBhcmFtczoge1xuICAgICAgICAgIHJlZGlyZWN0X3VyaTogUkVESVJFQ1RfVVJJLFxuICAgICAgICAgIFwiZXh0LXNpdGVfaWRcIjogc2l0ZUlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmRhdGEgPT09IExvZ2luTWVzc2FnZVR5cGUuTG9nb3V0KSB7XG4gICAgICBsb2coXCJtZXNzYWdlIC0gXCIsIExvZ2luTWVzc2FnZVR5cGUuTG9nb3V0KTtcblxuICAgICAgYXV0aDBDbGllbnQubG9nb3V0KHtcbiAgICAgICAgbG9nb3V0UGFyYW1zOiB7XG4gICAgICAgICAgcmV0dXJuVG86IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuZGF0YSA9PT0gTG9naW5NZXNzYWdlVHlwZS5TaWdudXApIHtcbiAgICAgIGxvZyhcIm1lc3NhZ2UgLSBcIiwgTG9naW5NZXNzYWdlVHlwZS5TaWdudXApO1xuXG4gICAgICBhdXRoMENsaWVudC5sb2dpbldpdGhSZWRpcmVjdCh7XG4gICAgICAgIGF1dGhvcml6YXRpb25QYXJhbXM6IHtcbiAgICAgICAgICByZWRpcmVjdF91cmk6IFJFRElSRUNUX1VSSSxcbiAgICAgICAgICBzY3JlZW5faGludDogXCJzaWdudXBcIixcbiAgICAgICAgICBcImV4dC1zaXRlX2lkXCI6IHNpdGVJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgTE9HX1NUT1JBR0VfS0VZIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmNvbnN0IGdldExvZ2dlckZuID1cbiAgKGVuYWJsZWQgPSBmYWxzZSkgPT5cbiAgKHRpdGxlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgaWYgKCFlbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5pbmZvKFxuICAgICAgYFNTTyBGTG93IC0gJHt0aXRsZX1gLFxuICAgICAgYXJncy5sZW5ndGggPyBhcmdzIDogXCJcIixcbiAgICAgIG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKClcbiAgICApO1xuICB9O1xuXG5jb25zdCBlbmFibGVkID0gQm9vbGVhbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0dfU1RPUkFHRV9LRVkpKTtcblxuZXhwb3J0IGNvbnN0IGxvZyA9IGdldExvZ2dlckZuKGVuYWJsZWQpO1xuIiwiZXhwb3J0IGNvbnN0IEF1dGgwX1NQQV9KU19DRE4gPVxuICBcImh0dHBzOi8vY2RuLmF1dGgwLmNvbS9qcy9hdXRoMC1zcGEtanMvMi4wL2F1dGgwLXNwYS1qcy5wcm9kdWN0aW9uLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBaRU5ERVNLX1dJREdFVF9DRE4gPVxuICBcImh0dHBzOi8vc3RhdGljLnpkYXNzZXRzLmNvbS9la3Ivc25pcHBldC5qcz9rZXk9ZWI3ZjU1NTItYmUzMy00YjBmLWE1NWQtY2U5YThhN2FhOTc1XCI7XG5cbmV4cG9ydCBjb25zdCBMT0dfU1RPUkFHRV9LRVkgPSBcIl9sb2dTU09GbG93X1wiO1xuXG5leHBvcnQgY29uc3QgUkVESVJFQ1RfVVJJID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vY2FsbGJhY2tgO1xuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHR5cGUgeyBBdXRoMENsaWVudE9wdGlvbnMgfSBmcm9tIFwiQGF1dGgwL2F1dGgwLXNwYS1qc1wiO1xuXG5leHBvcnQgZW51bSBMb2dpbk1lc3NhZ2VUeXBlIHtcbiAgTG9naW4gPSBcImF1dGgwOmxvZ2luXCIsXG4gIExvZ291dCA9IFwiYXV0aDA6bG9nb3V0XCIsXG4gIFNpZ251cCA9IFwiYXV0aDA6c2lnbnVwXCIsXG59XG5cbmV4cG9ydCB0eXBlIFJ1blNTT0Zsb3dBcmdzID0ge1xuICBhdXRoMENsaWVudE9wdGlvbnM6IEF1dGgwQ2xpZW50T3B0aW9ucztcbiAgc2l0ZUlkPzogc3RyaW5nIHwgXCJcIjtcbn07XG5cbmV4cG9ydCB0eXBlIExvYWRTY3JpcHRBcmdzID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGlkQXR0cmlidXRlPzogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbn07XG5cbi8vIFRoZSBkYXRhbGF5ZXIgb2JqZWN0IGlzIHNldCBvbiB0aGUgd2luZG93IG9iamVjdCBieSB0aGUgR29vZ2xlIEFuYWx5dGljcyBzY3JpcHRcbi8vIGl0IGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSBHQSwgc2V0IG9wdGlvbnMgb3Igc2VuZCBzcGVjaWZpYyBldmVudHNcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgZGF0YUxheWVyOiBhbnlbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IHdhaXRGb3JEYXRhTGF5ZXIgPSAoY2FsbGJhY2s6IEZ1bmN0aW9uLCBhdHRlbXB0ID0gMCkgPT4ge1xuICBsb2coXCJXYWl0aW5nIGZvciBHQSBkYXRhTGF5ZXJcIiwgSlNPTi5zdHJpbmdpZnkod2luZG93LmRhdGFMYXllciksIFwiLiBBdHRlbXB0OiBcIiwgYXR0ZW1wdCk7XG4gIGNvbnN0IG1heF9hdHRlbXB0cyA9IDEwO1xuICBpZiAoYXR0ZW1wdCA+IG1heF9hdHRlbXB0cykge1xuICAgIGxvZyhcIldhaXRpbmcgZm9yIEdBIGRhdGFMYXllcjogTWF4IGF0dGVtcHRzIHJlYWNoZWQuXCIpXG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh3aW5kb3cuZGF0YUxheWVyKSB7XG4gICAgbG9nKFwiR0EgZGF0YUxheWVyIGZvdW5kXCIpO1xuICAgIGNhbGxiYWNrKCk7XG4gIH0gZWxzZSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB3YWl0Rm9yRGF0YUxheWVyKGNhbGxiYWNrLCBhdHRlbXB0ICsgMSk7XG4gICAgfSwgNTAwKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDb25maWd1cmUgdGhlIEdBIG9iamVjdCwgc2V0IHBhcmFtZXRlcnMgb3Igc2VuZCBldmVudHNcbiAqIFRoaXMgY29kZSBpcyBtb2RpZmllZCBmcm9tIHRoZSBwdXJlLWpzIGNvZGUgZ2l2ZW4gYnkgR29vZ2xlIEFuYWx5dGljcyB0aGF0IGxvb2tzIGxpa2UgdGhpc1xuICogICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcbiAqICAgZnVuY3Rpb24gZ3RhZygpe2RhdGFMYXllci5wdXNoKGFyZ3VtZW50cyk7fVxuICogICBndGFnKCdqcycsIG5ldyBEYXRlKCkpO1xuICogICBndGFnKCdjb25maWcnLCAnPGlkPicpO1xuICogQHBhcmFtIGFyZ3MgYXJiaXRyYXJ5IGFyZ3VtZW50cyB0byB0aGUgR29vZ2xlIEFuYWx5dGljcyBvYmplY3QgKHNldCwgZXZlbnQsIGV0Yy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1c2hUb0RhdGFMYXllcigpIHtcbiAgbG9nKFwiQXR0ZW1wdGluZyB0byBwdXNoIHVzZXJfaWQgdG8gR0EgZGF0YUxheWVyLlwiKVxuICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICB3YWl0Rm9yRGF0YUxheWVyKCgpID0+IHtcbiAgICBsb2coXCJTZXR0aW5nIHRoZSB1c2VyLWlkXCIpO1xuICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaChhcmdzKTtcbiAgICBsb2coXCJ3aW5kb3cuZGF0YUxheWVyIGFmdGVyIHB1c2hpbmdcIiwgd2luZG93LmRhdGFMYXllcik7XG4gIH0pO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNoYTI1NihtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAvLyBlbmNvZGUgYXMgVVRGLThcbiAgY29uc3QgbXNnQnVmZmVyID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKG1lc3NhZ2UpO1xuXG4gIC8vIGhhc2ggdGhlIG1lc3NhZ2VcbiAgY29uc3QgaGFzaEJ1ZmZlciA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KCdTSEEtMjU2JywgbXNnQnVmZmVyKTtcblxuICAvLyBjb252ZXJ0IEFycmF5QnVmZmVyIHRvIEFycmF5XG4gIGNvbnN0IGhhc2hBcnJheSA9IEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoaGFzaEJ1ZmZlcikpO1xuXG4gIC8vIGNvbnZlcnQgYnl0ZXMgdG8gaGV4IHN0cmluZyAgICAgICAgICAgICAgICAgIFxuICBjb25zdCBoYXNoSGV4ID0gaGFzaEFycmF5Lm1hcChiID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpLmpvaW4oJycpO1xuICByZXR1cm4gaGFzaEhleDtcbn1cbiIsImltcG9ydCB0eXBlIHsgQXV0aDBDbGllbnQgfSBmcm9tIFwiQGF1dGgwL2F1dGgwLXNwYS1qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVIdHRwRnVuY3Rpb25zID0gKFxuICBhdXRoMENsaWVudDogQXV0aDBDbGllbnQsXG4gIGF1dGgwSWQ6IHN0cmluZ1xuKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgIGxvZyhcInVwZGF0ZUh0dHBGdW5jdGlvbnMgY2FsbGVkXCIpO1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGF1dGgwQ2xpZW50LmdldFVzZXIoKTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgbG9nKFwidXBkYXRlSHR0cEZ1bmN0aW9ucyAtPiB1c2VyIG5vdCBsb2dnZWQtaW4hXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghYXV0aDBJZCkge1xuICAgICAgbG9nKFwidXBkYXRlSHR0cEZ1bmN0aW9ucyAtPiBhdXRoMElkIGlzIG5vdCBkZWZpbmVkIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZmV0Y2god2luZG93LmxvY2F0aW9uLm9yaWdpbiArIFwiL19mdW5jdGlvbnMvYXV0aDAvXCIgKyBhdXRoMElkLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1c2VyIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgYXV0aDBDbGllbnQuZ2V0VG9rZW5TaWxlbnRseSgpO1xuXG4gICAgICBhd2FpdCBmZXRjaCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgXCIvX2Z1bmN0aW9ucy9hdXRoMC9cIiArIGF1dGgwSWQsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHRva2VuIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJmZXRjaCBlcnJvcjogXCIsIGVycik7XG4gICAgICBfcmVqZWN0KCk7XG4gICAgfVxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dnZXJcIjtcbmltcG9ydCB7IExvYWRTY3JpcHRBcmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IGxvYWRTY3JpcHQgPSAoYXJnczogTG9hZFNjcmlwdEFyZ3MpID0+IHtcbiAgY29uc3QgeyB1cmwsIGlkQXR0cmlidXRlLCBuYW1lIH0gPSBhcmdzO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5oZWFkO1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgc2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgIHNjcmlwdC5zcmMgPSB1cmw7XG4gICAgc2NyaXB0LmlkID0gaWRBdHRyaWJ1dGUgPz8gXCJcIjtcblxuICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsb2coYCR7bmFtZX0gc2NyaXB0IGxvYWRlZGApO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IHJlYWRDdXJyZW50U2NyaXB0U2l0ZUlkID0gKCkgPT5cbiAgZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQ/LmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKFwiZGF0YS1zaXRlaWRcIik/LnZhbHVlO1xuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6InNzby1mbG93LmRldi5qcy5tYXAifQ==
