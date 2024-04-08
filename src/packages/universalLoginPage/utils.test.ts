// import { BrandedSiteIds, SiteIds } from "./siteIds";
import { SiteId } from "./types";
import { getSite } from "./utils";

describe("utils test suite", () => {
  describe("getSite test suite", () => {
    it("should return default site", () => {
      expect(getSite("none-exist-site" as SiteId)).toMatchSnapshot();
    });

    it("should return sesam site", () => {
      expect(getSite("sesam")).toMatchSnapshot();
    });

    it("should return powerofficego site", () => {
      expect(getSite("powerofficego")).toMatchSnapshot();
    });

    it("should return powerofficego-test site", () => {
      expect(getSite("powerofficego-test")).toMatchSnapshot();
    });

    it("should return Wave site", () => {
      expect(getSite("wave")).toMatchSnapshot();
    });

    it("should return SuperOffice site", () => {
      expect(getSite("superoffice")).toMatchSnapshot();
    });

    it("should return SuperOffice-test site", () => {
      expect(getSite("superoffice-test")).toMatchSnapshot();
    });
  });
});
