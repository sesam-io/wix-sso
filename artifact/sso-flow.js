(() => {
const $995a17657784c9af$export$fdceead422f56282 = "https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js";
const $995a17657784c9af$export$b6076d1cb98730e7 = "https://static.zdassets.com/ekr/snippet.js?key=eb7f5552-be33-4b0f-a55d-ce9a8a7aa975";
const $995a17657784c9af$export$31098c40fac339ea = "_logSSOFlow_";
const $995a17657784c9af$export$89711068e98820c5 = `${window.location.origin}/callback`;


const $9647b2867eb013e9$var$getLoggerFn = (enabled = false)=>(title, ...args)=>{
        if (!enabled) return;
        console.info(`SSO FLow - ${title}`, args.length ? args : "", new Date().toLocaleTimeString());
    };
const $9647b2867eb013e9$var$enabled = Boolean(localStorage.getItem((0, $995a17657784c9af$export$31098c40fac339ea)));
const $9647b2867eb013e9$export$bef1f36f5486a6a3 = $9647b2867eb013e9$var$getLoggerFn($9647b2867eb013e9$var$enabled);


var $5a1dd35589feee01$export$c9ef5458120c5543;
(function(LoginMessageType) {
    LoginMessageType["Login"] = "auth0:login";
    LoginMessageType["Logout"] = "auth0:logout";
    LoginMessageType["Signup"] = "auth0:signup";
})($5a1dd35589feee01$export$c9ef5458120c5543 || ($5a1dd35589feee01$export$c9ef5458120c5543 = {}));



const $4761edb0ea68884d$var$waitForDataLayer = (callback, attempt = 0)=>{
    (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("Waiting for GA dataLayer", JSON.stringify(window.dataLayer), ". Attempt: ", attempt);
    const max_attempts = 10;
    if (attempt > max_attempts) {
        (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("Waiting for GA dataLayer: Max attempts reached.");
        return;
    }
    if (window.dataLayer) {
        (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("GA dataLayer found");
        callback();
    } else setTimeout(function() {
        $4761edb0ea68884d$var$waitForDataLayer(callback, attempt + 1);
    }, 500);
};
function $4761edb0ea68884d$export$3c27964bdf7ca185() {
    (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("Attempting to push user_id to GA dataLayer.");
    const args = arguments;
    $4761edb0ea68884d$var$waitForDataLayer(()=>{
        (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("Setting the user-id");
        window.dataLayer.push(args);
        (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("window.dataLayer after pushing", window.dataLayer);
    });
}
async function $4761edb0ea68884d$export$bced8d2aada2d1c9(message) {
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



const $07ad91fe37969750$export$36cb72b0e241b243 = (auth0Client, auth0Id)=>{
    return new Promise(async (resolve, _reject)=>{
        (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("updateHttpFunctions called");
        const user = await auth0Client.getUser();
        if (!user) {
            (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("updateHttpFunctions -> user not logged-in!");
            return;
        }
        if (!auth0Id) {
            (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("updateHttpFunctions -> auth0Id is not defined!");
            return;
        }
        try {
            await fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: user
                })
            });
            const token = await auth0Client.getTokenSilently();
            await fetch(window.location.origin + "/_functions/auth0/" + auth0Id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token
                })
            });
            resolve();
        } catch (err) {
            console.error("fetch error: ", err);
            _reject();
        }
    });
};



const $e1055c0484c3cef4$export$91a760dcae1633b7 = (args)=>{
    const { auth0ClientOptions: auth0ClientOptions, siteId: siteId } = args;
    (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("runSSOFlow start");
    if (!window?.auth0) {
        (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("auth0 does not exist!");
        return;
    }
    let auth0Id = "";
    (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("runSSOFlow ~ auth0Id:", auth0Id);
    let zToken = "";
    const auth0Client = new window.auth0.Auth0Client(auth0ClientOptions);
    const afterAuthentication = async ()=>{
        (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("afterAuthentication invoked!");
        const isAuthenticated = await auth0Client.isAuthenticated();
        if (isAuthenticated) {
            (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("user is authenticated");
            return;
        }
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            await auth0Client.handleRedirectCallback();
            await (0, $07ad91fe37969750$export$36cb72b0e241b243)(auth0Client, auth0Id);
            window.history.replaceState({}, "", "/");
        }
    };
    // I'm not quite sure how Wix works but it's important to note that this window.onload only runs
    // when we refresh the page - not when going through the pages within the Wix site, In that sense, Wix is SPA-ish
    window.onload = async ()=>{
        (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("window has loaded");
        window.zE("messenger", "hide");
    };
    afterAuthentication();
    window.addEventListener("message", async (event)=>{
        if (event.data.auth0Id) {
            (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("message data", event.data);
            auth0Id = event.data.auth0Id;
            zToken = event.data.zendeskToken;
            const user = await auth0Client.getUser();
            if (user?.email) {
                const hashedEmail = await (0, $4761edb0ea68884d$export$bced8d2aada2d1c9)(user.email);
                // @ts-ignore
                (0, $4761edb0ea68884d$export$3c27964bdf7ca185)("set", {
                    user_id: hashedEmail
                });
            }
            if (zToken) {
                (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("message - zToken", zToken);
                window.zE("messenger", "loginUser", function(callback) {
                    callback(zToken);
                    window.zE("messenger", "show");
                });
            } else await (0, $07ad91fe37969750$export$36cb72b0e241b243)(auth0Client, auth0Id);
        }
        if (event.data === (0, $5a1dd35589feee01$export$c9ef5458120c5543).Login) {
            (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("message - ", (0, $5a1dd35589feee01$export$c9ef5458120c5543).Login);
            await auth0Client.loginWithRedirect({
                authorizationParams: {
                    redirect_uri: (0, $995a17657784c9af$export$89711068e98820c5),
                    "ext-site_id": siteId
                }
            });
        }
        if (event.data === (0, $5a1dd35589feee01$export$c9ef5458120c5543).Logout) {
            (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("message - ", (0, $5a1dd35589feee01$export$c9ef5458120c5543).Logout);
            auth0Client.logout({
                logoutParams: {
                    returnTo: window.location.origin
                }
            });
        }
        if (event.data === (0, $5a1dd35589feee01$export$c9ef5458120c5543).Signup) {
            (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("message - ", (0, $5a1dd35589feee01$export$c9ef5458120c5543).Signup);
            auth0Client.loginWithRedirect({
                authorizationParams: {
                    redirect_uri: (0, $995a17657784c9af$export$89711068e98820c5),
                    screen_hint: "signup",
                    "ext-site_id": siteId
                }
            });
        }
    });
};




const $0fb98a2fb5c542c5$export$2cb99e4be0dc4646 = (args)=>{
    const { url: url, idAttribute: idAttribute, name: name } = args;
    return new Promise((resolve, _reject)=>{
        const head = document.head;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = idAttribute ?? "";
        script.onload = ()=>{
            (0, $9647b2867eb013e9$export$bef1f36f5486a6a3)(`${name} script loaded`);
            resolve();
        };
        head.appendChild(script);
    });
};



const $be762f9266691e5b$export$980c796d7aa95057 = ()=>document?.currentScript?.attributes.getNamedItem("data-siteid")?.value;


const $00d783be9e26ef46$var$siteId = (0, $be762f9266691e5b$export$980c796d7aa95057)();
(0, $9647b2867eb013e9$export$bef1f36f5486a6a3)("siteId", $00d783be9e26ef46$var$siteId);
const $00d783be9e26ef46$var$promise = (0, $0fb98a2fb5c542c5$export$2cb99e4be0dc4646)({
    url: (0, $995a17657784c9af$export$fdceead422f56282),
    name: "Auth0 SPA js"
});
$00d783be9e26ef46$var$promise.then(()=>{
    (0, $0fb98a2fb5c542c5$export$2cb99e4be0dc4646)({
        url: (0, $995a17657784c9af$export$b6076d1cb98730e7),
        name: "Zendesk widget",
        idAttribute: "ze-snippet"
    }).then(()=>{
        (0, $e1055c0484c3cef4$export$91a760dcae1633b7)({
            auth0ClientOptions: {
                domain: "accounts.talk.sesam.io",
                clientId: "kJpPOS30v8dpD68iRJ7PMdS03Hwvq06X"
            },
            siteId: $00d783be9e26ef46$var$siteId
        });
    });
});

})();
//# sourceMappingURL=sso-flow.js.map
