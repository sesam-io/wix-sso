import { getSiteTitle, getWixSite } from "./brandForm";
import { SiteId } from "./types";

describe("getSiteTitle test suite", () => {
  describe("login", () => {
    it("should return Sesam site as default site", () => {
      expect(
        getSiteTitle("login", "none-exist-site" as SiteId)
      ).toMatchSnapshot();
    });

    it("should return Sesam site", () => {
      expect(getSiteTitle("login", "sesam")).toMatchSnapshot();
    });

    it("should return HubSpot site", () => {
      expect(getSiteTitle("login", "hubspot")).toMatchSnapshot();
    });

    it("should return SuperOffice site", () => {
      expect(getSiteTitle("login", "superoffice")).toMatchSnapshot();
    });

    it("should return PowerOffice site", () => {
      expect(getSiteTitle("login", "poweroffice")).toMatchSnapshot();
    });

    it("should return Wave site", () => {
      expect(getSiteTitle("login", "wave")).toMatchSnapshot();
    });
  });

  describe("signup", () => {
    it("should return Sesam site as default site", () => {
      expect(
        getSiteTitle("signup", "none-exist-site" as SiteId)
      ).toMatchSnapshot();
    });

    it("should return Sesam site", () => {
      expect(getSiteTitle("signup", "sesam")).toMatchSnapshot();
    });

    it("should return HubSpot site", () => {
      expect(getSiteTitle("signup", "hubspot")).toMatchSnapshot();
    });

    it("should return SuperOffice site", () => {
      expect(getSiteTitle("signup", "superoffice")).toMatchSnapshot();
    });

    it("should return PowerOffice site", () => {
      expect(getSiteTitle("signup", "poweroffice")).toMatchSnapshot();
    });

    it("should return Wave site", () => {
      expect(getSiteTitle("signup", "wave")).toMatchSnapshot();
    });
  });
});

describe("getWixSite test suite", () => {
  it("should return default site", () => {
    expect(getWixSite("none-exist-site" as SiteId)).toMatchSnapshot();
  });
});
