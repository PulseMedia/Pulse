const map = {
  "DOWNLOAD_FILE": {
    args: [ "STRING", "STRING", "OBJECT={}", "EVENT=undefined" ],
    before: (args) => {
      args[2] = JSON.stringify(args[2]);
      return args;
    }
  },
  "FETCH": {
    args: [ "STRING", "OBJECT={}" ],
    before: (args) => {
      args[1] = JSON.stringify(args[1]);
      return args;
    }
  }
}

const api = {

}

export default { map, api }
