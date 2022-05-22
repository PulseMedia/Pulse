const map = {
  "COMBINE": {
    args: [ "STRING*ARGS" ]
  },
  "TRANSLATE": {
    args: [ "STRING" ]
  },
  "EXTNAME": {
    args: [ "STRING" ]
  },
  "BASENAME": {
    args: [ "STRING" ]
  },
  "$GETTER_SEPARATOR": {}
}

function translatePathProtocol(pathToTranslate){
  if(pathToTranslate.includes("://")){
    var protocol = pathToTranslate.substr(0,pathToTranslate.indexOf(':'));
    var after = pathToTranslate.substr(pathToTranslate.indexOf('/')+2);
    var appDataPath = Globals.AppDataPath;
    if(appDataPath.endsWith(Globals.PlatformPathSeperator)){
      appDataPath = appDataPath.substring(0, appDataPath.length - 1);
    }
    if(after.length > 0){
      if(!after.startsWith(Globals.PlatformPathSeperator)){
        after = Globals.PlatformPathSeperator + after;
      }
    } else {
      after = Globals.PlatformPathSeperator;
    }
    switch (protocol.toUpperCase()) {
      case "HOME":
        return appDataPath + after;
        break;
      case "ADDONS":
        return appDataPath + Globals.PlatformPathSeperator + "addons" + after;
      case "SYSTEM":
        return appDataPath + Globals.PlatformPathSeperator + "system" + after;
      case "TEMP":
        return appDataPath + Globals.PlatformPathSeperator + "temp" + after;
      case "USER":
        return appDataPath + Globals.PlatformPathSeperator + "userData" + after;
      case "USERDATA":
        return appDataPath + Globals.PlatformPathSeperator + "userData" + after;
      default:
        return pathToTranslate;
    }
  }
  return pathToTranslate;
}

const api = {
  combine(){
    var params = Array.prototype.slice.call(arguments);
    if(params.length <= 1){
      return "";
    }
    var last = params.pop();
    var combined = params.shift();
    if(combined.endsWith(Globals.PlatformPathSeperator) && !combined.endsWith("//")){
      combined = combined.slice(0, -1);
    }
    params.forEach((item, i) => {
      combined += Globals.PlatformPathSeperator + item;
    });
    if(combined.endsWith(Globals.PlatformPathSeperator)){
      combined = combined.slice(0, -1);
    }
    if(last.includes(".")){
      combined +=  Globals.PlatformPathSeperator + last;
    } else {
      combined += Globals.PlatformPathSeperator + last + Globals.PlatformPathSeperator;
    }
    return translatePathProtocol(combined);
  },

  translate(path){
    if(path.includes("://")){
      var prefix = path.split("://");
      path = prefix[1].split("/").join(Globals.PlatformPathSeperator);
      prefix = prefix[0];
      return translatePathProtocol(prefix + "://" + path);
    } else {
      path = path.split("/").join(Globals.PlatformPathSeperator);
      return translatePathProtocol(path);
    }
  },

  extname(path){
    if(path.includes(".")){
      return "." + path.substring(path.lastIndexOf(".") + 1, path.length);
    } else {
      return "";
    }
  },

  basename(path){
    while(path.endsWith(Globals.PlatformPathSeperator)){
      path = path.slice(0, -1);
    }
    if(path.includes(Globals.PlatformPathSeperator)){
      return path.substring(path.lastIndexOf(Globals.PlatformPathSeperator) + 1, path.length);
    }
    return "";
  },

  get separator(){
    return Globals.PlatformPathSeperator;
  }
}

export default { map, api }
