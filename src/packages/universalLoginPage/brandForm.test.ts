/**
 * @jest-environment jsdom
 */

import { getBrandTitleFn, getWixSite, getDefaultPageTitle } from "./brandForm";
import { WixSites } from "./constants";
import { SiteId } from "./types";

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

describe("brandTitle test suite", () => {
  it("should brand login Wave site subtitle", () => {
    document.body.innerHTML = `<div>
        <p>Some title</p>
        <p>${WixSites.sesam.loginSubTitle}</p>
        <p>Some text</p>
    </div>`;

    const pTags = document.getElementsByTagName("p");

    const brandTitle = getBrandTitleFn(pTags, getDefaultPageTitle("login"));

    brandTitle(WixSites.wave.loginSubTitle);
  });
});
