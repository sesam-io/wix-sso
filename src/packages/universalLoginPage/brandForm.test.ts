import { brandForm } from "./brandForm";

describe("brandForm test suite", () => {
  describe("login", () => {
    it("should return Sesam site, when ", () => {
      expect(brandForm("login", "sesam")).toMatchSnapshot();
    });
  });
});
