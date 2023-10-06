import { calculateSSOFlowStatus } from "./calculateSSOFlowStatus";

describe("calculateSSOFlowStatus test suite", () => {
  it("should return LoggedOut", () => {
    const args = {
      isAuthenticated: false,
      query: "https://www.wave.sesam.io",
    };

    expect(calculateSSOFlowStatus(args)).toMatchSnapshot();
  });

  it("should return Authenticated", () => {
    const args = {
      isAuthenticated: false,
      query: "https://www.wave.sesam.io/?code=0yV2lT&state=VFlmX1c",
    };

    expect(calculateSSOFlowStatus(args)).toMatchSnapshot();
  });
});
