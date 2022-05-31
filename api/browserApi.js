//Defined global functions which are allowed to use in Addons
//All functions not defined here, will be removed from the global "window"-object inside the addon

export const allowedBrowserApis = [
  "setTimeout",
  "clearTimeout",
  "setInterval",
  "clearInterval",
  "requestAnimationFrame"
]
