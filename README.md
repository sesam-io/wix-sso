# Auth0 SSO for Wix sites

Repo for hosting [`Auth0`](https://auth0.com) SSO sign-in/sign-up code to be used across Sesam Wix sites.

The code is based on [Integrate Auth0 with Wix Members: Complete Guide](https://forum.wixstudio.com/t/integrate-auth0-with-wix-members-complete-guide/8119) tutorial.

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
- Run `yarn build` to build the project and generate the artifact file `sso-flow.min.js` into the `dist` folder 
- Push changes to Github
- Create new release
- Update the CDN URL (see details under [build section](#build))

## Build

To build the project run:

```
yarn build
```

The generated code will be located in `dist/sso-flow.min.js` file.

## Update CDN URL

The builded code can be used with [jsdelivr](https://www.jsdelivr.com/?docs=gh) CDN service.

In order to use that service, there's a need to generate [Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) and use it as follow:

```
https://cdn.jsdelivr.net/gh/[user]/[repo-name@release-version]/[file-path]
```

The current version is `v1.0.1` and therefore the URL is: 

```
https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@v1.0.1/dist/sso-flow.min.js
```

## Usage in Wix dashboard

Paste the following code:

```html
<script id="sso-flow" src="https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@v1.0.1/dist/sso-flow.min.js"></script>
```

in Wix site's Custom code: 

`Wix site -> Settings -> ADVANCED section -> Custom code -> Auth0 + Zendesk`


![Alt text](<src/assets/wix-custom-code-example.png>)


![Alt text](<src/assets//script-example.png>)

## Enable logger

In order to enable the console logger, please add to `localStorage` the key `_logSSOFlow_` with the value `true` under the site domain and follow the console logs that prefixed with `SSO Flow` title. See screenshot example:


![Alt text](<src/assets/logger-example.png>)

