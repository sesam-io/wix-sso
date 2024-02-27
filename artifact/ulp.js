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
})({"5e26n":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "log", ()=>log);
var _logger = require("packages/logger/logger");
var _brandForm = require("./brandForm");
var _constants = require("./constants");
const enabled = Boolean(localStorage.getItem("_log_"));
const log = (0, _logger.getLoggerFn)(enabled, "ULP Flow");
if (window.ulpState) {
    const { siteId, formType } = window.ulpState;
    log("ulpState", window.ulpState);
    const site = (0, _brandForm.getWixSite)(siteId);
    const brandTitle = (0, _brandForm.getBrandTitleFn)(document.getElementsByTagName("p") ?? {}, (0, _brandForm.getDefaultPageTitle)(formType));
    const imgElement = document.getElementById((0, _constants.LOGO_IMG_ID));
    if ([
        (0, _constants.SiteIds).superoffice.toLowerCase(),
        (0, _constants.SiteIds).powerofficego.toLowerCase(),
        (0, _constants.SiteIds).tripletex.toLowerCase()
    ].includes(siteId)) (0, _brandForm.addPoweredBySesamImg)(imgElement);
    (0, _brandForm.brandLogo)(imgElement, site.logoUrl);
    brandTitle(formType === "login" ? site.loginSubTitle : site.signupSubTitle, site.titleClassName);
}

},{"packages/logger/logger":"iqOAs","./brandForm":"lqEUo","./constants":"iRfSK","@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"iqOAs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getLoggerFn", ()=>getLoggerFn);
const getLoggerFn = (enabled = false, prefix = "SSO Flow")=>// eslint-disable-next-line @typescript-eslint/no-explicit-any
    (title, ...args)=>{
        if (!enabled) return;
        console.info(`${prefix} - ${title}`, args.length ? args : "", new Date().toLocaleTimeString());
    };

},{"@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"3Jrbz":[function(require,module,exports) {
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

},{}],"lqEUo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getWixSite", ()=>getWixSite);
parcelHelpers.export(exports, "getDefaultPageTitle", ()=>getDefaultPageTitle);
parcelHelpers.export(exports, "brandLogo", ()=>brandLogo);
parcelHelpers.export(exports, "getBrandTitleFn", ()=>getBrandTitleFn);
parcelHelpers.export(exports, "insertElementAfter", ()=>insertElementAfter);
parcelHelpers.export(exports, "addPoweredBySesamImg", ()=>addPoweredBySesamImg);
var _constants = require("./constants");
const getWixSite = (siteId)=>{
    const site = (0, _constants.WixSites)[siteId];
    if (!site) return (0, _constants.WixSites).sesam;
    return site;
};
const getDefaultPageTitle = (formType)=>formType === "login" ? (0, _constants.WixSites).sesam.loginSubTitle : (0, _constants.WixSites).sesam.signupSubTitle;
const brandLogo = (imgElement, logoUrl)=>{
    if (logoUrl) imgElement.src = logoUrl;
};
const getBrandTitleFn = (pTags, defaultPageTitle)=>(subTitle, titleClassName)=>{
        Array.from(pTags)?.forEach((pTag)=>{
            if (pTag.textContent?.toLowerCase() === defaultPageTitle.toLowerCase()) {
                pTag.innerText = subTitle;
                if (titleClassName) pTag.className = titleClassName;
            }
        });
    };
const insertElementAfter = (referenceNode, newNode)=>{
    referenceNode?.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
};
const addPoweredBySesamImg = (imgElement)=>{
    const poweredBySesamWrapper = document.createElement("div");
    const poweredBySesamImg = document.createElement("img");
    poweredBySesamImg.src = `${0, _constants.BASE_LOGO_URL}/sesam/powered-by-sesam.svg`;
    poweredBySesamImg.className = "poweredBySesamImg";
    poweredBySesamWrapper.appendChild(poweredBySesamImg);
    poweredBySesamWrapper.className = "poweredBySesamWrapper";
    insertElementAfter(imgElement, poweredBySesamWrapper);
};

},{"./constants":"iRfSK","@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"iRfSK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LOGO_IMG_ID", ()=>LOGO_IMG_ID);
parcelHelpers.export(exports, "SiteIds", ()=>SiteIds);
parcelHelpers.export(exports, "BASE_LOGO_URL", ()=>BASE_LOGO_URL);
parcelHelpers.export(exports, "WixSites", ()=>WixSites);
const SITE_LOGOS_VERSION_KEY = "_v_";
const LOGO_IMG_ID = "prompt-logo-center";
const SiteIds = {
    hubspot: "HubSpot",
    powerofficego: "PowerOfficeGo",
    sesam: "Sesam",
    superoffice: "SuperOffice",
    tripletex: "Tripletex",
    "tripletex-test": "Tripletex test",
    wave: "Wave"
};
const STABLE_VERSION = "v1.0.122-site-logos";
const SITE_LOGOS_RELEASE_VERSION = localStorage.getItem(SITE_LOGOS_VERSION_KEY) ?? STABLE_VERSION;
const BASE_LOGO_URL = `https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@${SITE_LOGOS_RELEASE_VERSION}/src/packages/siteLogos`;
const DEFAULT_LOGO_URL = `${BASE_LOGO_URL}/sesam/sesam-talk-rgb.png`;
const tripletexSite = {
    id: "tripletex",
    logoUrl: `${BASE_LOGO_URL}/tripletex/tripletex-ulp-header-logo.svg`,
    loginSubTitle: "Log in to Tripletex DataSync.",
    signupSubTitle: "Sign up to Tripletex DataSync."
};
const WixSites = {
    hubspot: {
        id: "hubspot",
        logoUrl: `${BASE_LOGO_URL}/hubspot/making-hubspot-talk-logo-centered.svg`,
        loginSubTitle: "Log in to Making HubSpot Talk.",
        signupSubTitle: "Sign up to Making HubSpot Talk."
    },
    powerofficego: {
        id: "powerofficego",
        logoUrl: `${BASE_LOGO_URL}/poweroffice/poweroffice-ulp-header-logo.svg`,
        loginSubTitle: "Log in to PowerOffice DataSync.",
        signupSubTitle: "Sign up to PowerOffice DataSync."
    },
    sesam: {
        id: "sesam",
        logoUrl: DEFAULT_LOGO_URL,
        loginSubTitle: "Log in to Sesam Talk.",
        signupSubTitle: "Sign up to Sesam Talk to continue to Sesam Talk."
    },
    superoffice: {
        id: "superoffice",
        logoUrl: `${BASE_LOGO_URL}/superoffice/superoffice-ulp-header-logo.svg`,
        loginSubTitle: "Log in to SuperOffice DataSync.",
        signupSubTitle: "Sign up to SuperOffice DataSync.",
        titleClassName: "superofficeLogInTitle"
    },
    tripletex: tripletexSite,
    "tripletex-test": {
        ...tripletexSite,
        id: "tripletex-test"
    },
    wave: {
        id: "wave",
        logoUrl: `${BASE_LOGO_URL}/wave/making-wave-talk-logo-centered.svg`,
        loginSubTitle: "Log in to Making Wave Talk.",
        signupSubTitle: "Sign up to Making Wave Talk."
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}]},["5e26n"], "5e26n", "parcelRequire7e83")

