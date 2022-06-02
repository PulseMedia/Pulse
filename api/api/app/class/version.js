export class Version{

  constructor(version){
    this.versionData = version.trim().split(".").map((item) => {
      var num = parseInt(item.trim(), 10);
      if(isNaN(num)){
        num = 0;
      }
      return num;
    });
  }

  isHigherThan(otherVersion){
    if (typeof otherVersion === 'string' || otherVersion instanceof String){
      return this.isHigherThan(new Version(otherVersion));
    }
    if(otherVersion.constructor === Version){
      var currNum, selfNum;
      var lengthLopp = this.versionData.length;
      if(otherVersion.versionData.length > lengthLopp){
        lengthLopp = otherVersion.versionData.length;
      }
      for(let i = 0; i < lengthLopp; i++){
        currNum = otherVersion.versionData[i];
        selfNum = this.versionData[i];
        if(currNum != undefined && selfNum != undefined){
          if(selfNum > currNum){
            return true;
          }
        } else {
          if(currNum == undefined && !(selfNum === 0)){
            return true;
          }
        }
      }
      return false;
    }
    throw {
      name: "VersionException",
      message: "Passed object is not an Version-Object"
    }
  }

  isLowerThan(otherVersion){
    return !this.isHigherThan(otherVersion);
  }

  isHigherOrEqualsThan(otherVersion){
    if (typeof otherVersion === 'string' || otherVersion instanceof String){
      return this.isHigherOrEqualsThan(new Version(otherVersion));
    }
    if(otherVersion.constructor === Version){
      var currNum, selfNum;
      var isHigher = false;
      var lengthLopp = this.versionData.length;
      if(otherVersion.versionData.length > lengthLopp){
        lengthLopp = otherVersion.versionData.length;
      }
      for(let i = 0; i < lengthLopp; i++){
        currNum = otherVersion.versionData[i];
        selfNum = this.versionData[i];
        if(currNum != undefined && selfNum != undefined){
          if(selfNum > currNum){
            return true;
          }
          if(selfNum == currNum){
            isHigher = true;
          }
        } else {
          if(currNum == undefined && !(selfNum === 0)){
            isHigher = true;
          }
          if(selfNum == undefined && !(currNum === 0)){
            isHigher = false;
          }
        }
      }
      return isHigher;
    }
    throw {
      name: "VersionException",
      message: "Passed object is not an Version-Object"
    }
  }

  get __identity__(){
    return "VERSION"
  }

}
