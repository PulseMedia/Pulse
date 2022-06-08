import { Version } from "./class/version.js";

const map = {
  "VERSION": {
    args: [ "STRING" ],
    prototype: {
      "IS_GREATER_THAN": [ "STRING|OBJECT" ],
      "IS_LOWER_THAN": [ "STRING|OBJECT" ],
      "IS_GREATER_OR_EQUALS_THAN": [ "STRING|OBJECT" ]
    }
  },
  "VERSION_GREATER_THAN": {
    args: [ "STRING", "STRING" ]
  },
  "VERSION_LOWER_THAN": {
    args: [ "STRING", "STRING" ]
  },
  "VERSION_GREATER_OR_EQUALS_THAN": {
    args: [ "STRING", "STRING" ]
  }
}

const api = {
  Version: Version,
  versionGreaterThan(oversion, otherVersion){
    return (new Version(oversion)).isGreaterThan(otherVersion);
  },
  versionLowerThan(oversion, otherVersion){
    return (new Version(oversion)).isLowerThan(otherVersion);
  },
  versionGreaterOrEqualsThan(oversion, otherVersion){
    return (new Version(oversion)).isGreaterOrEqualsThan(otherVersion);
  },
}

export default { map, api }
