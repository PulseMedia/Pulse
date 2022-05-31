import Encode from "./encode.js";
import Decode from "./decode.js";

const map = {
  "Encode": Encode.map,
  "Decode": Decode.map,
}

const api = {
  "Encode": Encode.api,
  "Decode": Decode.api,
}

export default { map, api }
