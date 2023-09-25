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