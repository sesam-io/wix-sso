export type SsoFlowState = {
  auth0Id: string;
  zToken: string;
};

export type SsoFlowStateAPI = {
  currentState: SsoFlowState;
  setState: (nextState: SsoFlowState) => void;
};

export const initSSOFlowState = (): SsoFlowStateAPI => {
  const _state: { current: SsoFlowState } = {
    current: { auth0Id: "", zToken: "" },
  };

  return {
    setState: (nextState: SsoFlowState) => {
      _state.current = nextState;
    },
    get currentState() {
      return _state.current;
    },
  };
};

export const ssoFlowState = initSSOFlowState();
