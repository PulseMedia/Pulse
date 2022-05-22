import Path from "./path.js";
import File from "./file.js";
import Directory from "./directory.js";

const map = {
  "File": File.map,
  "Directory": Directory.map,
  "Path": Path.map
}

const api = {
  "File": File.api,
  "Directory": Directory.api,
  "Path": Path.api
}

const presenter = {
  "File": File.presenter,
  "Directory": Directory.presenter,
  "Path": Path.presenter
}

export default { map, api, presenter }
