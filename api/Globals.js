//Global Class accessible from all files (via Globals.<GETTER>)
//GlobalData Values are filled automatically by the App
//Need more Informations? Put the variable here and make an Pull-Request

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

window.Globals = new GlobalsClass();
