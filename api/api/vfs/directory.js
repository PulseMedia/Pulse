const map = {
  "READ_DIRECTORY": {
    args: [ "STRING" ],
    after: (val) => {
      if(val){
        if(val.dirs && val.files){
          val.all = val.dirs.concat(val.files);
        }
        return val;
      }
      return {};
    }
  },
  "CREATE_DIRECTORY": {
    args: [ "STRING" ]
  },
  "DELETE_DIRECTORY": {
    args: [ "STRING" ]
  },
  "EXISTS_DIRECTORY": {
    args: [ "STRING" ]
  }
}

const api = {

}

import { presenter } from "../presenter.js";
class Directory extends presenter {

  constructor(path = ""){
    super();
    this.path = path;
  }

  async create(){
    return await this.api.createDirectory(this.path);
  }

  async delete(){
    return await this.api.deleteDirectory(this.path);
  }

  async exists(){
    return await this.api.existsDirectory(this.path);
  }

  async read(){
    return await this.api.readDirectory(this.path);
  }

}

export default { map, api, presenter: Directory }
