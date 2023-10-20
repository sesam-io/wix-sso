(function () {
function $17adc4f54f09c868$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $17adc4f54f09c868$export$7c398597f8905a1(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $17adc4f54f09c868$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $17adc4f54f09c868$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}


/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol */ function $d68fdc7ef6745dc8$export$5f0017c582d45a2d(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}


var $9970fb8fbd95774a$var$extendStatics = function extendStatics1(d, b) {
    $9970fb8fbd95774a$var$extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return $9970fb8fbd95774a$var$extendStatics(d, b);
};
function $9970fb8fbd95774a$export$a8ba968b8961cb8a(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    $9970fb8fbd95774a$var$extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var $9970fb8fbd95774a$export$18ce0697a983be9b = function __assign1() {
    $9970fb8fbd95774a$export$18ce0697a983be9b = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $9970fb8fbd95774a$export$18ce0697a983be9b.apply(this, arguments);
};
function $9970fb8fbd95774a$export$3c9a16f847548506(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function $9970fb8fbd95774a$export$29e00dfd3077644b(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function $9970fb8fbd95774a$export$d5ad3fd78186038f(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function $9970fb8fbd95774a$export$3a84e1ae4e97e9b0(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
function $9970fb8fbd95774a$export$d831c04e792af3d(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++)value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    return useValue ? value : void 0;
}
function $9970fb8fbd95774a$export$6a2a36740a146cb8(x) {
    return (typeof x === "undefined" ? "undefined" : (0, $d68fdc7ef6745dc8$export$5f0017c582d45a2d)(x)) === "symbol" ? x : "".concat(x);
}
function $9970fb8fbd95774a$export$d1a06452d3489bc7(f, name, prefix) {
    if ((typeof name === "undefined" ? "undefined" : (0, $d68fdc7ef6745dc8$export$5f0017c582d45a2d)(name)) === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
function $9970fb8fbd95774a$export$f1db080c865becb9(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function $9970fb8fbd95774a$export$1050f835b63b671e(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function $9970fb8fbd95774a$export$67ebef60e6f28a6(thisArg, body) {
    var _ = {
        label: 0,
        sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var $9970fb8fbd95774a$export$45d3717a4c69092e = Object.create ? function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function get() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function $9970fb8fbd95774a$export$f33643c0debef087(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) $9970fb8fbd95774a$export$45d3717a4c69092e(o, m, p);
}
function $9970fb8fbd95774a$export$19a8beecd37a4c45(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function $9970fb8fbd95774a$export$8d051b38c9118094(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function $9970fb8fbd95774a$export$afc72e2116322959() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat($9970fb8fbd95774a$export$8d051b38c9118094(arguments[i]));
    return ar;
}
function $9970fb8fbd95774a$export$6388937ca91ccae8() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function $9970fb8fbd95774a$export$1216008129fb82ed(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function $9970fb8fbd95774a$export$10c90e4f7922046c(v) {
    return this instanceof $9970fb8fbd95774a$export$10c90e4f7922046c ? (this.v = v, this) : new $9970fb8fbd95774a$export$10c90e4f7922046c(v);
}
function $9970fb8fbd95774a$export$e427f37a30a4de9b(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof $9970fb8fbd95774a$export$10c90e4f7922046c ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function $9970fb8fbd95774a$export$bbd80228419bb833(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: $9970fb8fbd95774a$export$10c90e4f7922046c(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function $9970fb8fbd95774a$export$e3b29a3d6162315f(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof $9970fb8fbd95774a$export$19a8beecd37a4c45 === "function" ? $9970fb8fbd95774a$export$19a8beecd37a4c45(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function $9970fb8fbd95774a$export$4fb47efe1390b86f(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
var $9970fb8fbd95774a$var$__setModuleDefault = Object.create ? function __setModuleDefault(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
function $9970fb8fbd95774a$export$c21735bcef00d192(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) $9970fb8fbd95774a$export$45d3717a4c69092e(result, mod, k);
    }
    $9970fb8fbd95774a$var$__setModuleDefault(result, mod);
    return result;
}
function $9970fb8fbd95774a$export$da59b14a69baef04(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function $9970fb8fbd95774a$export$d5dcaf168c640c35(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function $9970fb8fbd95774a$export$d40a35129aaff81f(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function $9970fb8fbd95774a$export$81fdc39f203e4e04(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function $9970fb8fbd95774a$export$88ac25d8e944e405(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) env.stack.push({
        async: true
    });
    return value;
}
var $9970fb8fbd95774a$var$_SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function _SuppressedError(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function $9970fb8fbd95774a$export$8f076105dc360e92(env) {
    function fail(e) {
        env.error = env.hasError ? new $9970fb8fbd95774a$var$_SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    function next() {
        while(env.stack.length){
            var rec = env.stack.pop();
            try {
                var result = rec.dispose && rec.dispose.call(rec.value);
                if (rec.async) return Promise.resolve(result).then(next, function(e) {
                    fail(e);
                    return next();
                });
            } catch (e) {
                fail(e);
            }
        }
        if (env.hasError) throw env.error;
    }
    return next();
}
var $9970fb8fbd95774a$export$2e2bcd8739ae039 = {
    __extends: $9970fb8fbd95774a$export$a8ba968b8961cb8a,
    __assign: $9970fb8fbd95774a$export$18ce0697a983be9b,
    __rest: $9970fb8fbd95774a$export$3c9a16f847548506,
    __decorate: $9970fb8fbd95774a$export$29e00dfd3077644b,
    __param: $9970fb8fbd95774a$export$d5ad3fd78186038f,
    __metadata: $9970fb8fbd95774a$export$f1db080c865becb9,
    __awaiter: $9970fb8fbd95774a$export$1050f835b63b671e,
    __generator: $9970fb8fbd95774a$export$67ebef60e6f28a6,
    __createBinding: $9970fb8fbd95774a$export$45d3717a4c69092e,
    __exportStar: $9970fb8fbd95774a$export$f33643c0debef087,
    __values: $9970fb8fbd95774a$export$19a8beecd37a4c45,
    __read: $9970fb8fbd95774a$export$8d051b38c9118094,
    __spread: $9970fb8fbd95774a$export$afc72e2116322959,
    __spreadArrays: $9970fb8fbd95774a$export$6388937ca91ccae8,
    __spreadArray: $9970fb8fbd95774a$export$1216008129fb82ed,
    __await: $9970fb8fbd95774a$export$10c90e4f7922046c,
    __asyncGenerator: $9970fb8fbd95774a$export$e427f37a30a4de9b,
    __asyncDelegator: $9970fb8fbd95774a$export$bbd80228419bb833,
    __asyncValues: $9970fb8fbd95774a$export$e3b29a3d6162315f,
    __makeTemplateObject: $9970fb8fbd95774a$export$4fb47efe1390b86f,
    __importStar: $9970fb8fbd95774a$export$c21735bcef00d192,
    __importDefault: $9970fb8fbd95774a$export$da59b14a69baef04,
    __classPrivateFieldGet: $9970fb8fbd95774a$export$d5dcaf168c640c35,
    __classPrivateFieldSet: $9970fb8fbd95774a$export$d40a35129aaff81f,
    __classPrivateFieldIn: $9970fb8fbd95774a$export$81fdc39f203e4e04,
    __addDisposableResource: $9970fb8fbd95774a$export$88ac25d8e944e405,
    __disposeResources: $9970fb8fbd95774a$export$8f076105dc360e92
};


var $7a8a2ec4ed2c2ee9$export$fdceead422f56282 = "https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js";
var $7a8a2ec4ed2c2ee9$export$b6076d1cb98730e7 = "https://static.zdassets.com/ekr/snippet.js?key=eb7f5552-be33-4b0f-a55d-ce9a8a7aa975";
var $7a8a2ec4ed2c2ee9$export$31098c40fac339ea = "_logSSOFlow_";
var $7a8a2ec4ed2c2ee9$export$89711068e98820c5 = "".concat(window.location.origin, "/callback");


var $e98c957e3ea55568$var$getLoggerFn = function() {
    var enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    return function(title) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        if (!enabled) return;
        console.info("SSO FLow - ".concat(title), args.length ? args : "", new Date().toLocaleTimeString());
    };
};
var $e98c957e3ea55568$var$enabled = Boolean(localStorage.getItem((0, $7a8a2ec4ed2c2ee9$export$31098c40fac339ea)));
var $e98c957e3ea55568$export$bef1f36f5486a6a3 = $e98c957e3ea55568$var$getLoggerFn($e98c957e3ea55568$var$enabled);


var $1e1a44bfd73a2638$export$c9ef5458120c5543;
(function(LoginMessageType) {
    LoginMessageType["Login"] = "auth0:login";
    LoginMessageType["Logout"] = "auth0:logout";
    LoginMessageType["Signup"] = "auth0:signup";
})($1e1a44bfd73a2638$export$c9ef5458120c5543 || ($1e1a44bfd73a2638$export$c9ef5458120c5543 = {}));





var $478991ba99416879$var$waitForDataLayer = function(callback) {
    var attempt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("Waiting for GA dataLayer", JSON.stringify(window.dataLayer), ". Attempt: ", attempt);
    var max_attempts = 10;
    if (attempt > max_attempts) {
        (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("Waiting for GA dataLayer: Max attempts reached.");
        return;
    }
    if (window.dataLayer) {
        (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("GA dataLayer found");
        callback();
    } else setTimeout(function() {
        $478991ba99416879$var$waitForDataLayer(callback, attempt + 1);
    }, 500);
};
function $478991ba99416879$export$3c27964bdf7ca185() {
    (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("Attempting to push user_id to GA dataLayer.");
    var args = arguments;
    $478991ba99416879$var$waitForDataLayer(function() {
        (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("Setting the user-id");
        window.dataLayer.push(args);
        (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("window.dataLayer after pushing", window.dataLayer);
    });
}
function $478991ba99416879$export$bced8d2aada2d1c9(message) {
    return $478991ba99416879$var$_sha256.apply(this, arguments);
}
function $478991ba99416879$var$_sha256() {
    $478991ba99416879$var$_sha256 = (0, $17adc4f54f09c868$export$7c398597f8905a1)(function(message) {
        var msgBuffer, hashBuffer, hashArray, hashHex;
        return (0, $9970fb8fbd95774a$export$67ebef60e6f28a6)(this, function(_state) {
            switch(_state.label){
                case 0:
                    // encode as UTF-8
                    msgBuffer = new TextEncoder().encode(message);
                    return [
                        4,
                        crypto.subtle.digest("SHA-256", msgBuffer)
                    ];
                case 1:
                    hashBuffer = _state.sent();
                    // convert ArrayBuffer to Array
                    hashArray = Array.from(new Uint8Array(hashBuffer));
                    // convert bytes to hex string                  
                    hashHex = hashArray.map(function(b) {
                        return b.toString(16).padStart(2, "0");
                    }).join("");
                    return [
                        2,
                        hashHex
                    ];
            }
        });
    });
    return $478991ba99416879$var$_sha256.apply(this, arguments);
}





var $6a6e69c347ab0706$export$36cb72b0e241b243 = function(auth0Client, auth0Id) {
    return new Promise(function() {
        var _ref = (0, $17adc4f54f09c868$export$7c398597f8905a1)(function(resolve, _reject) {
            var user, token, err;
            return (0, $9970fb8fbd95774a$export$67ebef60e6f28a6)(this, function(_state) {
                switch(_state.label){
                    case 0:
                        (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("updateHttpFunctions called");
                        return [
                            4,
                            auth0Client.getUser()
                        ];
                    case 1:
                        user = _state.sent();
                        if (!user) {
                            (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("updateHttpFunctions -> user not logged-in!");
                            return [
                                2
                            ];
                        }
                        if (!auth0Id) {
                            (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("updateHttpFunctions -> auth0Id is not defined!");
                            return [
                                2
                            ];
                        }
                        _state.label = 2;
                    case 2:
                        _state.trys.push([
                            2,
                            6,
                            ,
                            7
                        ]);
                        return [
                            4,
                            fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    user: user
                                })
                            })
                        ];
                    case 3:
                        _state.sent();
                        return [
                            4,
                            auth0Client.getTokenSilently()
                        ];
                    case 4:
                        token = _state.sent();
                        return [
                            4,
                            fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    token: token
                                })
                            })
                        ];
                    case 5:
                        _state.sent();
                        resolve();
                        return [
                            3,
                            7
                        ];
                    case 6:
                        err = _state.sent();
                        console.error("fetch error: ", err);
                        _reject();
                        return [
                            3,
                            7
                        ];
                    case 7:
                        return [
                            2
                        ];
                }
            });
        });
        return function(resolve, _reject) {
            return _ref.apply(this, arguments);
        };
    }());
};



var $0c925caf723f5925$export$91a760dcae1633b7 = function(args) {
    var auth0ClientOptions = args.auth0ClientOptions, siteId = args.siteId;
    (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("runSSOFlow start");
    if (!(window === null || window === void 0 ? void 0 : window.auth0)) {
        (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("auth0 does not exist!");
        return;
    }
    var auth0Id = "";
    (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("runSSOFlow ~ auth0Id:", auth0Id);
    var zToken = "";
    var auth0Client = new window.auth0.Auth0Client(auth0ClientOptions);
    var afterAuthentication = function() {
        var _ref = (0, $17adc4f54f09c868$export$7c398597f8905a1)(function() {
            var isAuthenticated, query;
            return (0, $9970fb8fbd95774a$export$67ebef60e6f28a6)(this, function(_state) {
                switch(_state.label){
                    case 0:
                        (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("afterAuthentication invoked!");
                        return [
                            4,
                            auth0Client.isAuthenticated()
                        ];
                    case 1:
                        isAuthenticated = _state.sent();
                        if (isAuthenticated) {
                            (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("user is authenticated");
                            return [
                                2
                            ];
                        }
                        query = window.location.search;
                        if (!(query.includes("code=") && query.includes("state="))) return [
                            3,
                            4
                        ];
                        return [
                            4,
                            auth0Client.handleRedirectCallback()
                        ];
                    case 2:
                        _state.sent();
                        return [
                            4,
                            (0, $6a6e69c347ab0706$export$36cb72b0e241b243)(auth0Client, auth0Id)
                        ];
                    case 3:
                        _state.sent();
                        window.history.replaceState({}, "", "/");
                        _state.label = 4;
                    case 4:
                        return [
                            2
                        ];
                }
            });
        });
        return function afterAuthentication() {
            return _ref.apply(this, arguments);
        };
    }();
    // I'm not quite sure how Wix works but it's important to note that this window.onload only runs
    // when we refresh the page - not when going through the pages within the Wix site, In that sense, Wix is SPA-ish
    window.onload = /*#__PURE__*/ (0, $17adc4f54f09c868$export$7c398597f8905a1)(function() {
        return (0, $9970fb8fbd95774a$export$67ebef60e6f28a6)(this, function(_state) {
            (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("window has loaded");
            window.zE("messenger", "hide");
            return [
                2
            ];
        });
    });
    afterAuthentication();
    window.addEventListener("message", function() {
        var _ref = (0, $17adc4f54f09c868$export$7c398597f8905a1)(function(event) {
            var user, hashedEmail;
            return (0, $9970fb8fbd95774a$export$67ebef60e6f28a6)(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!event.data.auth0Id) return [
                            3,
                            6
                        ];
                        (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("message data", event.data);
                        auth0Id = event.data.auth0Id;
                        zToken = event.data.zendeskToken;
                        return [
                            4,
                            auth0Client.getUser()
                        ];
                    case 1:
                        user = _state.sent();
                        if (!(user === null || user === void 0 ? void 0 : user.email)) return [
                            3,
                            3
                        ];
                        return [
                            4,
                            (0, $478991ba99416879$export$bced8d2aada2d1c9)(user.email)
                        ];
                    case 2:
                        hashedEmail = _state.sent();
                        // @ts-ignore
                        (0, $478991ba99416879$export$3c27964bdf7ca185)("set", {
                            user_id: hashedEmail
                        });
                        _state.label = 3;
                    case 3:
                        if (!zToken) return [
                            3,
                            4
                        ];
                        (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("message - zToken", zToken);
                        window.zE("messenger", "loginUser", function(callback) {
                            callback(zToken);
                            window.zE("messenger", "show");
                        });
                        return [
                            3,
                            6
                        ];
                    case 4:
                        return [
                            4,
                            (0, $6a6e69c347ab0706$export$36cb72b0e241b243)(auth0Client, auth0Id)
                        ];
                    case 5:
                        _state.sent();
                        _state.label = 6;
                    case 6:
                        if (!(event.data === (0, $1e1a44bfd73a2638$export$c9ef5458120c5543).Login)) return [
                            3,
                            8
                        ];
                        (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("message - ", (0, $1e1a44bfd73a2638$export$c9ef5458120c5543).Login);
                        return [
                            4,
                            auth0Client.loginWithRedirect({
                                authorizationParams: {
                                    redirect_uri: (0, $7a8a2ec4ed2c2ee9$export$89711068e98820c5),
                                    "ext-site_id": siteId
                                }
                            })
                        ];
                    case 7:
                        _state.sent();
                        _state.label = 8;
                    case 8:
                        if (event.data === (0, $1e1a44bfd73a2638$export$c9ef5458120c5543).Logout) {
                            (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("message - ", (0, $1e1a44bfd73a2638$export$c9ef5458120c5543).Logout);
                            auth0Client.logout({
                                logoutParams: {
                                    returnTo: window.location.origin
                                }
                            });
                        }
                        if (event.data === (0, $1e1a44bfd73a2638$export$c9ef5458120c5543).Signup) {
                            (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("message - ", (0, $1e1a44bfd73a2638$export$c9ef5458120c5543).Signup);
                            auth0Client.loginWithRedirect({
                                authorizationParams: {
                                    redirect_uri: (0, $7a8a2ec4ed2c2ee9$export$89711068e98820c5),
                                    screen_hint: "signup",
                                    "ext-site_id": siteId
                                }
                            });
                        }
                        return [
                            2
                        ];
                }
            });
        });
        return function(event) {
            return _ref.apply(this, arguments);
        };
    }());
};




var $363dd9b7f5859d99$export$2cb99e4be0dc4646 = function(args) {
    var url = args.url, idAttribute = args.idAttribute, name = args.name;
    return new Promise(function(resolve, _reject) {
        var head = document.head;
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = idAttribute !== null && idAttribute !== void 0 ? idAttribute : "";
        script.onload = function() {
            (0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("".concat(name, " script loaded"));
            resolve();
        };
        head.appendChild(script);
    });
};



var $450c7d0d4c1161ce$export$980c796d7aa95057 = function() {
    var _document_currentScript_attributes_getNamedItem, _document_currentScript;
    return document === null || document === void 0 ? void 0 : (_document_currentScript = document.currentScript) === null || _document_currentScript === void 0 ? void 0 : (_document_currentScript_attributes_getNamedItem = _document_currentScript.attributes.getNamedItem("data-siteid")) === null || _document_currentScript_attributes_getNamedItem === void 0 ? void 0 : _document_currentScript_attributes_getNamedItem.value;
};


var $ba3af60bcbdcc88f$var$siteId = (0, $450c7d0d4c1161ce$export$980c796d7aa95057)();
(0, $e98c957e3ea55568$export$bef1f36f5486a6a3)("siteId", $ba3af60bcbdcc88f$var$siteId);
var $ba3af60bcbdcc88f$var$promise = (0, $363dd9b7f5859d99$export$2cb99e4be0dc4646)({
    url: (0, $7a8a2ec4ed2c2ee9$export$fdceead422f56282),
    name: "Auth0 SPA js"
});
$ba3af60bcbdcc88f$var$promise.then(function() {
    (0, $363dd9b7f5859d99$export$2cb99e4be0dc4646)({
        url: (0, $7a8a2ec4ed2c2ee9$export$b6076d1cb98730e7),
        name: "Zendesk widget",
        idAttribute: "ze-snippet"
    }).then(function() {
        (0, $0c925caf723f5925$export$91a760dcae1633b7)({
            auth0ClientOptions: {
                domain: "accounts.talk.sesam.io",
                clientId: "kJpPOS30v8dpD68iRJ7PMdS03Hwvq06X"
            },
            siteId: $ba3af60bcbdcc88f$var$siteId
        });
    });
});

})();
//# sourceMappingURL=sso-flow.js.map
