# Auth0 SSO for Wix sites

Repo for hosting [`Auth0`](https://auth0.com) SSO sign-in/sign-up code to be used across Sesam Wix sites.

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

## Build

To build the artifact run

```
yarn build
```

## Usage

After building the code, the content of `index.js` file should be copied from `dist` folder and wrapped with `<script>` tags. Then it should be paste in the Wix site -> Settings -> ADVANCED section -> Custom code -> `For Auth0 SSO with Zendesk `

```
<script>

    // the generated code

</script>
```

![Alt text](<src/assets/screenshot1.png>)


## Logging

In order to enable the console logger, please add to `localStorage` the key `_logSSOFlow_` with the value `true`


![Alt text](<src/assets/logger-example.png>)
