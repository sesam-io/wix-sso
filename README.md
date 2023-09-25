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


## Develope

In order to develop:
- Clone the repo locally
- run `yarn add` to install all dependencies
- run `yarn start` to open the homepage in the browser
- run `yarn build` to build the project into the `dist` folder 

## Build

To build the project run:

```
yarn build
```

The generated code will be located in `dist/index.js` file.

## Usage

After building the code, the content of `index.js` file should be copied from `dist` folder and wrapped with `<script>` tags. Then it should be paste in:

`Wix site -> Settings -> ADVANCED section -> Custom code -> Auth0 + Zendesk`

```
<script>

    // the generated code

</script>
```

![Alt text](<src/assets//custom-code-example.png>)


## Logging

In order to enable the console logger, please add to `localStorage` the key `_logSSOFlow_` with the value `true` under the site domain and follow the console logs that prefixed with `SSO Flow` title. See screenshot example:


![Alt text](<src/assets/logger-example.png>)

## TODO
* [ ] Parse the builded `dist/index.js` into `artifact.html` that will contain the production code wrapped with `script` tags