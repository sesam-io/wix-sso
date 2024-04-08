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
var _uuid = require("uuid");
var _logger = require("packages/logger/logger");
var _brandForm = require("./brandForm");
var _constants = require("./constants");
var _utils = require("./utils");
const enabled = Boolean(localStorage.getItem("_log_"));
const log = (0, _logger.getLoggerFn)(enabled, "ULP Flow");
const run = ()=>{
    if (!window.ulpState) {
        log("no site id found!", window.ulpState);
        return;
    }
    const { siteId, formType } = window.ulpState;
    log("ulpState", window.ulpState);
    const site = (0, _utils.getSite)(siteId);
    const brandTitle = (0, _brandForm.getBrandTitleFn)(document.getElementsByTagName("p") ?? {}, (0, _utils.getDefaultPageTitle)(formType));
    const promptLogoCenter = document.getElementById((0, _constants.LOGO_IMG_ID));
    if (site.html) (0, _brandForm.buildBrandedHorizontalLogo)(promptLogoCenter, `https://raw.githubusercontent.com/sesam-io/wix-sso/main/src/packages/universalLoginPage/html/${site.html}?v=${(0, _uuid.v4)()}`);
    if (site.isBrandLogo) (0, _brandForm.brandLogo)(promptLogoCenter, site.logoUrl);
    if (site.displayPoweredBySesam) (0, _brandForm.addPoweredBySesamImg)(promptLogoCenter);
    brandTitle(formType === "login" ? site.loginSubTitle : site.signupSubTitle, site.titleClassName);
};
run();

},{"uuid":"kQDP0","packages/logger/logger":"iqOAs","./brandForm":"lqEUo","./constants":"iRfSK","./utils":"epG7m","@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"kQDP0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "v1", ()=>(0, _v1JsDefault.default));
parcelHelpers.export(exports, "v3", ()=>(0, _v3JsDefault.default));
parcelHelpers.export(exports, "v4", ()=>(0, _v4JsDefault.default));
parcelHelpers.export(exports, "v5", ()=>(0, _v5JsDefault.default));
parcelHelpers.export(exports, "NIL", ()=>(0, _nilJsDefault.default));
parcelHelpers.export(exports, "version", ()=>(0, _versionJsDefault.default));
parcelHelpers.export(exports, "validate", ()=>(0, _validateJsDefault.default));
parcelHelpers.export(exports, "stringify", ()=>(0, _stringifyJsDefault.default));
parcelHelpers.export(exports, "parse", ()=>(0, _parseJsDefault.default));
var _v1Js = require("./v1.js");
var _v1JsDefault = parcelHelpers.interopDefault(_v1Js);
var _v3Js = require("./v3.js");
var _v3JsDefault = parcelHelpers.interopDefault(_v3Js);
var _v4Js = require("./v4.js");
var _v4JsDefault = parcelHelpers.interopDefault(_v4Js);
var _v5Js = require("./v5.js");
var _v5JsDefault = parcelHelpers.interopDefault(_v5Js);
var _nilJs = require("./nil.js");
var _nilJsDefault = parcelHelpers.interopDefault(_nilJs);
var _versionJs = require("./version.js");
var _versionJsDefault = parcelHelpers.interopDefault(_versionJs);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
var _stringifyJs = require("./stringify.js");
var _stringifyJsDefault = parcelHelpers.interopDefault(_stringifyJs);
var _parseJs = require("./parse.js");
var _parseJsDefault = parcelHelpers.interopDefault(_parseJs);

},{"./v1.js":false,"./v3.js":false,"./v4.js":"fy1j8","./v5.js":false,"./nil.js":false,"./version.js":false,"./validate.js":false,"./stringify.js":false,"./parse.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"fy1j8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _nativeJs = require("./native.js");
var _nativeJsDefault = parcelHelpers.interopDefault(_nativeJs);
var _rngJs = require("./rng.js");
var _rngJsDefault = parcelHelpers.interopDefault(_rngJs);
var _stringifyJs = require("./stringify.js");
function v4(options, buf, offset) {
    if ((0, _nativeJsDefault.default).randomUUID && !buf && !options) return (0, _nativeJsDefault.default).randomUUID();
    options = options || {};
    const rnds = options.random || (options.rng || (0, _rngJsDefault.default))(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i)buf[offset + i] = rnds[i];
        return buf;
    }
    return (0, _stringifyJs.unsafeStringify)(rnds);
}
exports.default = v4;

},{"./native.js":"gLwEm","./rng.js":"16IC0","./stringify.js":"hO29l","@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"gLwEm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
exports.default = {
    randomUUID
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

},{}],"16IC0":[function(require,module,exports) {
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>rng);
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!getRandomValues) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    return getRandomValues(rnds8);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"hO29l":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "unsafeStringify", ()=>unsafeStringify);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ const byteToHex = [];
for(let i = 0; i < 256; ++i)byteToHex.push((i + 0x100).toString(16).slice(1));
function unsafeStringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, _validateJsDefault.default)(uuid)) throw TypeError("Stringified UUID is invalid");
    return uuid;
}
exports.default = stringify;

},{"./validate.js":"hpPPr","@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"hpPPr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _regexJs = require("./regex.js");
var _regexJsDefault = parcelHelpers.interopDefault(_regexJs);
function validate(uuid) {
    return typeof uuid === "string" && (0, _regexJsDefault.default).test(uuid);
}
exports.default = validate;

},{"./regex.js":"hGH6C","@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"hGH6C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"iqOAs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getLoggerFn", ()=>getLoggerFn);
const getLoggerFn = (enabled = false, prefix = "SSO Flow")=>// eslint-disable-next-line @typescript-eslint/no-explicit-any
    (title, ...args)=>{
        if (!enabled) return;
        console.info(`${prefix} - ${title}`, args.length ? args : "", new Date().toLocaleTimeString());
    };

},{"@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"lqEUo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "brandLogo", ()=>brandLogo);
parcelHelpers.export(exports, "getBrandTitleFn", ()=>getBrandTitleFn);
parcelHelpers.export(exports, "insertElementAfter", ()=>insertElementAfter);
parcelHelpers.export(exports, "addPoweredBySesamImg", ()=>addPoweredBySesamImg);
parcelHelpers.export(exports, "buildBrandedHorizontalLogo", ()=>buildBrandedHorizontalLogo);
var _constants = require("./constants");
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
const buildBrandedHorizontalLogo = async (imgElement, htmlLogoUrl)=>{
    const poweredBySesamWrapper = document.createElement("div");
    fetch(htmlLogoUrl).then((response)=>response.text()).then((text)=>{
        poweredBySesamWrapper.innerHTML = text;
        poweredBySesamWrapper.style.display = "flex";
        poweredBySesamWrapper.style.justifyContent = "center";
    });
    insertElementAfter(imgElement, poweredBySesamWrapper);
    imgElement.remove();
};

},{"./constants":"iRfSK","@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"iRfSK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LOGO_IMG_ID", ()=>LOGO_IMG_ID);
parcelHelpers.export(exports, "CONNECTOR_LOGO_BASE_URL", ()=>CONNECTOR_LOGO_BASE_URL);
parcelHelpers.export(exports, "BASE_LOGO_URL", ()=>BASE_LOGO_URL);
parcelHelpers.export(exports, "DEFAULT_LOGO_URL", ()=>DEFAULT_LOGO_URL);
parcelHelpers.export(exports, "SiteIds", ()=>SiteIds);
const LOGO_IMG_ID = "prompt-logo-center";
const STABLE_VERSION = "v1.0.127-site-logos";
const CONNECTOR_LOGO_BASE_URL = "https://raw.githubusercontent.com/sesam-io";
const BASE_LOGO_URL = `https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@${STABLE_VERSION}/src/packages/siteLogos`;
const DEFAULT_LOGO_URL = `${BASE_LOGO_URL}/sesam/sesam-talk-rgb.png`;
const SiteIds = {
    hubspot: "hubspot",
    powerofficego: "powerofficego",
    "powerofficego-test": "powerofficego-test",
    sesam: "sesam",
    superoffice: "superoffice",
    "superoffice-test": "superoffice-test",
    tripletex: "tripletex",
    "tripletex-test": "tripletex-test",
    wave: "wave"
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"epG7m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getSite", ()=>getSite);
parcelHelpers.export(exports, "getDefaultPageTitle", ()=>getDefaultPageTitle);
var _sites = require("./sites");
const getWixSiteFn = (wixSites)=>(siteId)=>{
        const site = wixSites.find((site)=>site.baseId === siteId || site.id === siteId);
        if (!site) return 0, _sites.SesamDefaultSite;
        return site;
    };
const getSite = getWixSiteFn((0, _sites.WixSites));
const getDefaultPageTitle = (formType)=>formType === "login" ? (0, _sites.SesamDefaultSite).loginSubTitle : (0, _sites.SesamDefaultSite).signupSubTitle;

},{"./sites":"8ObUV","@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}],"8ObUV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SesamDefaultSite", ()=>SesamDefaultSite);
parcelHelpers.export(exports, "Wave", ()=>Wave);
parcelHelpers.export(exports, "WixSites", ()=>WixSites);
var _constants = require("./constants");
const SesamDefaultSite = {
    id: "sesam",
    name: "Sesam",
    logoUrl: (0, _constants.DEFAULT_LOGO_URL),
    loginSubTitle: "Log in to Sesam Talk.",
    signupSubTitle: "Sign up to Sesam Talk to continue to Sesam Talk.",
    displayPoweredBySesam: true
};
const tripletexSite = {
    id: "tripletex",
    baseId: "tripletex",
    name: "",
    logoUrl: `${(0, _constants.CONNECTOR_LOGO_BASE_URL)}/tripletex-connector/main/assets/tripletex-logo-horizontal-complete.svg`,
    loginSubTitle: "Log in to Tripletex DataSync.",
    signupSubTitle: "Sign up to Tripletex DataSync.",
    html: "tripletex-logo.html",
    displayPoweredBySesam: false
};
const superofficeSite = {
    id: "superoffice",
    baseId: "superoffice",
    name: "",
    logoUrl: `${(0, _constants.BASE_LOGO_URL)}/superoffice/superoffice-ulp-header-logo.svg`,
    loginSubTitle: "Log in to SuperOffice DataSync.",
    signupSubTitle: "Sign up to SuperOffice DataSync.",
    titleClassName: "superofficeLogInTitle",
    displayPoweredBySesam: true,
    isBrandLogo: true
};
const powerofficego = {
    id: "powerofficego",
    baseId: "powerofficego",
    name: "PowerOffice",
    logoUrl: `${(0, _constants.BASE_LOGO_URL)}/poweroffice/poweroffice-new-logo.png`,
    loginSubTitle: "Log in to PowerOffice DataSync.",
    signupSubTitle: "Sign up to PowerOffice DataSync.",
    html: "powerofficego-logo.html",
    displayPoweredBySesam: false
};
const Wave = {
    id: "wave",
    name: "Wave",
    logoUrl: `${(0, _constants.BASE_LOGO_URL)}/wave/making-wave-talk-logo-centered.svg`,
    loginSubTitle: "Log in to Making Wave Talk.",
    signupSubTitle: "Sign up to Making Wave Talk.",
    displayPoweredBySesam: false,
    isBrandLogo: true
};
const WixSites = [
    {
        id: "hubspot",
        name: "Hubspot",
        logoUrl: `${(0, _constants.BASE_LOGO_URL)}/hubspot/making-hubspot-talk-logo-centered.svg`,
        loginSubTitle: "Log in to Making HubSpot Talk.",
        signupSubTitle: "Sign up to Making HubSpot Talk.",
        displayPoweredBySesam: true
    },
    {
        ...powerofficego
    },
    {
        ...powerofficego,
        id: "powerofficego-test"
    },
    SesamDefaultSite,
    superofficeSite,
    {
        ...superofficeSite,
        id: "superoffice-test"
    },
    tripletexSite,
    {
        ...tripletexSite,
        id: "tripletex-test"
    },
    Wave
];

},{"./constants":"iRfSK","@parcel/transformer-js/src/esmodule-helpers.js":"3Jrbz"}]},["5e26n"], "5e26n", "parcelRequire7e83")

