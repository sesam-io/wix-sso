export enum LoginMessageType {
  Login = "auth0:login",
  Logout = "auth0:logout",
  Signup = "auth0:signup",
}

export enum SSOFlowStatus {
  LoggedIn = "logged-in",
  LoggedOut = "logged-out",
  Authenticated = "authenticated",
  UpdateServer = "update-server",
}
