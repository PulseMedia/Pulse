import Url from "./url.js";
import Web from "./web.js";

const map = {
  "Url": Url.map,
  "Web": Web.map
}

const api = {
  "Url": Url.api,
  "Web": Web.api
}

export default { map, api }
