// import { BrandedSiteIds, SiteIds } from "./siteIds";
import { SiteId } from "./types";
import { getWixSite } from "./utils";

describe("utils test suite", () => {
  describe("getWixSite test suite", () => {
    it("should return default site", () => {
      expect(getWixSite("none-exist-site" as SiteId)).toMatchSnapshot();
    });

    it("should return sesam site", () => {
      expect(getWixSite("sesam")).toMatchSnapshot();
    });

    it("should return powerofficego site", () => {
      expect(getWixSite("powerofficego")).toMatchSnapshot();
    });

    it("should return powerofficego-test site", () => {
      expect(getWixSite("powerofficego-test")).toMatchSnapshot();
    });

    it("should return Wave site", () => {
      expect(getWixSite("wave")).toMatchSnapshot();
    });

    it("should return SuperOffice site", () => {
      expect(getWixSite("superoffice")).toMatchSnapshot();
    });

    it("should return SuperOffice-test site", () => {
      expect(getWixSite("superoffice-test")).toMatchSnapshot();
    });
  });
});
