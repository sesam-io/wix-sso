export type SsoFlowState = {
  auth0Id?: string;
  zToken?: string;
};

export const initSSOFlowState = () => () => {
  const _state: { current: SsoFlowState } = {
    current: { auth0Id: "", zToken: "" },
  };

  return {
    set function(nextState: SsoFlowState) {
      _state.current = nextState;
    },
    get function() {
      return _state.current;
    },
  };
};
