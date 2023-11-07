# site-logos


wix-sso also serves as a CDN to a the ULP site logos.

## Development
Once a logo is added to the dedicated connector folder and pushed to Github, it can then be served from the [jsdelivr CDN](https://cdn.jsdelivr.net) service (see [Usage](#usage)).

## Usage
```
https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@[release-version]/src/packages/siteLogos/[connector-folder][file-name]
```
## Example
```
https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@v1.0.74-site-logos/src/packages/siteLogos/superoffice/superoffice-mc-header-logo.svg
```