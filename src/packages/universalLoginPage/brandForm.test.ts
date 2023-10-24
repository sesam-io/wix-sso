/**
 * @jest-environment jsdom
 */

import {
  getBrandTitleFn,
  getSiteTitle,
  getWixSite,
  getDefaultPageTitle,
} from "./brandForm";
import { WixSites } from "./constants";
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

describe.only("brandTitle test suite", () => {
  it("should brand Wave site", () => {
    document.body.innerHTML = `<div>
        <p>Some title</p>
        <p>${WixSites.sesam.loginSubTitle}</p>
        <p>Some text</p>
    </div>`;

    const brandTitle = getBrandTitleFn(
      document.getElementsByTagName("p") ?? {},

      getDefaultPageTitle("login", "wave")
    );

    brandTitle(WixSites.wave.loginSubTitle);
  });
});
