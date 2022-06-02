import App from "./api/app/App.js";
import VFS from "./api/vfs/VFS.js";
import Text from "./api/text/Text.js";
import NET from "./api/net/NET.js";
import Media from "./api/media/Media.js";
import internal from "./api/internal.js";

export const map = {
  "App": App.map,
  "VFS": VFS.map,
  "Text": Text.map,
  "Media": Media.map,
  "NET": NET.map,
  "Internal": internal.map,
}
