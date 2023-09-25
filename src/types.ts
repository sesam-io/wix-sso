export enum LoginMessageType {
  Login = "auth0:login",
  Logout = "auth0:logout",
}

export type LoadScriptArgs = {
  name: string;
  idAttribute?: string;
  url: string;
};
