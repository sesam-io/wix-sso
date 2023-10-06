import { SSOFlowStatus } from "../enums";

export type SSOFlowStatusArgs = {
  isAuthenticated: boolean;
  query: string;
};

export const calculateSSOFlowStatus = (args: SSOFlowStatusArgs) => {
  const { isAuthenticated, query } = args;

  if (isAuthenticated) {
    return SSOFlowStatus.LoggedIn;
  }

  if (query.includes("code=") && query.includes("state=")) {
    return SSOFlowStatus.Authenticated;
  }

  return SSOFlowStatus.LoggedOut;
};
