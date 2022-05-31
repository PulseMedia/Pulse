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
    return window.atob(str);
  },

  uriComponent(str){
    return window.decodeURIComponent(str);
  },

  uri(str){
    return window.decodeURI(str)
  },

  lzw(str){
    var dict = {};
    var data = (str + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
      var currCode = data[i].charCodeAt(0);
      if (currCode < 256) {
        phrase = data[i];
      }
      else {
       phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
      }
      out.push(phrase);
      currChar = phrase.charAt(0);
      dict[code] = oldPhrase + currChar;
      code++;
      oldPhrase = phrase;
    }
    return out.join("");
  }
}

export default { map, api }
