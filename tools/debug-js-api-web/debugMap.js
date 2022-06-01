export const debugMap = {
  "Pulse": {
    "Util": {
      "VERSION": [
        { constructor: [ "2.0" ], call: "isHigherThan", args: [ "1.0" ], expected: true },
        { constructor: [ "2.0" ], call: "isHigherThan", args: [ "2.0.1" ], expected: false },
        { constructor: [ "1.0" ], call: "isLowerThan", args: [ "2.0" ], expected: true },
        { constructor: [ "2.0.1" ], call: "isLowerThan", args: [ "2.0" ], expected: false },
        { constructor: [ "3.4.1" ], call: "isHigherOrEqualsThan", args: [ "3.4.0.1" ], expected: true },
        { constructor: [ "2.1.3" ], call: "isHigherOrEqualsThan", args: [ "2.1.3" ], expected: true },
      ]
    }
  },
  "VFS": {
    "File": {
      "READ_FILE": [
        { input: [ "pulse://data/userData/custom/example.txt" ], args: [ "pulse://data/userData/custom/example.txt" ], output: "example content", expected: "example content" }
      ],
      "WRITE_FILE": [
        { input: [ "pulse://data/userData/custom/example.txt", "written content" ], args: [ "pulse://data/userData/custom/example.txt", "written content" ], output: true, expected: true }
      ],
      "APPEND_FILE": [
        { input: [ "pulse://data/userData/custom/example.txt", "appended content" ], args: [ "pulse://data/userData/custom/example.txt", "appended content" ], output: true, expected: true }
      ],
      "DELETE_FILE": [
        { input: [ "pulse://data/userData/custom/example.txt" ], args: [ "pulse://data/userData/custom/example.txt" ], output: true, expected: true }
      ],
      "EXISTS_FILE": [
        { input: [ "pulse://data/userData/custom/example.txt" ], args: [ "pulse://data/userData/custom/example.txt" ], output: true, expected: true }
      ],
    },
    "Directory": {
      "READ_DIRECTORY": [
        { input: [ "pulse://data/userData/custom/" ], args: [ "pulse://data/userData/custom/" ],
          output: { dirs: [ "pulse://data/userData/custom/subDir/" ], files: [ "pulse://data/userData/custom/subFile.txt" ] },
          expected: { all: [ "pulse://data/userData/custom/subDir/", "pulse://data/userData/custom/subFile.txt" ], dirs: [ "pulse://data/userData/custom/subDir/" ], files: [ "pulse://data/userData/custom/subFile.txt" ] },
        }
      ],
      "CREATE_DIRECTORY": [
        { input: [ "pulse://data/userData/custom/" ], args: [ "pulse://data/userData/custom/" ], output: true, expected: true }
      ],
      "DELETE_DIRECTORY": [
        { input: [ "pulse://data/userData/custom/" ], args: [ "pulse://data/userData/custom/" ], output: true, expected: true }
      ],
      "EXISTS_DIRECTORY": [
        { input: [ "pulse://data/userData/custom/" ], args: [ "pulse://data/userData/custom/" ], output: true, expected: true }
      ],
    },
    "Path": {
      "COMBINE": [
        { args: [ "HOME://", "abc", "def" ], expected: "pulse://data/abc/def/" },
        { args: [ "ADDONS://", "my.addon.id" ], expected: "pulse://data/addons/my.addon.id" },
        { args: [ "USERDATA://", "custom", "example.json" ], expected: "pulse://data/userData/custom/example.json" },
        { args: [ "HOME://", "abc", "def", undefined ], exception: true },
      ],
      "TRANSLATE": [
        { args: [ "HOME://abc/def/" ], expected: "pulse://data/abc/def/" },
        { args: [ "ADDONS://my.addon.id/" ], expected: "pulse://data/addons/my.addon.id/" },
        { args: [ "USERDATA://custom/example.json" ], expected: "pulse://data/userData/custom/example.json" },
      ]
    }
  },
  "Media": {
    "EPG": {
      "FROM_PLAYLIST_URL": [
        { args: [ "http://www.stream-service.domain/get.php?user=abc&password=123" ], expected: "http://www.stream-service.domain/xmltv.php?user=abc&password=123" },
        { args: [ "http://www.any-other.domain/home" ], expected: undefined },
      ]
    }
  },
  "NET": {
    "Url": {
      "GET_URL_PROTOCOL": [
        { args: [ "http://www.pulse-player.tv" ], expected: "http" },
        { args: [ "https://www.pulse-player.tv" ], expected: "https" },
      ],
      "GET_URL_HOST_NAME": [
        { args: [ "http://www.pulse-player.tv" ], expected: "pulse-player" },
      ],
      "GET_URL_FILE_NAME": [
        { args: [ "http://www.pulse-player.tv/folder/file.txt" ], expected: "file.txt" },
      ],
      "GET_URL_DIRECTORY": [
        { args: [ "http://www.pulse-player.tv/folder/file.txt" ], expected: "http://www.pulse-player.tv/folder/" },
      ],
      "GET_URL_ROOT": [
        { args: [ "http://www.pulse-player.tv/folder/file.txt" ], expected: "http://www.pulse-player.tv/" },
      ]
    },
    "Web": {
      "DOWNLOAD_FILE": [
        { input: [ "http://www.pulse-player.tv/folder/file.txt", "pulse://data/userData/custom/example.txt", {} ], args: [ "http://www.pulse-player.tv/folder/file.txt", "pulse://data/userData/custom/example.txt", "{}" ], output: true, expected: true },
        { input: [ "http://www.pulse-player.tv/folder/file.txt", "pulse://data/userData/custom/example.txt", { header: { "User-Agent": "pulse/test" } } ], args: [ "http://www.pulse-player.tv/folder/file.txt", "pulse://data/userData/custom/example.txt", "{\"header\":{\"User-Agent\":\"pulse/test\"}}" ], output: true, expected: true }
      ],
      "FETCH": [
        { input: [ "http://www.pulse-player.tv/folder/file.txt", {} ], args: [ "http://www.pulse-player.tv/folder/file.txt", "{}" ], output: true, expected: true },
        { input: [ "http://www.pulse-player.tv/folder/file.txt", { header: { "User-Agent": "pulse/test" } } ], args: [ "http://www.pulse-player.tv/folder/file.txt", "{\"header\":{\"User-Agent\":\"pulse/test\"}}" ], output: true, expected: true }
      ]
    }
  },
  "Text": {
    "Encode": {
      "BASE64": [
        { args: [ "example encoded string" ], expected: "ZXhhbXBsZSBlbmNvZGVkIHN0cmluZw==" },
      ],
      "URI_COMPONENT": [
        { args: [ "?key=value" ], expected: "%3Fkey%3Dvalue" },
      ],
      "URI": [
        { args: [ "https://www.pulse-player.tv?key=val ue&test=vålue" ], expected: "https://www.pulse-player.tv?key=val%20ue&test=v%C3%A5lue" },
      ],
      "LZW": [
        { args: [ "compresssed stiiinnnggg heeerrree" ], expected: "compresĆed stičnďgđ heĕrėĕ" },
      ]
    },
    "Decode": {
      "BASE64": [
        { args: [ "ZXhhbXBsZSBlbmNvZGVkIHN0cmluZw==" ], expected: "example encoded string" },
      ],
      "URI_COMPONENT": [
        { args: [ "%3Fkey%3Dvalue" ], expected: "?key=value" },
      ],
      "URI": [
        { args: [ "https://www.pulse-player.tv?key=val%20ue&test=v%C3%A5lue" ], expected: "https://www.pulse-player.tv?key=val ue&test=vålue" },
      ],
      "LZW": [
        { args: [ "compresĆed stičnďgđ heĕrėĕ" ], expected: "compresssed stiiinnnggg heeerrree" },
      ]
    }
  },
  "Internal": {
    "Native": {
      "NATIVE_TOAST": [
        { callOnly: true },
      ],
      "NATIVE_NOTIFICATION": [
        { callOnly: true },
      ],
      "NATIVE_NOTIFICATION_SOUND": [
        { callOnly: true },
      ],
    }
  },
}
