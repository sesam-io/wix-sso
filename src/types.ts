export enum LoginMessageType {
  Login = "auth0:login",
  Logout = "auth0:logout",
}

export type LoadScriptArgs = {
  name: string;
  idAttribute?: string;
  url: string;
};

// The datalayer object is set on the window object by the Google Analytics script
// it can be used to configure GA, set options or send specific events
declare global {
  interface Window {
    dataLayer: any[];
  }
}
