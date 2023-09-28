export const readCurrentScriptSiteId = () =>
  document?.currentScript?.attributes.getNamedItem("data-siteid")?.value;
