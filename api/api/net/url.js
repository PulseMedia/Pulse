const map = {
  "GET_URL_PROTOCOL": {
    args: [ "STRING" ]
  },
  "GET_URL_HOST_NAME": {
    args: [ "STRING" ]
  },
  "GET_URL_FILE_NAME": {
    args: [ "STRING" ]
  },
  "GET_URL_DIRECTORY": {
    args: [ "STRING" ]
  },
  "GET_URL_ROOT": {
    args: [ "STRING" ]
  }
}

const api = {
  getUrlProtocol(url){
    if(url.includes("://")){
        return url.split("://")[0];
    }
    return undefined
  },

  getUrlHostName(url){
    var urlResult;
    var match;
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
      urlResult = match[1];
      if (match = urlResult.match(/^[^\.]+\.(.+\..+)$/)) {
          urlResult = match[1];
      }
    }
    if(urlResult.includes(".")){
      return urlResult.split(".")[0];
    }
    return urlResult
  },

  getUrlFileName(url){
    if(url.includes("/")){
      var file = url.substring(url.lastIndexOf('/')+1);
      if(file.includes(".")){
        return file;
      }
      return undefined;
    }
    return undefined
  },

  getUrlDirectory(url){
    if(url.includes("://")){
      var splitted = url.split("://");
      if(splitted[1].includes("/")){
        return splitted[0] + "://" + splitted[1].split('/').slice(0, -1).join('/') + "/"
      } else {
        return splitted[0] + "://" + splitted[1] + "/"
      }
    }
    return url.split('/').slice(0, -1).join('/') + "/"
  },

  getUrlRoot(url){
    if(url.includes("://")){
        var splitted = url.split("://");
        if(splitted[1].includes("/")){
          return splitted[0] + "://" + splitted[1].substr(0,splitted[1].indexOf('/')) + "/"
        } else {
          return splitted[0] + "://" + splitted[1] + "/"
        }
    }
    return url.substr(0,url.indexOf('/')) + "/"
  },
}

export default { map, api }
