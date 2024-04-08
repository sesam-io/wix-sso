/**
 * @jest-environment jsdom
 */

import { getBrandTitleFn } from "./brandForm";
import { getDefaultPageTitle } from "./utils";
import { SesamDefaultSite, Wave } from "./sites";

describe("brandTitle test suite", () => {
  it("should brand login Wave site subtitle", () => {
    document.body.innerHTML = `<div>
        <p>Some title</p>
        <p>${SesamDefaultSite.loginSubTitle}</p>
        <p>Some text</p>
    </div>`;
    const pTags = document.getElementsByTagName("p");
    const brandTitle = getBrandTitleFn(pTags, getDefaultPageTitle("login"));
    brandTitle(Wave.loginSubTitle);
  });
});
