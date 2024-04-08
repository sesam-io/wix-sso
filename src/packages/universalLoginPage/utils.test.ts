// import { BrandedSiteIds, SiteIds } from "./siteIds";
import { SiteId } from "./types";
import { getBaseSiteId, getWixSite } from "./utils";

describe("utils test suite", () => {
  describe("getBaseSiteId test suite", () => {
    it("should return default, when siteId not exist", () => {
      expect(getBaseSiteId()).toMatchSnapshot();
    });

    it("should return poweroffice, when siteId is powerofficego", () => {
      expect(getBaseSiteId("powerofficego")).toMatchSnapshot();
    });

    it("should return poweroffice, when siteId is powerofficego", () => {
      expect(getBaseSiteId("powerofficego")).toMatchSnapshot();
    });

    it("should return poweroffice, when siteId is powerofficego-test", () => {
      expect(getBaseSiteId("powerofficego-test")).toMatchSnapshot();
    });

    it("should return poweroffice, when siteId is camel-cased PowerofficeGo", () => {
      expect(getBaseSiteId("PowerofficeGo")).toMatchSnapshot();
    });

    it("should return tripletex, when siteId is tripletex", () => {
      expect(getBaseSiteId("tripletex")).toMatchSnapshot();
    });

    it("should return tripletex, when siteId is tripletex-test", () => {
      expect(getBaseSiteId("tripletex-test")).toMatchSnapshot();
    });
  });

  describe("getWixSite test suite", () => {
    it("should return default site", () => {
      expect(getWixSite("none-exist-site" as SiteId)).toMatchSnapshot();
    });

    it("should return sesam site", () => {
      expect(getWixSite("sesam")).toMatchSnapshot();
    });

    it("should return Wave site", () => {
      expect(getWixSite("wave")).toMatchSnapshot();
    });

    it("should return SuperOffice site", () => {
      expect(getWixSite("superoffice")).toMatchSnapshot();
    });
  });
});
