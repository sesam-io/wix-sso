// might change due to: https://sesam.myjetbrains.com/youtrack/issue/IS-15413/Type-and-migrate-Zendesk-zE-method
// see: https://developer.zendesk.com/api-reference/widget/introduction
import type { Auth0Client, Auth0ClientOptions } from "@auth0/auth0-spa-js";
import * as Auth0 from "@auth0/auth0-spa-js";

declare global {
  type ZendeskCallbackFn = (token?: string) => void;

  interface Window {
    zE: (webWidget: string, event: string, callback?: unknown) => void;
    createAuth0Client: (options: Auth0ClientOptions) => Promise<Auth0Client>;
    auth0: typeof Auth0;
  }
}
