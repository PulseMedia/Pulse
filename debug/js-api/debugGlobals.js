var GlobalData = {
  PlatformPathSeperator:  "/",
  AppDataPath: "",
  Api: {}
}

class GlobalsClass{

  get PlatformPathSeperator(){
    return GlobalData.PlatformPathSeperator;
  }

  get AppDataPath(){
    return GlobalData.AppDataPath;
  }

  get Api(){
    return GlobalData.Api;
  }

}

export function registerDebugGlobals(debugData){
  GlobalData = debugData;
  window.Globals = new GlobalsClass();
}
