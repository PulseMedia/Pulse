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

  isGreaterThan(otherVersion){
    if (typeof otherVersion === 'string' || otherVersion instanceof String){
      return this.isGreaterThan(new Version(otherVersion));
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
  }

  isLowerThan(otherVersion){
    if (typeof otherVersion === 'string' || otherVersion instanceof String){
      return this.isLowerThan(new Version(otherVersion));
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
          if(selfNum < currNum){
            return true;
          }
        } else {
          if(selfNum == undefined && !(currNum === 0)){
            return true;
          }
        }
      }
      return false;
    }
  }

  isGreaterOrEqualsThan(otherVersion){
    if (typeof otherVersion === 'string' || otherVersion instanceof String){
      return this.isGreaterOrEqualsThan(new Version(otherVersion));
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
  }

  get __identity__(){
    return "VERSION"
  }

}
