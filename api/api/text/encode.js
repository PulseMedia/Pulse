const map = {
  "BASE64": {
    args: [ "STRING" ]
  },
  "URI_COMPONENT": {
    args: [ "STRING" ]
  },
  "URI": {
    args: [ "STRING" ]
  },
  "LZW": {
    args: [ "STRING" ]
  }
}

const api = {
  base64(str){
    return window.btoa(str);
  },

  uriComponent(str){
    return window.encodeURIComponent(str)
  },

  uri(str){
    return window.encodeURI(str)
  },

  lzw(str){
    var dict = {};
    var data = (str + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
      currChar=data[i];
      if (dict[phrase + currChar] != null) {
        phrase += currChar;
      }
      else {
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        dict[phrase + currChar] = code;
        code++;
        phrase=currChar;
      }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
      out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
  }
}

export default { map, api }
