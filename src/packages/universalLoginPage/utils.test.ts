import { BrandedSiteIds, SiteIds } from "./siteIds";
import { isInBrandedSites, getBaseSiteId } from "./utils";

describe("utils test suite", () => {
  describe("isInBrandedSites", () => {
    const siteIds = Object.keys(SiteIds);
    const brandedSiteIds = Object.values(BrandedSiteIds);

    siteIds.forEach((siteId) => {
      it.each([[brandedSiteIds, siteId.toLocaleLowerCase()]])(
        `is "${siteId}" in the branded list`,
        (brandedSiteIds, siteId) => {
          expect(isInBrandedSites(brandedSiteIds, siteId)).toMatchSnapshot();
        }
      );
    });
  });
});

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
