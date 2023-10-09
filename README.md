# Auth0 SSO for Wix sites

Repo for hosting [`Auth0`](https://auth0.com) SSO sign-in/sign-up code to be used across Sesam Wix sites.

The code is based on [Integrate Auth0 with Wix Members: Complete Guide](https://forum.wixstudio.com/t/integrate-auth0-with-wix-members-complete-guide/8119) tutorial.

## Table of Content

- [Core logic](#core-logic)
- [Development](#development)
- [Build](#build)
- [Update CDN URL](#update-cdn-url)
- [Usage in Wix dashboard](#usage-in-wix-dashboard)
- [Enable logger](#enable-logger)
- [Full flow in detail](#full-flow-in-detail)

## Core logic

- Required third-party JS files loaded:
    - [Auth0 SPA js](https://static.zdassets.com/ekr/snippet.js?key=eb7f5552-be33-4b0f-a55d-ce9a8a7aa975)
    - [Zendesk Widget](https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js)
- `Auth0Client` instance is created with `accounts.talk.sesam.io` domain and the `clientId`
- If user is authenticated the flow is not continue
- If user is not authenticated:
    - URL history state and query params are deleted
    - Post to `user` to the server 
    - Post to `Auth0` token to the server
- Message events are sent in order to sign-in or sign-out


## Development

In order to develope and release new version, keep the following steps:
- Clone the repository locally
- Run `yarn add` to install the project's dependencies
- Run `yarn start` to open the homepage in the browser
- Run `yarn build` to build the project and generate the artifact file `sso-flow.min.js` into the `artifact` folder 
- Push changes to Github
- Create new release
- Update the CDN URL (see details under [build section](#build))

## Build

To build the project run:

```
yarn build
```

The generated code will be located in `artifact/sso-flow.min.js` file.

## Update CDN URL

The builded code can be used with [jsdelivr](https://www.jsdelivr.com/?docs=gh) CDN service.

In order to use that service, there's a need to generate [Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) and use it as follow:

```
https://cdn.jsdelivr.net/gh/[user]/[repo-name@release-version]/[file-path]
```

It's possible to use specific release. For example `v1.0.2`, then the URL should be: 

```
https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@v1.0.2/artifact/sso-flow.min.js
```

We can also alway use the latest version: 

```
https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@latest/artifact/sso-flow.min.js
```

In that case we need to take care to not release a broken version that can cause multiple sites to be broken at once.

## Usage in Wix dashboard

Paste the following code:

```html
<script id="sso-flow" data-siteid="wave" src="https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@v1.0.2/artifact/sso-flow.min.js"></script>
```

in Wix site's Custom code: 

`Wix site -> Settings -> ADVANCED section -> Custom code -> Auth0 + Zendesk`


![Alt text](<src/assets/wix-custom-code-example.png>)


![Alt text](<src/assets//script-example.png>)

## Enable logger

In order to enable the console logger, please add to `localStorage` the key `_logSSOFlow_` with the value `true` under the site domain and follow the console logs that prefixed with `SSO Flow` title. See screenshot example:


![Alt text](<src/assets/logger-example.png>)

## Full flow in detail

When the `masterPage.js` is loaded, a generated `auth0Id` is messaged to the the client listener from 

```js

const auth0Id = uuidv4();

wixRealtime.subscribe({
          ...
    })).then(() => {
        console.debug("auth0 - Subscribe .then");
        zendeskToken = session.getItem("zToken");
        wixWindow.postMessage({ auth0Id, zendeskToken });
    })
```

When user clicks on the `Login button`

1. Login Lightbox is open
 	- Set current URL in the localStorage `local.setItem("redirect", wixLocation.url);`
 	- Triggers the login flow by calling `wixWindow.postMessage("auth0:login")`, which actually post message to the custom client code's message listener
2. The client listener invokes `auth0Client.loginWithRedirect`, which start off the redirects flow to auth0 login webpage
3. Universal login page shows up
4. After the user fills the credentials `Auth0` redirects back to the site with the following query params: https://site-name/?code={some code}&state={some state}
5. window.onLoad listener process that query params (code, state) and calls `auth0Client.handleRedirectCallback();` to handle success or error responses from Auth0 (https://auth0.github.io/auth0-spa-js/classes/Auth0Client.html#handleRedirectCallback).
    - It then `replaceState` to reset the state object and the query params (code, state) for security reasons
 	- `updateHttpFunctions` POST the current logged-in `user` to the API server's method `post_auth0`, which `publish` (send message) an `auth0Id` and the `user` args to the client message listener of the `masterPage.js`

 	```js
 	 wixRealtime.subscribe({
        name: "auth0",
        resourceId: auth0Id,
    }