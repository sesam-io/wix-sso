import { getSiteTitle } from "./brandForm";
import { SiteIds } from "./constants";

const formType = "{{prompt.name}}";
const siteId = "{{transaction.params.ext-site_id}}" || SiteIds.sesam;

// @ts-ignore
getSiteTitle(formType, siteId);
