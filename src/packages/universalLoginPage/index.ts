import { brandForm } from "./brandForm";
import { SiteIds } from "./constants";

const formType = "{{prompt.name}}";
const siteId = "{{transaction.params.ext-site_id}}" || SiteIds.sesam;

// @ts-ignore
brandForm(formType, siteId);
