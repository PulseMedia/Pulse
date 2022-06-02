import { Version } from "./class/version.js";

const map = {
  "VERSION": {
    args: [ "STRING" ],
    prototype: {
      "IS_HIGHER_THAN": [ "STRING|OBJECT" ],
      "IS_LOWER_THAN": [ "STRING|OBJECT" ],
      "IS_HIGHER_OR_EQUALS_THAN": [ "STRING|OBJECT" ]
    }
  }
}

const api = {
  Version: Version
}

export default { map, api }
