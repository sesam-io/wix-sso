import { BrandedSiteIds, SiteIds } from "./siteIds";
import { isInBrandedSites } from "./utils";

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
