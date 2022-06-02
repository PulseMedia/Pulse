import App from "./api/app/App.js";
import VFS from "./api/vfs/VFS.js";
import Text from "./api/text/Text.js";
import NET from "./api/net/NET.js";
import Media from "./api/media/Media.js";

export const api = {
  "App": App.api,
  "VFS": VFS.api,
  "Text": Text.api,
  "NET": NET.api,
  "Media": Media.api
}
